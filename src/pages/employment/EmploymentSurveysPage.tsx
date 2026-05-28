import {
  employmentSurveyDepartmentFilters,
  employmentSurveyGradeFilters,
  employmentSurveyHighlights,
  employmentSurveyStatusFilters,
  employmentSurveySummaryItems,
  employmentSurveys,
  employmentSurveyTypeFilters,
  type EmploymentSurveyTone,
} from "../../mocks/employmentSurveys";
import styles from "./EmploymentSurveysPage.module.css";

function Badge({ children, tone }: { children: string; tone: EmploymentSurveyTone }) {
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

export function EmploymentSurveysPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>행사·참여조사 관리</h1>
          <p className={styles.description}>행사, 설명회, 참여조사의 응답 흐름과 미응답자를 관리합니다.</p>
        </div>
        <span className={styles.pendingAction}>조사 생성 예정</span>
      </header>

      <section aria-label="행사 조사 요약" className={styles.summaryGrid}>
        {employmentSurveySummaryItems.map((item) => (
          <article className={styles.summaryCard} key={item.label}>
            <span className={styles.summaryLabel}>{item.label}</span>
            <strong className={styles.summaryValue}>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className={styles.controlSection} aria-labelledby="employment-surveys-controls">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="employment-surveys-controls">
              조회 조건
            </h2>
            <p className={styles.sectionDescription}>유형, 상태, 대상 학년과 관련 학과를 함께 확인합니다.</p>
          </div>
        </div>

        <div className={styles.controlBody}>
          <div className={styles.searchRow}>
            <label className={styles.searchField}>
              <span className={styles.searchLabel}>조사 검색</span>
              <input type="text" value="제목, 기업명, 대상" readOnly aria-label="조사 검색" />
            </label>
          </div>

          <div className={styles.filterGroups}>
            <FilterGroup label="유형" items={employmentSurveyTypeFilters} />
            <FilterGroup label="상태" items={employmentSurveyStatusFilters} />
            <FilterGroup label="대상 학년" items={employmentSurveyGradeFilters} />
            <FilterGroup label="관련 학과" items={employmentSurveyDepartmentFilters} />
          </div>
        </div>
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.sidePanel} aria-labelledby="employment-surveys-summary">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle} id="employment-surveys-summary">
                운영 요약
              </h2>
              <p className={styles.sectionDescription}>오늘 처리할 행사·조사 항목을 빠르게 봅니다.</p>
            </div>
          </div>

          <div className={styles.highlightList}>
            {employmentSurveyHighlights.map((item) => (
              <article className={styles.highlightItem} key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.listSection} aria-labelledby="employment-surveys-list">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle} id="employment-surveys-list">
                행사·참여조사 목록
              </h2>
              <p className={styles.sectionDescription}>생성, 마감, 재오픈, export 기능은 다음 단계에서 연결합니다.</p>
            </div>
          </div>

          <div className={styles.tableShell}>
            <div className={styles.tableHeader} role="row">
              <span>제목</span>
              <span>유형</span>
              <span>기간/일시</span>
              <span>대상</span>
              <span>응답 현황</span>
              <span>상태</span>
              <span>담당 메모</span>
              <span>상세</span>
            </div>

            <div className={styles.tableBody}>
              {employmentSurveys.map((survey) => (
                <article className={styles.tableRow} key={`${survey.title}-${survey.period}`}>
                  <strong className={styles.surveyName}>{survey.title}</strong>
                  <Badge tone={survey.typeTone}>{survey.type}</Badge>
                  <span>{survey.period}</span>
                  <span className={styles.muted}>{survey.target}</span>
                  <span className={styles.muted}>{survey.response}</span>
                  <Badge tone={survey.statusTone}>{survey.status}</Badge>
                  <span className={styles.muted}>{survey.note}</span>
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
            {employmentSurveys.map((survey) => (
              <article className={styles.surveyCard} key={`${survey.title}-${survey.period}-mobile`}>
                <div className={styles.cardTop}>
                  <div className={styles.identityBlock}>
                    <strong className={styles.surveyName}>{survey.title}</strong>
                    <span className={styles.dateText}>{survey.period}</span>
                  </div>
                  <Badge tone={survey.typeTone}>{survey.type}</Badge>
                </div>

                <div className={styles.metaBlock}>
                  <span>{survey.target}</span>
                  <span>{survey.response}</span>
                </div>

                <div className={styles.cardFooter}>
                  <Badge tone={survey.statusTone}>{survey.status}</Badge>
                  <p className={styles.note}>{survey.note}</p>
                </div>

                <div className={styles.actionRow}>
                  <button className={styles.primaryAction} type="button">
                    상세 확인
                  </button>
                  <button aria-disabled="true" className={styles.secondaryAction} type="button">
                    응답자 보기 예정
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
