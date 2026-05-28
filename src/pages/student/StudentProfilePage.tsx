import styles from "./StudentProfilePage.module.css";

type StatusTone = "ready" | "progress" | "warning";

type StatusItem = {
  id: string;
  label: string;
  value: string;
  tone: StatusTone;
};

const basicInfo = [
  { label: "이름", value: "김도윤" },
  { label: "학년 / 반", value: "3학년 2반" },
  { label: "학과", value: "기계과" },
  { label: "연락처", value: "010-0000-0000" },
];

const careerInfo = [
  { label: "희망 직무", value: "생산기술" },
  { label: "희망 지역", value: "부산 · 창원" },
  { label: "관심 기업 유형", value: "협약기업 · 중견기업" },
];

const certificates = ["지게차운전기능사", "컴퓨터응용선반기능사", "산업안전 기초 이수"];
const preparingItems = ["자기소개서 문장 보완", "면접 질문 정리"];

const statusItems: StatusItem[] = [
  { id: "status-1", label: "자기소개서", value: "초안 완료", tone: "ready" },
  { id: "status-2", label: "면접 준비", value: "질문 정리 중", tone: "progress" },
  { id: "status-3", label: "추천서 필요", value: "확인 필요", tone: "warning" },
  { id: "status-4", label: "지원 가능 상태", value: "지원 가능", tone: "ready" },
];

function StatusBadge({ tone, children }: { tone: StatusTone; children: string }) {
  return (
    <span
      className={`${styles.statusBadge} ${tone === "ready" ? styles.ready : tone === "progress" ? styles.progress : styles.warning}`.trim()}
    >
      <span aria-hidden="true" className={styles.statusDot} />
      {children}
    </span>
  );
}

export function StudentProfilePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>학생 프로필</p>
          <h1>내 정보</h1>
          <p className={styles.description}>취업 준비 기본 정보를 확인합니다.</p>
        </div>
        <p className={styles.headerNote}>프로필 수정은 다음 단계에서 연결됩니다.</p>
      </header>

      <div className={styles.grid}>
        <section className={styles.card} aria-labelledby="basic-info-title">
          <div className={styles.sectionHeader}>
            <h2 id="basic-info-title">기본 정보</h2>
            <span>등록 정보 확인</span>
          </div>
          <div className={styles.infoList}>
            {basicInfo.map((item) => (
              <div className={styles.infoRow} key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.card} aria-labelledby="career-info-title">
          <div className={styles.sectionHeader}>
            <h2 id="career-info-title">희망 진로 · 직무</h2>
            <span>준비 방향</span>
          </div>
          <div className={styles.infoList}>
            {careerInfo.map((item) => (
              <div className={styles.infoRow} key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.card} aria-labelledby="certificate-title">
          <div className={styles.sectionHeader}>
            <h2 id="certificate-title">자격증 · 역량</h2>
            <span>준비 중 항목 포함</span>
          </div>
          <div className={styles.block}>
            <strong className={styles.blockTitle}>보유 자격증</strong>
            <div className={styles.chipList}>
              {certificates.map((item) => (
                <span className={styles.chip} key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.block}>
            <strong className={styles.blockTitle}>준비 중</strong>
            <div className={styles.chipList}>
              {preparingItems.map((item) => (
                <span
                  className={`${styles.chip} ${styles.chipSubtle}`.trim()}
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.card} aria-labelledby="status-title">
          <div className={styles.sectionHeader}>
            <h2 id="status-title">취업 준비 상태</h2>
            <span>현재 진행도</span>
          </div>
          <div className={styles.statusList}>
            {statusItems.map((item) => (
              <article className={styles.statusRow} key={item.id}>
                <div>
                  <strong>{item.label}</strong>
                  <span>{item.value}</span>
                </div>
                <StatusBadge tone={item.tone}>{item.value}</StatusBadge>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
