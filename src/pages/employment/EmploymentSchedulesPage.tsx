import {
  employmentScheduleSummaryItems,
  employmentSchedules,
  scheduleDepartmentFilters,
  scheduleGradeFilters,
  scheduleStatusFilters,
  scheduleTypeFilters,
  weeklyScheduleHighlights,
  type ScheduleTone,
} from "../../mocks/employmentSchedules";
import styles from "./EmploymentSchedulesPage.module.css";

function Badge({ children, tone }: { children: string; tone: ScheduleTone }) {
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

export function EmploymentSchedulesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>일정관리</h1>
          <p className={styles.description}>공식 취업 일정과 운영 확인 항목을 관리합니다.</p>
        </div>
        <span className={styles.pendingAction}>일정 추가 예정</span>
      </header>

      <section aria-label="일정 요약" className={styles.summaryGrid}>
        {employmentScheduleSummaryItems.map((item) => (
          <article className={styles.summaryCard} key={item.label}>
            <span className={styles.summaryLabel}>{item.label}</span>
            <strong className={styles.summaryValue}>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className={styles.controlSection} aria-labelledby="employment-schedules-controls">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="employment-schedules-controls">
              조회 조건
            </h2>
            <p className={styles.sectionDescription}>일정 유형과 대상 학년, 상태를 함께 확인합니다.</p>
          </div>
        </div>

        <div className={styles.searchRow}>
          <label className={styles.searchField}>
            <span className={styles.searchLabel}>일정 검색</span>
            <input type="text" value="일정명, 기업명, 공고명" readOnly aria-label="일정 검색" />
          </label>
        </div>

        <div className={styles.filterGroups}>
          <FilterGroup label="일정 유형" items={scheduleTypeFilters} />
          <FilterGroup label="대상 학년" items={scheduleGradeFilters} />
          <FilterGroup label="관련 학과" items={scheduleDepartmentFilters} />
          <FilterGroup label="상태" items={scheduleStatusFilters} />
        </div>
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.weekPanel} aria-labelledby="employment-schedules-week">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle} id="employment-schedules-week">
                이번 주 요약
              </h2>
              <p className={styles.sectionDescription}>오늘과 이번 주 공식 일정을 빠르게 봅니다.</p>
            </div>
          </div>

          <div className={styles.weekList}>
            {weeklyScheduleHighlights.map((item) => (
              <article className={styles.weekItem} key={item.day}>
                <strong>{item.day}</strong>
                <span>{item.count}</span>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.listSection} aria-labelledby="employment-schedules-list">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle} id="employment-schedules-list">
                공식 일정 목록
              </h2>
              <p className={styles.sectionDescription}>등록, 수정, 삭제 기능은 다음 단계에서 연결합니다.</p>
            </div>
          </div>

          <div className={styles.tableShell}>
            <div className={styles.tableHeader} role="row">
              <span>일정명</span>
              <span>유형</span>
              <span>일시</span>
              <span>대상</span>
              <span>관련 기업/공고</span>
              <span>상태</span>
              <span>담당 메모</span>
              <span>상세</span>
            </div>

            <div className={styles.tableBody}>
              {employmentSchedules.map((schedule) => (
                <article className={styles.tableRow} key={`${schedule.title}-${schedule.dateTime}`}>
                  <strong className={styles.scheduleName}>{schedule.title}</strong>
                  <Badge tone={schedule.typeTone}>{schedule.type}</Badge>
                  <span>{schedule.dateTime}</span>
                  <span className={styles.muted}>{schedule.target}</span>
                  <span className={styles.muted}>{schedule.related}</span>
                  <Badge tone={schedule.statusTone}>{schedule.status}</Badge>
                  <span className={styles.muted}>{schedule.note}</span>
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
            {employmentSchedules.map((schedule) => (
              <article className={styles.scheduleCard} key={`${schedule.title}-${schedule.dateTime}-mobile`}>
                <div className={styles.cardTop}>
                  <div className={styles.identityBlock}>
                    <strong className={styles.scheduleName}>{schedule.title}</strong>
                    <span className={styles.dateText}>{schedule.dateTime}</span>
                  </div>
                  <Badge tone={schedule.typeTone}>{schedule.type}</Badge>
                </div>

                <div className={styles.metaBlock}>
                  <span>{schedule.target}</span>
                  <span>{schedule.related}</span>
                </div>

                <div className={styles.cardFooter}>
                  <Badge tone={schedule.statusTone}>{schedule.status}</Badge>
                  <p className={styles.note}>{schedule.note}</p>
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
