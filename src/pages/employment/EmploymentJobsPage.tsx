import {
  employmentJobFilterItems as filterItems,
  employmentJobs as jobs,
  employmentJobSummaryItems as summaryItems,
} from "../../mocks/employmentJobs";
import styles from "./EmploymentJobsPage.module.css";

function StatusBadge({
  children,
  tone,
}: {
  children: string;
  tone: "success" | "warning" | "danger" | "neutral";
}) {
  return (
    <span className={`${styles.statusBadge} ${styles[tone]}`.trim()}>
      <span aria-hidden="true" />
      {children}
    </span>
  );
}

export function EmploymentJobsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>채용공고 운영</h1>
          <p className={styles.description}>게시 중인 공고와 검토가 필요한 공고를 확인합니다.</p>
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
          <span className={styles.filterHint}>상태별 우선순위를 빠르게 확인합니다.</span>
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
            <p className={styles.listDescription}>마감, 게시 상태, 추천 필요 여부를 한 화면에서 비교합니다.</p>
          </div>
        </div>

        <div className={styles.cardList}>
          {jobs.map((job) => (
            <article className={styles.jobCard} key={`${job.company}-${job.title}`}>
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
      </section>
    </div>
  );
}
