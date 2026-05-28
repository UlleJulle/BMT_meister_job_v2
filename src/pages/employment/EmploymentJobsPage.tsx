import styles from "./EmploymentJobsPage.module.css";

const summaryItems = [
  { label: "게시 중", value: "12건" },
  { label: "마감 임박", value: "3건" },
  { label: "추천 필요", value: "4건" },
  { label: "검토 대기", value: "2건" },
];

const filterItems = ["전체", "게시 중", "마감 임박", "추천 필요", "검토 대기"];

const jobs = [
  {
    company: "세진정밀",
    title: "생산기술 보조 채용",
    companyType: "중견기업",
    department: "기계과",
    dueDate: "2026.06.01",
    dDay: "D-2",
    dDayTone: "danger",
    publishStatus: "게시 중",
    publishTone: "success",
    recommendation: "추천 필요",
    recommendationTone: "warning",
    metric: "지원자 6명",
    note: "이력서 2건 추가 확인 필요",
  },
  {
    company: "동해테크",
    title: "설비 유지보수 인턴",
    companyType: "중소기업",
    department: "전기과 · 기계과",
    dueDate: "2026.06.04",
    dDay: "D-5",
    dDayTone: "warning",
    publishStatus: "게시 중",
    publishTone: "success",
    recommendation: "추천 검토",
    recommendationTone: "warning",
    metric: "조회 24회",
    note: "면접 안내 문구 점검 예정",
  },
  {
    company: "미래에너지시스템",
    title: "현장 배선 조립 채용",
    companyType: "중소기업",
    department: "전자과",
    dueDate: "2026.06.03",
    dDay: "D-4",
    dDayTone: "warning",
    publishStatus: "게시 중",
    publishTone: "success",
    recommendation: "추천 필요",
    recommendationTone: "warning",
    metric: "지원자 3명",
    note: "추천 학생 1명 추가 검토 필요",
  },
  {
    company: "그린모빌리티",
    title: "차량 조립 보조 채용",
    companyType: "협약기업",
    department: "자동차과",
    dueDate: "2026.06.09",
    dDay: "D-10",
    dDayTone: "neutral",
    publishStatus: "검토 대기",
    publishTone: "warning",
    recommendation: "확인 예정",
    recommendationTone: "neutral",
    metric: "초안 1건",
    note: "게시 전 학과 대상 문구 확인 필요",
  },
  {
    company: "부산스마트팩토리",
    title: "설비 운영 사원 모집",
    companyType: "중견기업",
    department: "기계과 · 전기과",
    dueDate: "2026.06.12",
    dDay: "D-13",
    dDayTone: "neutral",
    publishStatus: "게시 중",
    publishTone: "success",
    recommendation: "추천 완료",
    recommendationTone: "neutral",
    metric: "지원자 8명",
    note: "현장실습 연계 대상 별도 체크",
  },
] as const;

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
