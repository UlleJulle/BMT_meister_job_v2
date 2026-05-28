import styles from "./EmploymentReadOnlyPage.module.css";

const surveys = [
  { title: "참여조사 진행 현황", meta: "미응답 8명 · 금주 마감", aside: "조회 shell" },
  { title: "행사 출석 확인", meta: "설명회 응답률 84%", aside: "placeholder" },
];

export function EmploymentSurveysPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>참여조사</h1>
          <p className={styles.description}>행사와 조사 응답 흐름을 확인하는 1차 shell입니다.</p>
        </div>
        <span className={styles.statusPill}>운영 shell</span>
      </header>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>조사 운영 미리보기</h2>
            <p className={styles.sectionText}>생성과 마감 기능은 다음 단계에서 연결합니다.</p>
          </div>
        </div>
        <div className={styles.sectionBody}>
          {surveys.map((item) => (
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
