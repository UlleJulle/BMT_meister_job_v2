import {
  employmentStudentMobileFilters as mobileFilters,
  employmentStudentSelectFilters as selectFilters,
  employmentStudentStatusFilters as statusFilters,
  employmentStudentSummaryItems as summaryItems,
  employmentStudents as students,
} from "../../mocks/employmentStudents";
import styles from "./EmploymentStudentsPage.module.css";

function StatusBadge({
  children,
  tone,
}: {
  children: string;
  tone: "warning" | "info" | "neutral" | "success";
}) {
  return (
    <span className={`${styles.statusBadge} ${styles[tone]}`.trim()}>
      <span aria-hidden="true" />
      {children}
    </span>
  );
}

export function EmploymentStudentsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>학생현황</h1>
          <p className={styles.description}>학생별 취업 준비 상태와 확인이 필요한 학생을 봅니다.</p>
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
            <p className={styles.sectionDescription}>3학년 중심으로 확인하되 특채 지원자는 2학년까지 함께 봅니다.</p>
          </div>
          <div className={styles.paginationMeta}>1-20 / 233명</div>
        </div>

        <div className={styles.compactFilterBar}>
          <label className={styles.searchField}>
            <span className={styles.searchLabel}>학생 검색</span>
            <input type="text" value="김, 반, 희망 직무" readOnly aria-label="학생 검색" />
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
            <input type="text" value="김, 반, 희망 직무" readOnly aria-label="학생 검색" />
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
            <p className={styles.sectionDescription}>상태, 최근 지원, 확인 메모를 한 줄에 두고 빠르게 비교합니다.</p>
          </div>
          <div className={styles.paginationMeta}>현재 필터 63명</div>
        </div>

        <div className={styles.tableShell}>
          <div className={styles.tableHeader} role="row">
            <span>학생명</span>
            <span>학년/반</span>
            <span>학과</span>
            <span>특채</span>
            <span>희망 직무</span>
            <span>최근 지원</span>
            <span>상태</span>
            <span>확인 메모</span>
            <span>상세</span>
          </div>

          <div className={styles.tableBody}>
            {students.map((student) => (
              <article className={styles.tableRow} key={`${student.name}-${student.latestApplication}`}>
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
            <span className={styles.paginationInfo}>1-20 / 233명</span>
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
            <article className={styles.studentCard} key={`${student.name}-${student.latestApplication}-mobile`}>
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
      </section>
    </div>
  );
}
