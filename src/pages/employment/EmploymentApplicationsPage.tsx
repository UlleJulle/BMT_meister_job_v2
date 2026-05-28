import styles from "./EmploymentApplicationsPage.module.css";

const summaryItems = [
  { label: "전체 지원", value: "18건" },
  { label: "확인 필요", value: "5건" },
  { label: "면접 예정", value: "4건" },
  { label: "결과 대기", value: "6건" },
];

const filterItems = ["전체", "확인 필요", "서류 제출", "면접 예정", "결과 대기"];

const applications = [
  {
    student: "김도윤",
    classInfo: "기계과 · 3학년 2반",
    company: "세진정밀",
    jobTitle: "생산기술 보조 채용",
    status: "확인 필요",
    statusTone: "warning",
    schedule: "서류 제출 05.29 · 면접 안내 확인 필요",
    note: "추천서 첨부 여부 최종 점검 필요",
    reviewer: "취업진로부 박교사",
  },
  {
    student: "박서준",
    classInfo: "전기과 · 3학년 1반",
    company: "동해테크",
    jobTitle: "설비 유지보수 인턴",
    status: "면접 예정",
    statusTone: "info",
    schedule: "면접 예정 06.03 14:00",
    note: "면접 질문 정리본 전달 완료",
    reviewer: "취업진로부 이교사",
  },
  {
    student: "이채은",
    classInfo: "전자과 · 3학년 4반",
    company: "미래에너지시스템",
    jobTitle: "현장 배선 조립 채용",
    status: "서류 제출",
    statusTone: "neutral",
    schedule: "서류 제출 05.28 · 결과 대기 전",
    note: "지원서 접수 확인 완료",
    reviewer: "취업진로부 김교사",
  },
  {
    student: "최민재",
    classInfo: "자동차과 · 3학년 3반",
    company: "그린모빌리티",
    jobTitle: "차량 조립 보조 채용",
    status: "결과 대기",
    statusTone: "neutral",
    schedule: "결과 예정 06.05",
    note: "추가 연락 여부 확인 예정",
    reviewer: "취업진로부 박교사",
  },
  {
    student: "정하은",
    classInfo: "기계과 · 3학년 1반",
    company: "부산스마트팩토리",
    jobTitle: "설비 운영 사원 모집",
    status: "합격 확정",
    statusTone: "success",
    schedule: "합격 통보 05.27 · 배치 안내 필요",
    note: "현장실습 연계 서류 준비 중",
    reviewer: "취업진로부 이교사",
  },
] as const;

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
