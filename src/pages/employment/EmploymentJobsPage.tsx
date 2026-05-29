import { useEffect, useMemo, useState } from "react";
import { defaultSchoolId } from "../../services/configService";
import { fetchJobPostings, type FetchJobPostingsResult } from "../../services/firestore/jobPostings";
import { employmentJobFilterItems as filterItems } from "../../mocks/employmentJobs";
import type { EmploymentJobListItem, JobPostingDoc, JobPostingTone } from "../../types/jobPosting";
import { useAuthSession } from "../../features/auth/useAuthSession";
import styles from "./EmploymentJobsPage.module.css";

function StatusBadge({
  children,
  tone,
}: {
  children: string;
  tone: JobPostingTone;
}) {
  return (
    <span className={`${styles.statusBadge} ${styles[tone]}`.trim()}>
      <span aria-hidden="true" />
      {children}
    </span>
  );
}

function formatDate(value: unknown) {
  if (!value || typeof value !== "object" || !("toDate" in value) || typeof value.toDate !== "function") {
    return "확인 필요";
  }

  const date = value.toDate();

  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "확인 필요";
  }

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function getDeadlineTone(value: unknown): JobPostingTone {
  if (!value || typeof value !== "object" || !("toDate" in value) || typeof value.toDate !== "function") {
    return "neutral";
  }

  const target = value.toDate();

  if (!(target instanceof Date) || Number.isNaN(target.getTime())) {
    return "neutral";
  }

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const startOfTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();
  const diffDays = Math.ceil((startOfTarget - startOfToday) / (1000 * 60 * 60 * 24));

  if (diffDays <= 2) {
    return "danger";
  }

  if (diffDays <= 7) {
    return "warning";
  }

  return "neutral";
}

function formatDday(value: unknown) {
  if (!value || typeof value !== "object" || !("toDate" in value) || typeof value.toDate !== "function") {
    return "일정 확인";
  }

  const target = value.toDate();

  if (!(target instanceof Date) || Number.isNaN(target.getTime())) {
    return "일정 확인";
  }

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const startOfTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();
  const diffDays = Math.ceil((startOfTarget - startOfToday) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return `D+${Math.abs(diffDays)}`;
  }

  if (diffDays === 0) {
    return "D-Day";
  }

  return `D-${diffDays}`;
}

function getPublishMeta(visibility: JobPostingDoc["visibility"]) {
  if (visibility === "published") {
    return { label: "게시 중", tone: "success" as const };
  }

  return { label: "비공개", tone: "warning" as const };
}

function getStatusMeta(status: JobPostingDoc["status"]) {
  if (status === "open") {
    return { label: "접수 중", tone: "warning" as const };
  }

  if (status === "closed") {
    return { label: "마감", tone: "neutral" as const };
  }

  return { label: "초안", tone: "neutral" as const };
}

function toJobItem(item: JobPostingDoc): EmploymentJobListItem {
  const publishMeta = getPublishMeta(item.visibility);
  const statusMeta = getStatusMeta(item.status);
  const department = item.departmentTags?.length ? item.departmentTags.join(" · ") : "확인 필요";
  const jobType = item.jobType?.trim() ? item.jobType : "직무 확인 필요";
  const employmentType = item.employmentType?.trim() ? item.employmentType : "고용형태 확인 필요";
  const sourceLabel = item.sourceType?.trim() ? `수집 경로 ${item.sourceType}` : "수집 경로 확인 필요";

  return {
    id: item.jobId,
    company: item.companyName?.trim() || "기업명 확인 필요",
    title: item.title?.trim() || "공고명 확인 필요",
    companyType: employmentType,
    department,
    dueDate: formatDate(item.deadlineAt),
    dDay: formatDday(item.deadlineAt),
    dDayTone: getDeadlineTone(item.deadlineAt),
    publishStatus: publishMeta.label,
    publishTone: publishMeta.tone,
    recommendation: statusMeta.label,
    recommendationTone: statusMeta.tone,
    metric: jobType,
    note: item.memo?.trim() || sourceLabel,
  };
}

function createSummaryItems(items: JobPostingDoc[]) {
  const publishedCount = items.filter((item) => item.visibility === "published").length;
  const closedCount = items.filter((item) => item.status === "closed").length;
  const privateCount = items.filter((item) => item.visibility === "private").length;

  return [
    { label: "전체 공고", value: `${items.length}건` },
    { label: "게시 중", value: `${publishedCount}건` },
    { label: "마감", value: `${closedCount}건` },
    { label: "비공개", value: `${privateCount}건` },
  ];
}

type JobsLoadState =
  | { state: "loading" }
  | { state: "success"; path: string; items: JobPostingDoc[] }
  | { state: "empty"; path: string }
  | { state: "permission-denied"; path: string; message: string }
  | { state: "unavailable"; path: string; message: string }
  | { state: "error"; path: string; message: string };

