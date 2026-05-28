import { ChevronRight, Download } from "lucide-react";
import styles from "./StudentContentPage.module.css";

type NewsItem = {
  id: string;
  badge: string;
  title: string;
  summary: string;
  department: string;
};

type NoticeItem = {
  id: string;
  title: string;
  meta: string;
  tone: "important" | "normal";
};

type ResourceItem = {
  id: string;
  title: string;
  summary: string;
  type: string;
};

const newsItems: NewsItem[] = [
  {
    id: "news-1",
    badge: "기계과 · 산업동향",
    title: "스마트 제조 현장 자동화 채용 수요 확대",
    summary: "생산기술과 설비 보전 직무 중심으로 채용 공고가 늘고 있습니다.",
    department: "기계과",
  },
  {
    id: "news-2",
    badge: "전자과 · 반도체",
    title: "후공정 현장 실무형 인재 수요 증가",
    summary: "기초 측정과 장비 이해도가 있는 인재를 우대하는 흐름이 이어집니다.",
    department: "전자과",
  },
];

const importantNotices: NoticeItem[] = [
  {
    id: "notice-1",
    title: "추천서 제출 마감 안내",
    meta: "오늘 17:00 · 취업진로부",
    tone: "important",
  },
  {
    id: "notice-2",
    title: "현장실습 사전교육 출석 확인",
    meta: "금 13:30 · 중요 공지",
    tone: "important",
  },
];

const boardPosts: NoticeItem[] = [
  {
    id: "post-1",
    title: "면접 복장 체크리스트 공유",
    meta: "읽기 2분 · 자료 게시판",
    tone: "normal",
  },
  {
    id: "post-2",
    title: "자기소개서 문장 다듬기 예시",
    meta: "읽기 3분 · 취업 준비 게시판",
    tone: "normal",
  },
];

const resourceItems: ResourceItem[] = [
  {
    id: "resource-1",
    title: "면접 준비 자료",
    summary: "자주 나오는 질문과 답변 구성 예시를 정리했습니다.",
    type: "면접 자료",
  },
  {
    id: "resource-2",
    title: "자기소개서 자료",
    summary: "직무 경험을 문장으로 정리하는 예시를 확인할 수 있습니다.",
    type: "서류 자료",
  },
];

const summaryItems = [
  { label: "산업뉴스", value: `${newsItems.length}건` },
  { label: "공지", value: `${importantNotices.length + boardPosts.length}건` },
  { label: "자료", value: `${resourceItems.length}건` },
];

function NoticeBadge({ tone }: { tone: "important" | "normal" }) {
  return (
    <span className={`${styles.statusBadge} ${tone === "important" ? styles.statusImportant : styles.statusNeutral}`.trim()}>
      <span aria-hidden="true" className={styles.statusDot} />
      {tone === "important" ? "중요 공지" : "읽기 자료"}
    </span>
  );
}

export function StudentContentPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>학생 콘텐츠</p>
        <h1>콘텐츠</h1>
        <p className={styles.description}>뉴스, 공지, 자료를 확인합니다.</p>
      </header>

      <section aria-label="콘텐츠 요약" className={styles.summaryRow}>
        {summaryItems.map((item) => (
          <article className={styles.summaryChip} key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <div className={styles.grid}>
        <section aria-labelledby="news-title" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 id="news-title">산업뉴스</h2>
            <span>관련 흐름</span>
          </div>
          <div className={styles.newsList}>
            {newsItems.map((item) => (
              <article className={styles.newsCard} key={item.id}>
                <span className={styles.topicBadge}>{item.badge}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.metaText}>{item.department}</span>
                  <button className={styles.linkButton} type="button">
                    원문 보기
                    <ChevronRight aria-hidden="true" size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="notice-title" className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 id="notice-title">공지 · 게시판</h2>
            <span>읽기 중심</span>
          </div>

          <div className={styles.block}>
            <strong className={styles.blockTitle}>중요 공지</strong>
            <div className={styles.compactList}>
              {importantNotices.map((item) => (
                <article className={styles.compactRow} key={item.id}>
                  <div className={styles.rowContent}>
                    <strong>{item.title}</strong>
                    <span>{item.meta}</span>
                  </div>
                  <NoticeBadge tone={item.tone} />
                </article>
              ))}
            </div>
          </div>

          <div className={styles.block}>
            <strong className={styles.blockTitle}>일반 게시글</strong>
            <div className={styles.compactList}>
              {boardPosts.map((item) => (
                <article className={styles.compactRow} key={item.id}>
                  <div className={styles.rowContent}>
                    <strong>{item.title}</strong>
                    <span>{item.meta}</span>
                  </div>
                  <NoticeBadge tone={item.tone} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="resource-title" className={`${styles.section} ${styles.resourceSection}`}>
          <div className={styles.sectionHeader}>
            <h2 id="resource-title">자료실</h2>
            <span>준비 자료</span>
          </div>
          <div className={styles.resourceList}>
            {resourceItems.map((item) => (
              <article className={styles.resourceCard} key={item.id}>
                <div>
                  <span className={styles.resourceType}>{item.type}</span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
                <button className={styles.downloadButton} disabled type="button">
                  <Download aria-hidden="true" size={14} />
                  다운로드 준비
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
