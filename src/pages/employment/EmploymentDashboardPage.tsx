import styles from "./EmploymentDashboardPage.module.css";

const kpis = [
  { label: "전체 취업률", value: "68%", meta: "이번 주 확인 대상 18명" },
  { label: "취업 확정", value: "34명", meta: "기업 배치 완료 기준" },
  { label: "취업 약정", value: "11명", meta: "추천·약정 후속 확인 필요" },
  { label: "미확정", value: "18명", meta: "집중 상담과 공고 연결 필요" },
  { label: "대상 학생", value: "63명", meta: "3학년 전체 관리 기준" },
];

const companyDistribution = [
  { label: "중견기업", meta: "협약 포함 채용 비중", percent: 42 },
  { label: "중소기업", meta: "현장실습 연계 중심", percent: 34 },
  { label: "공공·기관", meta: "준비 중인 전형 포함", percent: 14 },
  { label: "기타", meta: "추가 탐색 기업군", percent: 10 },
];

const departmentRanking = [
  { label: "기계과", meta: "취업 확정 14명 · 약정 3명", value: "79%" },
  { label: "전기과", meta: "취업 확정 11명 · 약정 2명", value: "73%" },
  { label: "전자과", meta: "취업 확정 9명 · 약정 4명", value: "66%" },
  { label: "자동차과", meta: "취업 확정 7명 · 상담 필요 5명", value: "61%" },
];

const tasks = [
  { title: "세진정밀 생산기술 공고", meta: "마감까지 2일 · 지원서 최종 점검 필요", badge: "마감 임박", tone: "danger" },
  { title: "추천 확인 필요 학생 3명", meta: "전기과 2명 · 기계과 1명", badge: "추천 확인", tone: "warning" },
  { title: "미응답 참여조사 8명", meta: "현장실습 사전 조사 · 오늘 재안내 필요", badge: "미응답", tone: "neutral" },
  { title: "승인·검토 대기 4건", meta: "공지 1건 · 자료 3건", badge: "검토 대기", tone: "warning" },
  { title: "AI draft 검토 대기 2건", meta: "공고 초안 1건 · 뉴스 초안 1건", badge: "초안 검토", tone: "neutral" },
];

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
                <p className={styles.panelText}>기업 유형별 채용 흐름을 한눈에 확인합니다.</p>
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
