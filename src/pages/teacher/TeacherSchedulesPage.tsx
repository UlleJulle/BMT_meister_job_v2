import styles from "./TeacherReadOnlyPage.module.css";

const schedules = [
  { title: "현장실습 설명회", meta: "오늘 10:00 · 취업지원실", type: "학교 일정" },
  { title: "면접 질문 정리 지도", meta: "오늘 15:30 · 3학년 2반", type: "지도 일정" },
  { title: "이력서 피드백 공유", meta: "금요일 14:00 · 전기과", type: "상담 일정" },
];

export function TeacherSchedulesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>일반교사</p>
          <h1 className={styles.title}>일정</h1>
          <p className={styles.description}>학교 일정과 지도 일정을 읽기 전용으로 확인합니다.</p>
        </div>
        <span className={styles.statusPill}>조회 전용</span>
      </header>

      <section className={styles.section} aria-labelledby="teacher-schedules-list">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="teacher-schedules-list">
              주요 일정
            </h2>
            <p className={styles.sectionText}>수정 없이 오늘과 이번 주 일정을 확인합니다.</p>
          </div>
        </div>
        <div className={styles.sectionBody}>
          {schedules.map((schedule) => (
            <article className={styles.row} key={schedule.title}>
              <div>
                <strong>{schedule.title}</strong>
                <span>{schedule.meta}</span>
              </div>
              <span className={`${styles.badge} ${styles.badgeNeutral}`.trim()}>{schedule.type}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
