import { useMemo, useState } from "react";
import styles from "./StudentSchedulesPage.module.css";

type ViewMode = "list" | "calendar";
type ScheduleTone = "official" | "personal";
type ScheduleKind = "공식 일정" | "개인 일정";

type ScheduleItem = {
  id: string;
  dateKey: string;
  dateLabel: string;
  timeLabel: string;
  title: string;
  kind: ScheduleKind;
  tone: ScheduleTone;
  detail: string;
  place: string;
};

type CalendarDay = {
  dateKey: string;
  day: number;
  inMonth: boolean;
};

const todaySchedules: ScheduleItem[] = [
  {
    id: "today-1",
    dateKey: "2026-05-28",
    dateLabel: "오늘",
    timeLabel: "09:20",
    title: "입사지원서 1차 점검",
    kind: "공식 일정",
    tone: "official",
    detail: "취업진로부 확인 일정",
    place: "진로활동실",
  },
  {
    id: "today-2",
    dateKey: "2026-05-28",
    dateLabel: "오늘",
    timeLabel: "16:30",
    title: "면접 질문 정리",
    kind: "개인 일정",
    tone: "personal",
    detail: "자주 나오는 질문 5개 정리",
    place: "내 일정 메모",
  },
];

const weeklySchedules: ScheduleItem[] = [
  {
    id: "week-1",
    dateKey: "2026-05-29",
    dateLabel: "금 05.29",
    timeLabel: "13:30",
    title: "현장실습 사전교육",
    kind: "공식 일정",
    tone: "official",
    detail: "출결 및 안전교육 안내",
    place: "시청각실",
  },
  {
    id: "week-2",
    dateKey: "2026-05-30",
    dateLabel: "토 05.30",
    timeLabel: "11:00",
    title: "추천서 제출 마감 확인",
    kind: "공식 일정",
    tone: "official",
    detail: "담당 교사 확인 필요",
    place: "취업진로부",
  },
  {
    id: "week-3",
    dateKey: "2026-05-31",
    dateLabel: "일 05.31",
    timeLabel: "15:40",
    title: "자기소개서 수정 시간",
    kind: "개인 일정",
    tone: "personal",
    detail: "직무 경험 문장 다듬기",
    place: "개인 일정",
  },
  {
    id: "week-4",
    dateKey: "2026-06-01",
    dateLabel: "월 06.01",
    timeLabel: "10:00",
    title: "지원 마감 체크",
    kind: "개인 일정",
    tone: "personal",
    detail: "마감 임박 공고 우선 확인",
    place: "개인 일정",
  },
];

const personalSchedules: ScheduleItem[] = [
  {
    id: "personal-1",
    dateKey: "2026-05-28",
    dateLabel: "오늘",
    timeLabel: "18:00",
    title: "이력서 최종 점검",
    kind: "개인 일정",
    tone: "personal",
    detail: "오탈자와 제출 파일명 확인",
    place: "내 일정 메모",
  },
  {
    id: "personal-2",
    dateKey: "2026-05-31",
    dateLabel: "일 05.31",
    timeLabel: "19:00",
    title: "기업 질문 리스트 정리",
    kind: "개인 일정",
    tone: "personal",
    detail: "면접 대비 질문 추가",
    place: "내 일정 메모",
  },
  {
    id: "personal-3",
    dateKey: "2026-06-01",
    dateLabel: "월 06.01",
    timeLabel: "08:30",
    title: "지원 서류 제출 체크",
    kind: "개인 일정",
    tone: "personal",
    detail: "마감 전 최종 제출 여부 확인",
    place: "내 일정 메모",
  },
];

const allSchedules = [...todaySchedules, ...weeklySchedules, ...personalSchedules];

const summaryItems = [
  { label: "오늘 일정", value: `${todaySchedules.length}건` },
  { label: "이번 주", value: `${weeklySchedules.length}건` },
  { label: "내 일정", value: `${personalSchedules.length}건` },
];

const calendarDays: CalendarDay[] = [
  { dateKey: "2026-05-25", day: 25, inMonth: true },
  { dateKey: "2026-05-26", day: 26, inMonth: true },
  { dateKey: "2026-05-27", day: 27, inMonth: true },
  { dateKey: "2026-05-28", day: 28, inMonth: true },
  { dateKey: "2026-05-29", day: 29, inMonth: true },
  { dateKey: "2026-05-30", day: 30, inMonth: true },
  { dateKey: "2026-05-31", day: 31, inMonth: true },
  { dateKey: "2026-06-01", day: 1, inMonth: false },
  { dateKey: "2026-06-02", day: 2, inMonth: false },
  { dateKey: "2026-06-03", day: 3, inMonth: false },
  { dateKey: "2026-06-04", day: 4, inMonth: false },
  { dateKey: "2026-06-05", day: 5, inMonth: false },
  { dateKey: "2026-06-06", day: 6, inMonth: false },
  { dateKey: "2026-06-07", day: 7, inMonth: false },
];

function ScheduleBadge({ kind, tone }: { kind: ScheduleKind; tone: ScheduleTone }) {
  return (
    <span className={`${styles.badge} ${tone === "official" ? styles.badgeOfficial : styles.badgePersonal}`.trim()}>
      <span aria-hidden="true" className={styles.badgeDot} />
      {kind}
    </span>
  );
}

