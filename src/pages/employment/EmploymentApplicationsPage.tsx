import { useEffect, useMemo, useState } from "react";
import { useAuthSession } from "../../features/auth/useAuthSession";
import { employmentApplicationFilterItems as filterItems } from "../../mocks/employmentApplications";
import { defaultSchoolId } from "../../services/configService";
import { fetchApplications, type FetchApplicationsResult } from "../../services/firestore/applications";
import type { ApplicationDoc, ApplicationStatusTone, EmploymentApplicationListItem } from "../../types/application";
import styles from "./EmploymentApplicationsPage.module.css";

function StatusBadge({
  children,
  tone,
}: {
  children: string;
  tone: ApplicationStatusTone;
}) {
  return (
    <span className={`${styles.statusBadge} ${styles[tone]}`.trim()}>
      <span aria-hidden="true" />
      {children}
    </span>
  );
}

function toText(value: number | string | undefined) {
  if (typeof value === "number") {
    return String(value);
  }

  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  return "확인 필요";
}

function formatSubmittedAt(value: unknown) {
  if (!value || typeof value !== "object" || !("toDate" in value) || typeof value.toDate !== "function") {
    return "일정 확인 필요";
  }

  const date = value.toDate();

  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "일정 확인 필요";
  }

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function getStatusTone(item: ApplicationDoc): ApplicationStatusTone {
  if (item.applicationStatus === "확인 필요") {
    return "warning";
  }

  if (item.reviewStatus === "면접 예정" || item.reviewStatus === "면접 안내") {
    return "info";
  }

  if (item.applicationStatus === "합격 확정" || item.reviewStatus === "최종 합격") {
    return "success";
  }

  return "neutral";
}

function toApplicationItem(item: ApplicationDoc): EmploymentApplicationListItem {
  const grade = toText(item.studentGrade);
  const classNo = toText(item.studentClassNo);
  const submittedAt = formatSubmittedAt(item.submittedAt);
  const reviewLabel = item.reviewStatus?.trim() || "검토 상태 확인 필요";
  const nextStep = item.nextStep?.trim() || "다음 단계 확인 필요";

  return {
    id: item.applicationId,
    student: item.studentName?.trim() || "학생명 확인 필요",
    classInfo: `${item.studentDepartment?.trim() || "학과 확인 필요"} · ${grade}학년 ${classNo}반`,
    company: item.companyName?.trim() || "기업명 확인 필요",
    jobTitle: item.jobTitle?.trim() || "공고명 확인 필요",
    status: item.applicationStatus?.trim() || "상태 확인 필요",
    statusTone: getStatusTone(item),
    schedule: `${reviewLabel} · ${submittedAt} · ${nextStep}`,
    note: item.memo?.trim() || "메모 확인 필요",
    reviewer: "취업진로부 확인 예정",
  };
}

function createSummaryItems(items: ApplicationDoc[]) {
  const needsReviewCount = items.filter((item) => item.applicationStatus === "확인 필요").length;
  const interviewCount = items.filter((item) => item.reviewStatus === "면접 예정" || item.reviewStatus === "면접 안내").length;
  const waitingCount = items.filter((item) => item.reviewStatus === "결과 대기" || item.reviewStatus === "서류 제출").length;

  return [
    { label: "전체 지원", value: `${items.length}건` },
    { label: "확인 필요", value: `${needsReviewCount}건` },
    { label: "면접 예정", value: `${interviewCount}건` },
    { label: "결과 대기", value: `${waitingCount}건` },
  ];
}

type ApplicationsLoadState =
  | { state: "loading" }
  | { state: "success"; path: string; items: ApplicationDoc[] }
  | { state: "empty"; path: string }
  | { state: "permission-denied"; path: string; message: string }
  | { state: "unavailable"; path: string; message: string }
  | { state: "error"; path: string; message: string };

function toLoadState(result: FetchApplicationsResult): ApplicationsLoadState {
  if (result.state === "success") {
    return result.items.length
      ? { state: "success", path: result.path, items: result.items }
      : { state: "empty", path: result.path };
  }

  return result;
}