function toLoadState(result: FetchJobPostingsResult): JobsLoadState {
  if (result.state === "success") {
    return result.items.length
      ? { state: "success", path: result.path, items: result.items }
      : { state: "empty", path: result.path };
  }

  return result;
}

export function EmploymentJobsPage() {
  const session = useAuthSession();
  const [loadState, setLoadState] = useState<JobsLoadState>({ state: "loading" });

  const schoolId = useMemo(() => {
    if (session.state === "active" && session.user.schoolId.trim()) {
      return session.user.schoolId;
    }

    return defaultSchoolId || "bmt";
  }, [session]);

  useEffect(() => {
    let isMounted = true;

    setLoadState({ state: "loading" });

    fetchJobPostings(schoolId).then((result) => {
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

  const jobs = useMemo(() => {
    if (loadState.state !== "success") {
      return [];
    }

    return loadState.items.map(toJobItem);
  }, [loadState]);

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>채용공고 운영</h1>
          <p className={styles.description}>게시 중인 공고와 검토가 필요한 공고를 한 화면에서 빠르게 확인합니다.</p>
        </div>
      </header>

      <section aria-label="운영 요약" className={styles.summaryGrid}>
        {summaryItems.map((item) => (
          <article className={styles.summaryCard} key={item.label}>
            <span className={styles.summaryLabel}>{item.label}</span>
            <strong className={styles.summaryValue}>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className={styles.filterSection} aria-labelledby="employment-jobs-filters">
        <div className={styles.filterHeader}>
          <h2 className={styles.filterTitle} id="employment-jobs-filters">
            운영 상태 필터
          </h2>
          <span className={styles.filterHint}>현재는 조회 shell만 연결했고 실제 필터 로직은 아직 연결하지 않았습니다.</span>
        </div>
        <div className={styles.filterRow}>
          {filterItems.map((item, index) => (
            <button
              aria-pressed={index === 0}
              className={`${styles.filterChip} ${index === 0 ? styles.activeFilterChip : ""}`.trim()}
              key={item}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.listSection} aria-labelledby="employment-jobs-list">
        <div className={styles.listHeader}>
          <div>
            <h2 className={styles.listTitle} id="employment-jobs-list">
              공고 운영 목록
            </h2>
            <p className={styles.listDescription}>학교별 공고 문서를 읽기 전용으로 불러오고, 생성·수정·삭제는 아직 열지 않았습니다.</p>
          </div>
        </div>

        {loadState.state === "loading" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>공고 데이터를 불러오는 중입니다.</strong>
            <p className={styles.stateDescription}>`schools/{'{'}schoolId{'}'}/jobPostings` 읽기 결과를 확인하고 있습니다.</p>
          </div>
        ) : null}

        {loadState.state === "permission-denied" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>공고 데이터를 읽을 권한이 없습니다.</strong>
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
            <strong className={styles.stateTitle}>공고 데이터를 불러오지 못했습니다.</strong>
            <p className={styles.stateDescription}>{loadState.message}</p>
            <p className={styles.stateMeta}>경로: {loadState.path}</p>
          </div>
        ) : null}

        {loadState.state === "empty" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>등록된 공고가 아직 없습니다.</strong>
            <p className={styles.stateDescription}>Firestore read는 성공했지만 `jobPostings` 컬렉션에 표시할 데이터가 없습니다.</p>
            <p className={styles.stateMeta}>경로: {loadState.path}</p>
          </div>
        ) : null}

        {loadState.state === "success" ? (
          <>
            <p className={styles.stateMeta}>읽은 경로: {loadState.path}</p>
            <div className={styles.cardList}>
              {jobs.map((job) => (
                <article className={styles.jobCard} key={job.id}>
                  <div className={styles.cardTop}>
                    <div className={styles.cardIdentity}>
                      <span className={styles.companyType}>{job.companyType}</span>
                      <strong className={styles.companyName}>{job.company}</strong>
                      <h3 className={styles.jobTitle}>{job.title}</h3>
                    </div>

                    <div className={styles.cardStatus}>
                      <StatusBadge tone={job.publishTone}>{job.publishStatus}</StatusBadge>
                      <StatusBadge tone={job.recommendationTone}>{job.recommendation}</StatusBadge>
                    </div>
                  </div>

                  <div className={styles.metaRow}>
                    <span>{job.department}</span>
                    <span>{job.metric}</span>
                  </div>

                  <div className={styles.deadlineRow}>
                    <div>
                      <span className={styles.deadlineLabel}>마감일</span>
                      <strong>{job.dueDate}</strong>
                    </div>
                    <StatusBadge tone={job.dDayTone}>{job.dDay}</StatusBadge>
                  </div>

                  <p className={styles.note}>{job.note}</p>

                  <div className={styles.actionRow}>
                    <button className={styles.primaryAction} type="button">
                      상세 확인
                    </button>
                    <button aria-disabled="true" className={styles.secondaryAction} type="button">
                      수정 예정
                    </button>
                    <button aria-disabled="true" className={styles.secondaryAction} type="button">
                      보관 예정
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
