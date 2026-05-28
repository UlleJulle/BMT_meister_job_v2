import { ArrowRight, Bell, BriefcaseBusiness, CalendarDays, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { routes } from "../../constants/routes";
import styles from "./StudentHomePage.module.css";

const todayItems = [
  {
    label: "마감 확인",
    title: "현장실습 지원 가능 공고 2건",
    meta: "오늘 17:00 기준",
    tone: "warning",
  },
  {
    label: "일정",
    title: "입사지원서 점검",
    meta: "내일 09:30",
    tone: "neutral",
  },
  {
    label: "공지",
    title: "면접 복장 안내 확인",
    meta: "읽기 2분",
    tone: "success",
  },
];

const closingJobs = [
  {
    company: "정밀가공 실습기업",
    position: "생산기술 보조",
    due: "D-2",
    status: "지원 가능",
  },
  {
    company: "스마트팩토리 협력사",
    position: "설비 유지보수",
    due: "D-4",
    status: "서류 준비",
  },
];

const schedules = [
  { date: "오늘", title: "자기소개서 1차 점검", time: "15:20" },
  { date: "금", title: "현장실습 사전교육", time: "10:00" },
];

const contents = [
  { type: "공지", title: "채용공고 확인 전 준비물" },
  { type: "자료", title: "면접 질문 정리표" },
];

function StatusBadge({ children, tone }: { children: string; tone?: string }) {
  return (
    <span className={`${styles.statusBadge} ${tone ? styles[tone] : ""}`.trim()}>
      <span aria-hidden="true" />
      {children}
    </span>
  );
}

export function StudentHomePage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p>학생 홈</p>
          <h1>오늘 확인할 취업 정보</h1>
        </div>
        <Link className={styles.headerLink} to={routes.student.jobs}>
          공고 보기
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </header>

      <section className={styles.todayPanel} aria-labelledby="today-title">
        <div className={styles.sectionHeader}>
          <Bell size={17} aria-hidden="true" />
          <h2 id="today-title">오늘 봐야 할 항목</h2>
        </div>
        <div className={styles.todayList}>
          {todayItems.map((item) => (
            <article className={styles.todayItem} key={item.title}>
              <StatusBadge tone={item.tone}>{item.label}</StatusBadge>
              <strong>{item.title}</strong>
              <span>{item.meta}</span>
            </article>
          ))}
        </div>
      </section>

      <div className={styles.grid}>
        <section className={styles.section} aria-labelledby="jobs-title">
          <div className={styles.sectionHeader}>
            <BriefcaseBusiness size={17} aria-hidden="true" />
            <h2 id="jobs-title">마감 임박 공고</h2>
          </div>
          <div className={styles.compactList}>
            {closingJobs.map((job) => (
              <article className={styles.listRow} key={job.company}>
                <div>
                  <strong>{job.company}</strong>
                  <span>{job.position}</span>
                </div>
                <div className={styles.rowMeta}>
                  <b>{job.due}</b>
                  <span>{job.status}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="schedule-title">
          <div className={styles.sectionHeader}>
            <CalendarDays size={17} aria-hidden="true" />
            <h2 id="schedule-title">예정 일정</h2>
          </div>
          <div className={styles.compactList}>
            {schedules.map((schedule) => (
              <article className={styles.listRow} key={schedule.title}>
                <div>
                  <strong>{schedule.title}</strong>
                  <span>{schedule.date}</span>
                </div>
                <time>{schedule.time}</time>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="contents-title">
          <div className={styles.sectionHeader}>
            <FileText size={17} aria-hidden="true" />
            <h2 id="contents-title">최근 콘텐츠</h2>
          </div>
          <div className={styles.compactList}>
            {contents.map((content) => (
              <article className={styles.contentRow} key={content.title}>
                <StatusBadge>{content.type}</StatusBadge>
                <strong>{content.title}</strong>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
