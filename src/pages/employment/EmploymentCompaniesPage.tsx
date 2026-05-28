import {
  companyDepartmentFilters,
  companyHiringFilters,
  companyScaleFilters,
  companyTrainingFilters,
  employmentCompanies,
  employmentCompanySummaryItems,
} from "../../mocks/employmentCompanies";
import styles from "./EmploymentCompaniesPage.module.css";

function Badge({
  children,
  tone,
}: {
  children: string;
  tone: "warning" | "info" | "neutral" | "success" | "default";
}) {
  return (
    <span className={`${styles.badge} ${styles[tone]}`.trim()}>
      <span aria-hidden="true" />
      {children}
    </span>
  );
}

export function EmploymentCompaniesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>기업DB</h1>
          <p className={styles.description}>채용 이력과 현장실습 전환 기준을 함께 관리합니다.</p>
        </div>
      </header>

      <section aria-label="기업 요약" className={styles.summaryGrid}>
        {employmentCompanySummaryItems.map((item) => (
          <article className={styles.summaryCard} key={item.label}>
            <span className={styles.summaryLabel}>{item.label}</span>
            <strong className={styles.summaryValue}>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className={styles.controlSection} aria-labelledby="employment-companies-controls">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="employment-companies-controls">
              조회 조건
            </h2>
            <p className={styles.sectionDescription}>기업 규모와 현장실습 구분을 함께 보고 학생 배치 판단에 활용합니다.</p>
          </div>
        </div>

        <div className={styles.searchRow}>
          <label className={styles.searchField}>
            <span className={styles.searchLabel}>기업 검색</span>
            <input type="text" value="기업명, 직무, 담당자" readOnly aria-label="기업 검색" />
          </label>
        </div>

        <div className={styles.filterGroups}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>기업 규모</span>
            <div className={styles.filterRow}>
              {companyScaleFilters.map((item, index) => (
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

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>현장실습</span>
            <div className={styles.filterRow}>
              {companyTrainingFilters.map((item, index) => (
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

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>채용 상태</span>
            <div className={styles.filterRow}>
              {companyHiringFilters.map((item, index) => (
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

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>관련 학과</span>
            <div className={styles.filterRow}>
              {companyDepartmentFilters.map((item, index) => (
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
        </div>
      </section>

      <section className={styles.listSection} aria-labelledby="employment-companies-list">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="employment-companies-list">
              기업 운영 목록
            </h2>
            <p className={styles.sectionDescription}>참여기업과 선도기업 구분, 채용 조건, 관리 메모를 한 화면에서 비교합니다.</p>
          </div>
        </div>

        <div className={styles.tableShell}>
          <div className={styles.tableHeader} role="row">
            <span>기업명</span>
            <span>구분</span>
            <span>관련 직무</span>
            <span>채용 요약</span>
            <span>근무 조건</span>
            <span>관리 상태</span>
            <span>상세</span>
          </div>

          <div className={styles.tableBody}>
            {employmentCompanies.map((company) => (
              <article className={styles.tableRow} key={`${company.name}-${company.recentJob}`}>
                <strong className={styles.companyName}>{company.name}</strong>
                <div className={styles.stackCell}>
                  <span className={styles.muted}>{company.scale}</span>
                  <Badge tone={company.practicumTone}>{company.practicumType}</Badge>
                </div>
                <span>{company.role}</span>
                <div className={styles.stackCell}>
                  <span className={styles.muted}>{company.recentJob}</span>
                  <span className={styles.muted}>{company.hiringHistory}</span>
                </div>
                <span className={styles.muted}>
                  {company.salary} · 병특 {company.militaryService} · 기숙사 {company.dormitory}
                </span>
                <div className={styles.stackCell}>
                  <Badge tone={company.relationTone}>{company.relationStatus}</Badge>
                  <span className={styles.muted}>{company.note}</span>
                </div>
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
          {employmentCompanies.map((company) => (
            <article className={styles.companyCard} key={`${company.name}-${company.recentJob}-mobile`}>
              <div className={styles.cardTop}>
                <div className={styles.identityBlock}>
                  <strong className={styles.companyName}>{company.name}</strong>
                  <span className={styles.scale}>{company.scale}</span>
                </div>
                <Badge tone={company.practicumTone}>{company.practicumType}</Badge>
              </div>

              <div className={styles.metaBlock}>
                <span>{company.role}</span>
                <span>{company.recentJob}</span>
                <span>{company.hiringHistory}</span>
                <span className={styles.conditionsText}>
                  {company.salary} · 병특 {company.militaryService} · 기숙사 {company.dormitory}
                </span>
              </div>

              <div className={styles.cardFooter}>
                <Badge tone={company.relationTone}>{company.relationStatus}</Badge>
                <p className={styles.note}>{company.note}</p>
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
  );
}