export function EmploymentApplicationsPage() {
  const session = useAuthSession();
  const [loadState, setLoadState] = useState<ApplicationsLoadState>({ state: "loading" });

  const schoolId = useMemo(() => {
    if (session.state === "active" && session.user.schoolId.trim()) {
      return session.user.schoolId;
    }

    return defaultSchoolId || "bmt";
  }, [session]);

  useEffect(() => {
    let isMounted = true;

    setLoadState({ state: "loading" });

    fetchApplications(schoolId).then((result) => {
      if (!isMounted) {
        return;
      }

      setLoadState(toLoadState(result));
    });

    return () => {
      isMounted = false;
    };
  }, [schoolId]);

  const summaryItems = useMemo(() => {
    if (loadState.state === "success") {
      return createSummaryItems(loadState.items);
    }

    return createSummaryItems([]);
  }, [loadState]);

  const applications = useMemo(() => {
    if (loadState.state !== "success") {
      return [];
    }

    return loadState.items.map(toApplicationItem);
  }, [loadState]);

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>지원현황</h1>
          <p className={styles.description}>학생별 지원 상태와 확인이 필요한 항목을 빠르게 검토합니다.</p>
        </div>
      </header>

      <section aria-label="지원 요약" className={styles.summaryGrid}>
        {summaryItems.map((item) => (
          <article className={styles.summaryCard} key={item.label}>
            <span className={styles.summaryLabel}>{item.label}</span>
            <strong className={styles.summaryValue}>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className={styles.filterSection} aria-labelledby="employment-applications-filters">
        <div className={styles.filterHeader}>
          <h2 className={styles.filterTitle} id="employment-applications-filters">
            상태 필터
          </h2>
          <span className={styles.filterHint}>운영 우선순위에 따라 빠르게 확인합니다.</span>
        </div>
        <div className={styles.filterRow}>
          {filterItems.map((item, index) => (
            <button
              key={item}
              type="button"
              aria-pressed={index === 0}
              className={`${styles.filterChip} ${index === 0 ? styles.activeFilterChip : ""}`.trim()}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.listSection} aria-labelledby="employment-applications-list">
        <div className={styles.listHeader}>
          <div>
            <h2 className={styles.listTitle} id="employment-applications-list">
              지원 운영 목록
            </h2>
            <p className={styles.listDescription}>학생, 공고, 진행 상태, 확인 메모를 한 화면에서 비교합니다.</p>
          </div>
        </div>

        {loadState.state === "loading" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>지원 데이터를 불러오는 중입니다.</strong>
            <p className={styles.stateDescription}>`schools/{'{'}schoolId{'}'}/applications` 읽기 결과를 확인하고 있습니다.</p>
          </div>
        ) : null}

        {loadState.state === "permission-denied" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>지원 데이터를 읽을 권한이 없습니다.</strong>
            <p className={styles.stateDescription}>{loadState.message}</p>
            <p className={styles.stateMeta}>경로: {loadState.path}</p>
          </div>
        ) : null}

        {loadState.state === "unavailable" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>Firestore 연결을 확인해 주세요.</strong>
            <p className={styles.stateDescription}>{loadState.message}</p>
            <p className={styles.stateMeta}>경로: {loadState.path}</p>
          </div>
        ) : null}

        {loadState.state === "error" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>지원 데이터를 불러오지 못했습니다.</strong>
            <p className={styles.stateDescription}>{loadState.message}</p>
            <p className={styles.stateMeta}>경로: {loadState.path}</p>
          </div>
        ) : null}

        {loadState.state === "empty" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>등록된 지원이 아직 없습니다.</strong>
            <p className={styles.stateDescription}>Firestore read는 성공했지만 `applications` 컬렉션에 표시할 데이터가 없습니다.</p>
            <p className={styles.stateMeta}>경로: {loadState.path}</p>
          </div>
        ) : null}

        {loadState.state === "success" ? (
          <>
            <p className={styles.stateMeta}>읽은 경로: {loadState.path}</p>

            <div className={styles.cardList}>
              {applications.map((item) => (
                <article className={styles.applicationCard} key={item.id}>
                  <div className={styles.cardTop}>
                    <div className={styles.identityBlock}>
                      <strong className={styles.studentName}>{item.student}</strong>
                      <span className={styles.classInfo}>{item.classInfo}</span>
                      <span className={styles.companyName}>{item.company}</span>
                      <h3 className={styles.jobTitle}>{item.jobTitle}</h3>
                    </div>

                    <div className={styles.statusBlock}>
                      <StatusBadge tone={item.statusTone}>{item.status}</StatusBadge>
                    </div>
                  </div>

                  <div className={styles.scheduleRow}>
                    <span>{item.schedule}</span>
                    <span>{item.reviewer}</span>
                  </div>

                  <p className={styles.note}>{item.note}</p>

                  <div className={styles.actionRow}>
                    <button className={styles.primaryAction} type="button">
                      상세 확인
                    </button>
                    <button aria-disabled="true" className={styles.secondaryAction} type="button">
                      상태 변경 예정
                    </button>
                    <button aria-disabled="true" className={styles.secondaryAction} type="button">
                      메모 예정
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
