import styles from "./TeacherReadOnlyPage.module.css";

const jobs = [
  { company: "세진정밀", title: "생산기술 보조 채용", meta: "기계과 우선", due: "D-2" },
  { company: "동해테크", title: "설비 유지보수 인턴", meta: "전기·기계과", due: "D-5" },
  { company: "미래에너지시스템", title: "현장 배선 조립 채용", meta: "전자과", due: "D-4" },
];

export function TeacherJobsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>일반교사</p>
          <h1 className={styles.title}>채용공고</h1>
          <p className={styles.description}>학생 안내에 필요한 공고를 읽기 전용으로 비교합니다.</p>
        </div>
        <span className={styles.statusPill}>조회 전용</span>
      </header>

      <section className={styles.section} aria-labelledby="teacher-jobs-list">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="teacher-jobs-list">
              공고 미리보기
            </h2>
            <p className={styles.sectionText}>마감과 학과 적합도만 빠르게 확인합니다.</p>
          </div>
        </div>
        <div className={styles.sectionBody}>
          {jobs.map((job) => (
            <article className={styles.row} key={job.company}>
              <div>
                <strong>{job.company}</strong>
                <span>{job.title}</span>
                <span className={styles.metaGroup}>{job.meta}</span>
              </div>
              <span className={styles.rowAside}>{job.due}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
