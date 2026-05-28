import {
  contentAudienceFilters,
  contentDepartmentFilters,
  contentOperationHighlights,
  contentStatusFilters,
  contentTypeFilters,
  employmentContentSummaryItems,
  employmentContents,
  type ContentTone,
} from "../../mocks/employmentContent";
import styles from "./EmploymentContentPage.module.css";

function Badge({ children, tone }: { children: string; tone: ContentTone }) {
  return (
    <span className={`${styles.badge} ${styles[tone]}`.trim()}>
      <span aria-hidden="true" />
      {children}
    </span>
  );
}

function FilterGroup({ label, items }: { label: string; items: readonly string[] }) {
  return (
    <div className={styles.filterGroup}>
      <span className={styles.filterLabel}>{label}</span>
      <div className={styles.filterRow}>
        {items.map((item, index) => (
          <button
            key={item}
            type="button"
            aria-pressed={index === 0}
            className={`${styles.filterChip} ${index === 0 ? styles.activeFilterChip : ""}`.trim()}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export function EmploymentContentPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>콘텐츠관리</h1>
          <p className={styles.description}>산업뉴스와 공지, 자료실 콘텐츠 상태를 관리합니다.</p>
        </div>
        <span className={styles.pendingAction}>콘텐츠 작성 예정</span>
      </header>

      <section aria-label="콘텐츠 요약" className={styles.summaryGrid}>
        {employmentContentSummaryItems.map((item) => (
          <article className={styles.summaryCard} key={item.label}>
            <span className={styles.summaryLabel}>{item.label}</span>
            <strong className={styles.summaryValue}>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className={styles.controlSection} aria-labelledby="employment-content-controls">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="employment-content-controls">
              조회 조건
            </h2>
            <p className={styles.sectionDescription}>콘텐츠 유형과 게시 상태, 관련 학과를 함께 확인합니다.</p>
          </div>
        </div>

        <div className={styles.controlBody}>
          <div className={styles.searchRow}>
            <label className={styles.searchField}>
              <span className={styles.searchLabel}>콘텐츠 검색</span>
              <input type="text" value="제목, 키워드, 학과" readOnly aria-label="콘텐츠 검색" />
            </label>
          </div>

          <div className={styles.filterGroups}>
            <FilterGroup label="콘텐츠 유형" items={contentTypeFilters} />
            <FilterGroup label="게시 상태" items={contentStatusFilters} />
            <FilterGroup label="관련 학과" items={contentDepartmentFilters} />
            <FilterGroup label="대상" items={contentAudienceFilters} />
          </div>
        </div>
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.sidePanel} aria-labelledby="employment-content-operation">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle} id="employment-content-operation">
                운영 요약
              </h2>
              <p className={styles.sectionDescription}>검토와 게시 흐름을 빠르게 봅니다.</p>
            </div>
          </div>

          <div className={styles.highlightList}>
            {contentOperationHighlights.map((item) => (
              <article className={styles.highlightItem} key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.listSection} aria-labelledby="employment-content-list">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle} id="employment-content-list">
                콘텐츠 운영 목록
              </h2>
              <p className={styles.sectionDescription}>작성, 승인, 업로드 기능은 다음 단계에서 연결합니다.</p>
            </div>
          </div>

          <div className={styles.tableShell}>
            <div className={styles.tableHeader} role="row">
              <span>제목</span>
              <span>유형</span>
              <span>대상</span>
              <span>관련 학과</span>
              <span>게시 상태</span>
              <span>최근 수정</span>
              <span>담당 메모</span>
              <span>상세</span>
            </div>

            <div className={styles.tableBody}>
              {employmentContents.map((content) => (
                <article className={styles.tableRow} key={`${content.title}-${content.updatedAt}`}>
                  <strong className={styles.contentName}>{content.title}</strong>
                  <Badge tone={content.typeTone}>{content.type}</Badge>
                  <span className={styles.muted}>{content.audience}</span>
                  <span className={styles.muted}>{content.department}</span>
                  <Badge tone={content.statusTone}>{content.status}</Badge>
                  <span>{content.updatedAt}</span>
                  <span className={styles.muted}>{content.note}</span>
                  <div className={styles.inlineActionCell}>
                    <button className={styles.primaryAction} type="button">
                      상세 확인
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.cardList}>
            {employmentContents.map((content) => (
              <article className={styles.contentCard} key={`${content.title}-${content.updatedAt}-mobile`}>
                <div className={styles.cardTop}>
                  <div className={styles.identityBlock}>
                    <strong className={styles.contentName}>{content.title}</strong>
                    <span className={styles.dateText}>{content.updatedAt}</span>
                  </div>
                  <Badge tone={content.typeTone}>{content.type}</Badge>
                </div>

                <div className={styles.metaBlock}>
                  <span>{content.audience} · {content.department}</span>
                </div>

                <div className={styles.cardFooter}>
                  <Badge tone={content.statusTone}>{content.status}</Badge>
                  <p className={styles.note}>{content.note}</p>
                </div>

                <div className={styles.actionRow}>
                  <button className={styles.primaryAction} type="button">
                    상세 확인
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
