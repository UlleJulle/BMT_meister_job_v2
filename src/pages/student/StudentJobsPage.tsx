import { ChevronRight } from "lucide-react";
import styles from "./StudentJobsPage.module.css";

type JobStatus = "접수중" | "마감임박" | "추천필요";
type CompanyType = "협약기업" | "중견기업" | "추천연계";

type JobItem = {
  id: string;
  companyType: CompanyType;
  companyName: string;
  title: string;
  role: string;
  location: string;
  department: string;
  deadline: string;
  daysLeft: number;
  status: JobStatus;
};

const jobs: JobItem[] = [
  {
    id: "job-1",
    companyType: "협약기업",
    companyName: "한빛정밀",
    title: "생산기술 보조 채용",
    role: "생산기술",
    location: "부산 사상구",
    department: "기계과 우대",
    deadline: "2026.06.01",
    daysLeft: 2,
    status: "마감임박",
  },
  {
    id: "job-2",
    companyType: "중견기업",
    companyName: "세림모빌리티",
    title: "설비 유지보수 인턴",
    role: "설비보전",
    location: "창원 성산구",
    department: "전기과 우대",
    deadline: "2026.06.04",
    daysLeft: 5,
    status: "접수중",
  },
  {
    id: "job-3",
    companyType: "추천연계",
    companyName: "동해테크",
    title: "품질관리 사원 모집",
    role: "품질관리",
    location: "울산 북구",
    department: "화학공업과 우대",
    deadline: "2026.06.08",
    daysLeft: 9,
    status: "추천필요",
  },
  {
    id: "job-4",
    companyType: "협약기업",
    companyName: "미래에너지시스템",
    title: "전장 배선 조립 채용",
    role: "전장조립",
    location: "김해 진례면",
    department: "전자과 우대",
    deadline: "2026.06.03",
    daysLeft: 4,
    status: "접수중",
  },
  {
    id: "job-5",
    companyType: "중견기업",
    companyName: "다온메카트로닉스",
    title: "자동화 설비 운영 채용",
    role: "자동화운영",
    location: "부산 강서구",
    department: "메카트로닉스과 우대",
    deadline: "2026.06.10",
    daysLeft: 11,
    status: "접수중",
  },
];

const summaryItems = [
  { label: "전체 공고", value: `${jobs.length}건` },
  { label: "마감 임박", value: `${jobs.filter((job) => job.daysLeft <= 7).length}건` },
  { label: "추천 필요", value: `${jobs.filter((job) => job.status === "추천필요").length}건` },
];

const filterItems = ["전체", "접수중", "마감임박", "추천필요"] as const;

function getDeadlineTone(daysLeft: number) {
  if (daysLeft <= 3) {
    return styles.deadlineDanger;
  }

  if (daysLeft <= 7) {
    return styles.deadlineWarning;
  }

  return styles.deadlineNeutral;
}

function getStatusTone(status: JobStatus) {
  if (status === "마감임박") {
    return styles.statusDanger;
  }

  if (status === "추천필요") {
    return styles.statusWarning;
  }

  return styles.statusSuccess;
}

export function StudentJobsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>학생 공고</p>
        <h1>채용공고</h1>
        <p className={styles.description}>회사, 직무, 마감일을 비교합니다.</p>
      </header>

      <section aria-label="공고 요약" className={styles.summaryRow}>
        {summaryItems.map((item) => (
          <article className={styles.summaryChip} key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section aria-label="공고 필터" className={styles.filterRow}>
        {filterItems.map((item, index) => (
          <button
            aria-pressed={index === 0}
            className={`${styles.filterChip} ${index === 0 ? styles.filterChipActive : ""}`.trim()}
            key={item}
            type="button"
          >
            {item}
          </button>
        ))}
      </section>

      <section aria-labelledby="jobs-list-title" className={styles.listSection}>
        <h2 className={styles.sectionTitle} id="jobs-list-title">
          비교하기 쉬운 공고 목록
        </h2>

        <div className={styles.cardList}>
          {jobs.map((job) => (
            <article className={styles.jobCard} key={job.id}>
              <div className={styles.cardTop}>
                <span className={styles.companyType}>{job.companyType}</span>
                <span className={`${styles.statusBadge} ${getStatusTone(job.status)}`.trim()}>
                  <span aria-hidden="true" className={styles.statusDot} />
                  {job.status}
                </span>
              </div>

              <div className={styles.coreRow}>
                <div className={styles.titleGroup}>
                  <p className={styles.companyName}>{job.companyName}</p>
                  <h3>{job.title}</h3>
                </div>

                <div className={styles.deadlineBlock}>
                  <span>마감일 {job.deadline}</span>
                  <strong className={getDeadlineTone(job.daysLeft)}>
                    {job.daysLeft === 0 ? "D-Day" : `D-${job.daysLeft}`}
                  </strong>
                </div>
              </div>

              <div className={styles.bottomRow}>
                <p className={styles.meta}>
                  <span>{job.role}</span>
                  <span>{job.location}</span>
                  <span>{job.department}</span>
                </p>

                <button className={styles.detailButton} type="button">
                  상세 보기
                  <ChevronRight aria-hidden="true" size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
