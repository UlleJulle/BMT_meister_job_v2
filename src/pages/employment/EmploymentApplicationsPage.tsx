import {
  employmentApplicationFilterItems as filterItems,
  employmentApplications as applications,
  employmentApplicationSummaryItems as summaryItems,
} from "../../mocks/employmentApplications";
import styles from "./EmploymentApplicationsPage.module.css";

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

export function EmploymentApplicationsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>지원현황</h1>
          <p className={styles.description}>학생별 지원 상태와 확인이 필요한 항목을 봅니다.</p>
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

        <div className={styles.cardList}>
          {applications.map((item) => (
            <article className={styles.applicationCard} key={`${item.student}-${item.company}-${item.jobTitle}`}>
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
      </section>
    </div>
  );
}
