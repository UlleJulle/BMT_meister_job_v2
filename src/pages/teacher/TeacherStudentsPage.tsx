import styles from "./TeacherReadOnlyPage.module.css";

const students = [
  { name: "김도윤", meta: "기계과 · 3학년 2반", detail: "이력서 점검 필요", note: "상담 예정" },
  { name: "박서준", meta: "전기과 · 3학년 1반", detail: "지원 가능 공고 비교 중", note: "읽기 전용" },
  { name: "이채은", meta: "전자과 · 3학년 4반", detail: "면접 준비 안정", note: "읽기 전용" },
];

export function TeacherStudentsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>일반교사</p>
          <h1 className={styles.title}>학생현황</h1>
          <p className={styles.description}>담당 학생의 취업 준비 상태를 읽기 전용으로 확인합니다.</p>
        </div>
        <span className={styles.statusPill}>조회 전용</span>
      </header>

      <section className={styles.section} aria-labelledby="teacher-students-list">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="teacher-students-list">
              담당 학생 목록
            </h2>
            <p className={styles.sectionText}>수정 없이 현재 등록 상태만 확인합니다.</p>
          </div>
        </div>
        <div className={styles.sectionBody}>
          {students.map((student) => (
            <article className={styles.row} key={student.name}>
              <div>
                <strong>{student.name}</strong>
                <span>{student.meta}</span>
                <span className={styles.metaGroup}>{student.detail}</span>
              </div>
              <span className={styles.rowAside}>{student.note}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
