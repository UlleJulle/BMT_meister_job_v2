import styles from "./EmploymentReadOnlyPage.module.css";

const schedules = [
  { title: "공식 일정 운영", meta: "설명회 · 면접 일정 · 행사 일정", aside: "조회 shell" },
  { title: "이번 주 확인 항목", meta: "변경 가능 일정 2건", aside: "placeholder" },
];

export function EmploymentSchedulesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>일정</h1>
          <p className={styles.description}>공식 일정을 운영 관점에서 확인하는 1차 shell입니다.</p>
        </div>
        <span className={styles.statusPill}>운영 shell</span>
      </header>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>일정 운영 미리보기</h2>
            <p className={styles.sectionText}>생성·수정·삭제 기능은 이번 차수 범위에 포함하지 않습니다.</p>
          </div>
        </div>
        <div className={styles.sectionBody}>
          {schedules.map((item) => (
            <article className={styles.row} key={item.title}>
              <div>
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
              </div>
              <span className={styles.rowAside}>{item.aside}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
