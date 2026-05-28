import {
  employmentNotificationChannelFilters,
  employmentNotificationHighlights,
  employmentNotificationStatusFilters,
  employmentNotificationSummaryItems,
  employmentNotifications,
  employmentNotificationTargetFilters,
  employmentNotificationTypeFilters,
  type EmploymentNotificationTone,
} from "../../mocks/employmentNotifications";
import styles from "./EmploymentNotificationsPage.module.css";

function Badge({ children, tone }: { children: string; tone: EmploymentNotificationTone }) {
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

export function EmploymentNotificationsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>알림·메시지 관리</h1>
          <p className={styles.description}>일정, 공고, 조사 안내용 알림 초안과 발송 준비 상태를 관리합니다.</p>
        </div>
        <span className={styles.pendingAction}>메시지 작성 예정</span>
      </header>

      <section aria-label="알림 요약" className={styles.summaryGrid}>
        {employmentNotificationSummaryItems.map((item) => (
          <article className={styles.summaryCard} key={item.label}>
            <span className={styles.summaryLabel}>{item.label}</span>
            <strong className={styles.summaryValue}>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className={styles.controlSection} aria-labelledby="employment-notifications-controls">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="employment-notifications-controls">
              조회 조건
            </h2>
            <p className={styles.sectionDescription}>유형, 상태, 대상, 채널 기준으로 알림 초안을 빠르게 봅니다.</p>
          </div>
        </div>

        <div className={styles.controlBody}>
          <div className={styles.searchRow}>
            <label className={styles.searchField}>
              <span className={styles.searchLabel}>메시지 검색</span>
              <input type="text" value="제목, 대상, 관련 공고" readOnly aria-label="메시지 검색" />
            </label>
          </div>

          <div className={styles.filterGroups}>
            <FilterGroup label="유형" items={employmentNotificationTypeFilters} />
            <FilterGroup label="상태" items={employmentNotificationStatusFilters} />
            <FilterGroup label="대상" items={employmentNotificationTargetFilters} />
            <FilterGroup label="채널" items={employmentNotificationChannelFilters} />
          </div>
        </div>
      </section>

      <div className={styles.contentGrid}>
        <section className={styles.sidePanel} aria-labelledby="employment-notifications-summary">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle} id="employment-notifications-summary">
                운영 요약
              </h2>
              <p className={styles.sectionDescription}>이번 주 알림 중 먼저 확인할 항목을 모아 봅니다.</p>
            </div>
          </div>

          <div className={styles.highlightList}>
            {employmentNotificationHighlights.map((item) => (
              <article className={styles.highlightItem} key={item.label}>
                <strong>{item.label}</strong>
                <span>{item.value}</span>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.listSection} aria-labelledby="employment-notifications-list">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle} id="employment-notifications-list">
                알림 초안 목록
              </h2>
              <p className={styles.sectionDescription}>실제 발송, 예약 발송, 외부 메시지 API 연결은 다음 단계에서 검토합니다.</p>
            </div>
          </div>

          <div className={styles.tableShell}>
            <div className={styles.tableHeader} role="row">
              <span>제목</span>
              <span>유형</span>
              <span>대상</span>
              <span>채널</span>
              <span>상태</span>
              <span>관련 항목</span>
              <span>담당 메모</span>
              <span>상세</span>
            </div>

            <div className={styles.tableBody}>
              {employmentNotifications.map((item) => (
                <article className={styles.tableRow} key={`${item.title}-${item.related}`}>
                  <strong className={styles.notificationName}>{item.title}</strong>
                  <Badge tone={item.typeTone}>{item.type}</Badge>
                  <span className={styles.muted}>{item.target}</span>
                  <span className={styles.muted}>{item.channel}</span>
                  <Badge tone={item.statusTone}>{item.status}</Badge>
                  <span className={styles.muted}>{item.related}</span>
                  <span className={styles.muted}>{item.note}</span>
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
            {employmentNotifications.map((item) => (
              <article className={styles.notificationCard} key={`${item.title}-${item.related}-mobile`}>
                <div className={styles.cardTop}>
                  <div className={styles.identityBlock}>
                    <strong className={styles.notificationName}>{item.title}</strong>
                    <span className={styles.metaText}>{item.target}</span>
                  </div>
                  <Badge tone={item.typeTone}>{item.type}</Badge>
                </div>

                <div className={styles.metaBlock}>
                  <span>{item.channel}</span>
                  <span>{item.related}</span>
                </div>

                <div className={styles.cardFooter}>
                  <Badge tone={item.statusTone}>{item.status}</Badge>
                  <p className={styles.note}>{item.note}</p>
                </div>

                <div className={styles.actionRow}>
                  <button className={styles.primaryAction} type="button">
                    상세 확인
                  </button>
                  <button aria-disabled="true" className={styles.secondaryAction} type="button">
                    발송 준비 예정
                  </button>
                  <button aria-disabled="true" className={styles.secondaryAction} type="button">
                    대상자 보기 예정
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