function ScheduleRow({ item }: { item: ScheduleItem }) {
  return (
    <article className={styles.scheduleCard}>
      <div className={styles.timeBlock}>
        <strong>{item.timeLabel}</strong>
        <span>{item.dateLabel}</span>
      </div>

      <div className={styles.contentBlock}>
        <div className={styles.titleRow}>
          <h3>{item.title}</h3>
          <ScheduleBadge kind={item.kind} tone={item.tone} />
        </div>
        <p className={styles.detail}>{item.detail}</p>
        <p className={styles.meta}>{item.place}</p>
      </div>
    </article>
  );
}

export function StudentSchedulesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedDate, setSelectedDate] = useState("2026-05-28");

  const selectedDateSchedules = useMemo(
    () => allSchedules.filter((item) => item.dateKey === selectedDate),
    [selectedDate],
  );

  const dateHasOfficial = (dateKey: string) =>
    allSchedules.some((item) => item.dateKey === dateKey && item.tone === "official");
  const dateHasPersonal = (dateKey: string) =>
    allSchedules.some((item) => item.dateKey === dateKey && item.tone === "personal");

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>학생 일정</p>
        <h1>일정</h1>
        <p className={styles.description}>오늘과 이번 주 일정을 확인합니다.</p>
      </header>

      <div className={styles.topBar}>
        <section aria-label="일정 요약" className={styles.summaryRow}>
          {summaryItems.map((item) => (
            <article className={styles.summaryChip} key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </article>
          ))}
        </section>

        <div aria-label="보기 전환" className={styles.viewSwitch} role="tablist">
          <button
            aria-selected={viewMode === "list"}
            className={`${styles.viewTab} ${viewMode === "list" ? styles.viewTabActive : ""}`.trim()}
            role="tab"
            type="button"
            onClick={() => setViewMode("list")}
          >
            리스트
          </button>
          <button
            aria-selected={viewMode === "calendar"}
            className={`${styles.viewTab} ${viewMode === "calendar" ? styles.viewTabActive : ""}`.trim()}
            role="tab"
            type="button"
            onClick={() => setViewMode("calendar")}
          >
            캘린더
          </button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className={styles.grid}>
          <section aria-labelledby="today-title" className={styles.sidePanel}>
            <div className={styles.panelHeader}>
              <h2 id="today-title">오늘 일정</h2>
              <span>우선 확인</span>
            </div>
            <div className={styles.panelList}>
              {todaySchedules.map((item) => (
                <ScheduleRow item={item} key={item.id} />
              ))}
            </div>
          </section>

          <div className={styles.mainColumn}>
            <section aria-labelledby="week-title" className={styles.section}>
              <div className={styles.panelHeader}>
                <h2 id="week-title">이번 주 일정</h2>
                <span>공식 일정 · 개인 일정</span>
              </div>
              <div className={styles.panelList}>
                {weeklySchedules.map((item) => (
                  <ScheduleRow item={item} key={item.id} />
                ))}
              </div>
            </section>

            <section aria-labelledby="personal-title" className={styles.section}>
              <div className={styles.panelHeader}>
                <h2 id="personal-title">내 개인 일정</h2>
                <button className={styles.placeholderButton} disabled type="button">
                  개인 일정 추가
                </button>
              </div>
              <p className={styles.helperText}>다음 단계에서 직접 추가·수정·삭제할 수 있습니다.</p>
              <div className={styles.panelList}>
                {personalSchedules.map((item) => (
                  <ScheduleRow item={item} key={item.id} />
                ))}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className={styles.calendarLayout}>
          <section className={styles.calendarPanel}>
            <div className={styles.panelHeader}>
              <h2>캘린더 보기</h2>
              <span>2026년 5월 마지막 주</span>
            </div>

            <div className={styles.weekdays} aria-hidden="true">
              {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            <div className={styles.calendarGrid}>
              {calendarDays.map((day) => (
                <button
                  aria-pressed={selectedDate === day.dateKey}
                  className={`${styles.dayCell} ${selectedDate === day.dateKey ? styles.dayCellActive : ""} ${!day.inMonth ? styles.dayCellMuted : ""}`.trim()}
                  key={day.dateKey}
                  type="button"
                  onClick={() => setSelectedDate(day.dateKey)}
                >
                  <span className={styles.dayNumber}>{day.day}</span>
                  <span className={styles.dayDots}>
                    {dateHasOfficial(day.dateKey) ? <span className={`${styles.dayDot} ${styles.dayDotOfficial}`} /> : null}
                    {dateHasPersonal(day.dateKey) ? <span className={`${styles.dayDot} ${styles.dayDotPersonal}`} /> : null}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.calendarLegend}>
              <span>
                <span className={`${styles.dayDot} ${styles.dayDotOfficial}`} />
                학교 일정
              </span>
              <span>
                <span className={`${styles.dayDot} ${styles.dayDotPersonal}`} />
                내 일정
              </span>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.panelHeader}>
              <h2>선택한 날짜 일정</h2>
              <button className={styles.placeholderButton} disabled type="button">
                개인 일정 추가
              </button>
            </div>
            <p className={styles.helperText}>내가 추가한 취업 준비 일정을 함께 확인할 수 있습니다.</p>
            <div className={styles.panelList}>
              {selectedDateSchedules.length > 0 ? (
                selectedDateSchedules.map((item) => <ScheduleRow item={item} key={item.id} />)
              ) : (
                <div className={styles.emptyCard}>
                  <strong>선택한 날짜 일정이 없습니다.</strong>
                  <span>다음 단계에서 개인 일정을 직접 추가할 수 있습니다.</span>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
