import styles from "./TeacherDashboardPage.module.css";

const summaryItems = [
  { label: "담당 학생", value: "24명", meta: "이번 주 상담 필요 3명" },
  { label: "마감 임박 공고", value: "3건", meta: "D-3 이내 공고 기준" },
  { label: "오늘 일정", value: "2건", meta: "면접 대비와 설명회" },
  { label: "읽지 않은 공지", value: "4건", meta: "중요 공지 1건 포함" },
];

const students = [
  { name: "김도윤", meta: "기계과 · 3학년 2반", status: "이력서 점검 필요" },
  { name: "박서준", meta: "전기과 · 3학년 1반", status: "면접 준비 안정" },
  { name: "이채은", meta: "전자과 · 3학년 4반", status: "지원 공고 비교 중" },
];

const jobs = [
  { company: "세진정밀", title: "생산기술 보조 채용", due: "D-2" },
  { company: "동해테크", title: "설비 유지보수 인턴", due: "D-5" },
];

const schedules = [
  { time: "10:00", title: "현장실습 설명회", meta: "취업지원실" },
  { time: "15:30", title: "면접 질문 정리 지도", meta: "3학년 2반" },
];

const notices = [
  { title: "자기소개서 2차 제출 일정 안내", type: "중요 공지" },
  { title: "면접 복장 체크리스트 업데이트", type: "안내 자료" },
];

export function TeacherDashboardPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>일반교사 포털</p>
          <h1 className={styles.title}>교사 대시보드</h1>
          <p className={styles.description}>담당 학생과 주요 취업 일정을 확인합니다.</p>
        </div>
      </header>

      <section aria-label="요약" className={styles.summaryGrid}>
        {summaryItems.map((item) => (
          <article className={styles.summaryCard} key={item.label}>
            <span className={styles.summaryLabel}>{item.label}</span>
            <strong className={styles.summaryValue}>{item.value}</strong>
            <span className={styles.summaryMeta}>{item.meta}</span>
          </article>
        ))}
      </section>

      <div className={styles.grid}>
        <section className={styles.section} aria-labelledby="teacher-students-preview">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle} id="teacher-students-preview">
                담당 학생 현황
              </h2>
              <p className={styles.sectionText}>학생 기본 상태를 읽기 전용으로 확인합니다.</p>
            </div>
            <span className={styles.readOnlyNote}>read-only</span>
          </div>
          <div className={styles.sectionBody}>
            {students.map((student) => (
              <article className={styles.row} key={student.name}>
                <div>
                  <strong className={styles.rowTitle}>{student.name}</strong>
                  <span className={styles.rowMeta}>{student.meta}</span>
                </div>
                <span className={`${styles.badge} ${styles.neutral}`.trim()}>{student.status}</span>
              </article>
            ))}
          </div>
        </section>

        <div className={styles.sectionStack}>
          <section className={styles.section} aria-labelledby="teacher-jobs-preview">
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle} id="teacher-jobs-preview">
                  마감 임박 공고
                </h2>
                <p className={styles.sectionText}>학생 안내가 필요한 공고만 빠르게 봅니다.</p>
              </div>
            </div>
            <div className={styles.sectionBody}>
              {jobs.map((job) => (
                <article className={styles.row} key={job.company}>
                  <div>
                    <strong className={styles.rowTitle}>{job.company}</strong>
                    <span className={styles.rowMeta}>{job.title}</span>
                  </div>
                  <span className={`${styles.badge} ${styles.warning}`.trim()}>{job.due}</span>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="teacher-schedules-preview">
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle} id="teacher-schedules-preview">
                  오늘 일정
                </h2>
                <p className={styles.sectionText}>지도와 상담에 필요한 일정만 요약합니다.</p>
              </div>
            </div>
            <div className={styles.sectionBody}>
              {schedules.map((schedule) => (
                <article className={styles.row} key={schedule.title}>
                  <div>
                    <strong className={styles.rowTitle}>{schedule.title}</strong>
                    <span className={styles.rowMeta}>{schedule.meta}</span>
                  </div>
                  <span className={styles.rowAside}>{schedule.time}</span>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="teacher-content-preview">
            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle} id="teacher-content-preview">
                  중요 공지
                </h2>
                <p className={styles.sectionText}>학생에게 안내할 콘텐츠를 읽기 전용으로 확인합니다.</p>
              </div>
            </div>
            <div className={styles.sectionBody}>
              {notices.map((notice) => (
                <article className={styles.row} key={notice.title}>
                  <div>
                    <strong className={styles.rowTitle}>{notice.title}</strong>
                  </div>
                  <span className={`${styles.badge} ${styles.success}`.trim()}>{notice.type}</span>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
