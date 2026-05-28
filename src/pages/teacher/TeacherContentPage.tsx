import styles from "./TeacherReadOnlyPage.module.css";

const items = [
  { title: "자기소개서 2차 제출 일정 안내", meta: "공지 · 학생 안내 필요", type: "공지" },
  { title: "면접 예상 질문 정리 자료", meta: "자료 · 읽기 전용", type: "자료" },
  { title: "기계과 산업뉴스 요약", meta: "뉴스 · 주간 브리핑", type: "뉴스" },
];

export function TeacherContentPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>일반교사</p>
          <h1 className={styles.title}>콘텐츠</h1>
          <p className={styles.description}>학생 안내에 필요한 뉴스, 공지, 자료를 확인합니다.</p>
        </div>
        <span className={styles.statusPill}>조회 전용</span>
      </header>

      <section className={styles.section} aria-labelledby="teacher-content-list">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="teacher-content-list">
              콘텐츠 미리보기
            </h2>
            <p className={styles.sectionText}>등록이나 수정 없이 읽기 중심으로 제공합니다.</p>
          </div>
        </div>
        <div className={styles.sectionBody}>
          {items.map((item) => (
            <article className={styles.row} key={item.title}>
              <div>
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
              </div>
              <span className={`${styles.badge} ${styles.badgeSuccess}`.trim()}>{item.type}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
