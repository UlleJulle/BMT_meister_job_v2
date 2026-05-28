import styles from "./EmploymentReadOnlyPage.module.css";

const items = [
  { title: "산업뉴스·공지·자료 운영", meta: "이번 주 게시 예정 3건", aside: "조회 shell" },
  { title: "검토 필요 콘텐츠", meta: "공지 1건 · 자료 2건", aside: "placeholder" },
];

export function EmploymentContentPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>콘텐츠</h1>
          <p className={styles.description}>뉴스와 공지, 자료 운영 흐름을 확인하는 1차 shell입니다.</p>
        </div>
        <span className={styles.statusPill}>운영 shell</span>
      </header>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>콘텐츠 운영 미리보기</h2>
            <p className={styles.sectionText}>게시와 수정 기능은 다음 단계에서 연결합니다.</p>
          </div>
        </div>
        <div className={styles.sectionBody}>
          {items.map((item) => (
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
