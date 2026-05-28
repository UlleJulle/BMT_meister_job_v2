import {
  employmentDashboardCompanyDistribution as companyDistribution,
  employmentDashboardDepartmentRanking as departmentRanking,
  employmentDashboardKpis as kpis,
  employmentDashboardTasks as tasks,
} from "../../mocks/employmentDashboard";
import styles from "./EmploymentDashboardPage.module.css";

export function EmploymentDashboardPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부 운영</p>
          <h1 className={styles.title}>취업 현황 대시보드</h1>
          <p className={styles.description}>학과별 취업률과 오늘 확인할 운영 현황을 정리해 보여줍니다.</p>
        </div>
      </header>

      <section aria-label="핵심 지표" className={styles.kpiGrid}>
        {kpis.map((item) => (
          <article className={styles.kpiCard} key={item.label}>
            <span className={styles.kpiLabel}>{item.label}</span>
            <strong className={styles.kpiValue}>{item.value}</strong>
            <span className={styles.kpiMeta}>{item.meta}</span>
          </article>
        ))}
      </section>

      <div className={styles.mainGrid}>
        <div className={styles.leftColumn}>
          <section className={styles.panel} aria-labelledby="employment-distribution">
            <div className={styles.panelHeader}>
              <div>
                <h2 className={styles.panelTitle} id="employment-distribution">
                  기업 형태 분포
                </h2>
                <p className={styles.panelText}>기업 유형별 채용 흐름을 나눠서 확인합니다.</p>
              </div>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.distributionList}>
                {companyDistribution.map((item) => (
                  <article className={styles.distributionRow} key={item.label}>
                    <div>
                      <strong className={styles.distributionLabel}>{item.label}</strong>
                      <span className={styles.distributionMeta}>{item.meta}</span>
                      <div className={styles.barTrack}>
                        <div className={styles.barFill} style={{ width: `${item.percent}%` }} />
                      </div>
                    </div>
                    <span className={styles.distributionValue}>{item.percent}%</span>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.panel} aria-labelledby="employment-ranking">
            <div className={styles.panelHeader}>
              <div>
                <h2 className={styles.panelTitle} id="employment-ranking">
                  학과별 취업률 순위
                </h2>
                <p className={styles.panelText}>학과별 확정·약정 흐름을 함께 비교합니다.</p>
              </div>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.rankingList}>
                {departmentRanking.map((item, index) => (
                  <article className={styles.rankingRow} key={item.label}>
                    <div>
                      <strong className={styles.rankingLabel}>
                        {index + 1}. {item.label}
                      </strong>
                      <span className={styles.rankingMeta}>{item.meta}</span>
                    </div>
                    <span className={styles.rankingValue}>{item.value}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className={styles.rightColumn}>
          <section className={styles.panel} aria-labelledby="employment-alerts">
            <div className={styles.panelHeader}>
              <div>
                <h2 className={styles.panelTitle} id="employment-alerts">
                  오늘 처리할 일
                </h2>
                <p className={styles.panelText}>운영 우선순위가 높은 항목부터 확인합니다.</p>
              </div>
            </div>
            <div className={styles.panelBody}>
              <div className={styles.alertList}>
                {tasks.map((item) => (
                  <article className={styles.alertRow} key={item.title}>
                    <div>
                      <strong className={styles.alertTitle}>{item.title}</strong>
                      <span className={styles.alertMeta}>{item.meta}</span>
                    </div>
                    <span className={`${styles.alertBadge} ${styles[item.tone]}`.trim()}>{item.badge}</span>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
