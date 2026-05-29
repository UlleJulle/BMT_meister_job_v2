import { useEffect, useMemo, useState } from "react";
import { useAuthSession } from "../../features/auth/useAuthSession";
import {
  employmentStudentMobileFilters as mobileFilters,
  employmentStudentSelectFilters as selectFilters,
  employmentStudentStatusFilters as statusFilters,
} from "../../mocks/employmentStudents";
import { defaultSchoolId } from "../../services/configService";
import { fetchStudents, type FetchStudentsResult } from "../../services/firestore/students";
import type { EmploymentStudentListItem, StudentDoc, StudentStatusTone } from "../../types/student";
import styles from "./EmploymentStudentsPage.module.css";

function StatusBadge({
  children,
  tone,
}: {
  children: string;
  tone: StudentStatusTone;
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

function getStatusTone(item: StudentDoc): StudentStatusTone {
  if (item.applicationStatus === "상담 필요") {
    return "warning";
  }

  if (item.employmentStatus === "confirmed" || item.applicationStatus === "취업 확정") {
    return "success";
  }

  if (item.applicationStatus === "지원 중" || item.applicationStatus === "추천 필요") {
    return "info";
  }

  return "neutral";
}

function toStudentItem(item: StudentDoc): EmploymentStudentListItem {
  const grade = toText(item.grade);
  const classNo = toText(item.classNo);

  return {
    id: item.studentId,
    name: item.name?.trim() || "학생명 확인 필요",
    gradeClass: `${grade}학년 ${classNo}반`,
    department: item.department?.trim() || "학과 확인 필요",
    specialTrack: item.specialTrack?.trim() || "트랙 확인 필요",
    desiredRole: item.desiredJob?.trim() || "희망 직무 확인 필요",
    latestApplication: item.recentApplicationSummary?.trim() || "최근 지원 이력 확인 필요",
    status: item.applicationStatus?.trim() || "상태 확인 필요",
    statusTone: getStatusTone(item),
    note: item.memo?.trim() || "메모 확인 필요",
    reviewer: item.assignedTeacherName?.trim() || "담당 교사 확인 필요",
  };
}

function createSummaryItems(items: StudentDoc[]) {
  const counselingCount = items.filter((item) => item.applicationStatus === "상담 필요").length;
  const confirmedCount = items.filter((item) => item.employmentStatus === "confirmed" || item.applicationStatus === "취업 확정").length;
  const gradeThreeCount = items.filter((item) => String(item.grade).trim() === "3").length;

  return [
    { label: "3학년 관리 대상", value: `${gradeThreeCount}명`, hint: "취업 집중 대상" },
    { label: "현재 필터", value: `${items.length}명`, hint: "조회 결과 기준" },
    { label: "상담 필요", value: `${counselingCount}명`, hint: "이번 주 우선" },
    { label: "취업 확정", value: `${confirmedCount}명`, hint: "배치 준비 포함" },
  ];
}

type StudentsLoadState =
  | { state: "loading" }
  | { state: "success"; path: string; items: StudentDoc[] }
  | { state: "empty"; path: string }
  | { state: "permission-denied"; path: string; message: string }
  | { state: "unavailable"; path: string; message: string }
  | { state: "error"; path: string; message: string };

function toLoadState(result: FetchStudentsResult): StudentsLoadState {
  if (result.state === "success") {
    return result.items.length
      ? { state: "success", path: result.path, items: result.items }
      : { state: "empty", path: result.path };
  }

  return result;
}

export function EmploymentStudentsPage() {
  const session = useAuthSession();
  const [loadState, setLoadState] = useState<StudentsLoadState>({ state: "loading" });

  const schoolId = useMemo(() => {
    if (session.state === "active" && session.user.schoolId.trim()) {
      return session.user.schoolId;
    }

    return defaultSchoolId || "bmt";
  }, [session]);

  useEffect(() => {
    let isMounted = true;

    setLoadState({ state: "loading" });

    fetchStudents(schoolId).then((result) => {
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

  const students = useMemo(() => {
    if (loadState.state !== "success") {
      return [];
    }

    return loadState.items.map(toStudentItem);
  }, [loadState]);

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>학생현황</h1>
          <p className={styles.description}>학생별 취업 준비 상태와 확인이 필요한 학생을 빠르게 검토합니다.</p>
        </div>
      </header>

      <section aria-label="학생 요약" className={styles.summaryGrid}>
        {summaryItems.map((item) => (
          <article className={styles.summaryCard} key={item.label}>
            <span className={styles.summaryLabel}>{item.label}</span>
            <strong className={styles.summaryValue}>{item.value}</strong>
            <span className={styles.summaryHint}>{item.hint}</span>
          </article>
        ))}
      </section>

      <section className={styles.controlSection} aria-labelledby="employment-students-controls">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="employment-students-controls">
              조회 조건
            </h2>
            <p className={styles.sectionDescription}>3학년 중심으로 확인하되, 필요한 경우 2학년까지 함께 검토합니다.</p>
          </div>
          <div className={styles.paginationMeta}>현재 필터 {students.length}명</div>
        </div>

        <div className={styles.compactFilterBar}>
          <label className={styles.searchField}>
            <span className={styles.searchLabel}>학생 검색</span>
            <input type="text" value="이름, 반, 희망 직무" readOnly aria-label="학생 검색" />
          </label>

          <div className={styles.desktopFilters} aria-label="desktop filters">
            {selectFilters.map((filter) => (
              <button type="button" className={styles.selectButton} key={filter.label} aria-label={`${filter.label} 선택`}>
                <span className={styles.selectLabel}>{filter.label}</span>
                <strong className={styles.selectValue}>{filter.value}</strong>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.mobileFilters} aria-label="mobile filters">
          <label className={styles.searchField}>
            <span className={styles.searchLabel}>학생 검색</span>
            <input type="text" value="이름, 반, 희망 직무" readOnly aria-label="학생 검색" />
          </label>

          <div className={styles.mobileFilterGroup}>
            <span className={styles.mobileFilterLabel}>학년</span>
            <div className={styles.filterRow}>
              {mobileFilters.grade.map((item, index) => (
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
          </div>

          <div className={styles.mobileFilterGroup}>
            <span className={styles.mobileFilterLabel}>상태</span>
            <div className={styles.filterRow}>
              {mobileFilters.status.map((item, index) => (
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
          </div>
        </div>

        <div className={styles.statusFilters}>
          {statusFilters.map((item, index) => (
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

      <section className={styles.listSection} aria-labelledby="employment-students-list">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="employment-students-list">
              학생 운영 목록
            </h2>
            <p className={styles.sectionDescription}>상태, 최근 지원, 확인 메모를 한 줄에 묶고 빠르게 비교합니다.</p>
          </div>
          <div className={styles.paginationMeta}>현재 필터 {students.length}명</div>
        </div>

        {loadState.state === "loading" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>학생 데이터를 불러오는 중입니다.</strong>
            <p className={styles.stateDescription}>`schools/{'{'}schoolId{'}'}/students` 읽기 결과를 확인하고 있습니다.</p>
          </div>
        ) : null}

        {loadState.state === "permission-denied" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>학생 데이터를 읽을 권한이 없습니다.</strong>
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
            <strong className={styles.stateTitle}>학생 데이터를 불러오지 못했습니다.</strong>
            <p className={styles.stateDescription}>{loadState.message}</p>
            <p className={styles.stateMeta}>경로: {loadState.path}</p>
          </div>
        ) : null}

        {loadState.state === "empty" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>등록된 학생이 아직 없습니다.</strong>
            <p className={styles.stateDescription}>Firestore read는 성공했지만 `students` 컬렉션에 표시할 데이터가 없습니다.</p>
            <p className={styles.stateMeta}>경로: {loadState.path}</p>
          </div>
        ) : null}

        {loadState.state === "success" ? (
          <>
            <p className={styles.stateMeta}>읽은 경로: {loadState.path}</p>

            <div className={styles.tableShell}>
              <div className={styles.tableHeader} role="row">
                <span>학생명</span>
                <span>학년/반</span>
                <span>학과</span>
                <span>특색</span>
                <span>희망 직무</span>
                <span>최근 지원</span>
                <span>상태</span>
                <span>확인 메모</span>
                <span>상세</span>
              </div>

              <div className={styles.tableBody}>
                {students.map((student) => (
                  <article className={styles.tableRow} key={student.id}>
                    <strong className={styles.studentName}>{student.name}</strong>
                    <span>{student.gradeClass}</span>
                    <span>{student.department}</span>
                    <span>{student.specialTrack}</span>
                    <span>{student.desiredRole}</span>
                    <span className={styles.latestApplication}>{student.latestApplication}</span>
                    <StatusBadge tone={student.statusTone}>{student.status}</StatusBadge>
                    <span className={styles.noteCell}>{student.note}</span>
                    <div className={styles.inlineActionCell}>
                      <button className={styles.primaryAction} type="button">
                        상세 확인
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className={styles.paginationRow}>
                <span className={styles.paginationInfo}>현재 필터 {students.length}명</span>
                <div className={styles.paginationActions}>
                  <button type="button" className={styles.secondaryAction} aria-disabled="true">
                    이전
                  </button>
                  <button type="button" className={styles.secondaryAction} aria-disabled="true">
                    다음
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.cardList}>
              {students.map((student) => (
                <article className={styles.studentCard} key={`${student.id}-mobile`}>
                  <div className={styles.cardTop}>
                    <div className={styles.identityBlock}>
                      <div className={styles.nameRow}>
                        <strong className={styles.studentName}>{student.name}</strong>
                        <span className={styles.classInfo}>
                          {student.department} · {student.gradeClass}
                        </span>
                      </div>
                      <div className={styles.metaChips}>
                        <span className={styles.metaChip}>{student.specialTrack}</span>
                        <span className={styles.metaChip}>희망 {student.desiredRole}</span>
                      </div>
                      <h3 className={styles.latestJob}>{student.latestApplication}</h3>
                    </div>

                    <div className={styles.statusBlock}>
                      <StatusBadge tone={student.statusTone}>{student.status}</StatusBadge>
                    </div>
                  </div>

                  <div className={styles.metaRow}>
                    <span>담당 교사 · {student.reviewer}</span>
                    <span>최근 지원 확인</span>
                  </div>

                  <p className={styles.note}>{student.note}</p>

                  <div className={styles.actionRow}>
                    <button className={styles.primaryAction} type="button">
                      상세 확인
                    </button>
                    <button aria-disabled="true" className={styles.secondaryAction} type="button">
                      상담 메모 예정
                    </button>
                    <button aria-disabled="true" className={styles.secondaryAction} type="button">
                      상태 변경 예정
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
