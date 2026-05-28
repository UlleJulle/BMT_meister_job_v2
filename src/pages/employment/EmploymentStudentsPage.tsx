import styles from "./EmploymentStudentsPage.module.css";

const summaryItems = [
  { label: "3학년 관리 대상", value: "233명", hint: "취업 중심" },
  { label: "현재 필터", value: "63명", hint: "상담 필요 기준" },
  { label: "상담 필요", value: "18명", hint: "이번 주 우선" },
  { label: "취업 확정", value: "34명", hint: "배치 준비 포함" },
] as const;

const statusFilters = ["전체", "미확정", "상담 필요", "추천 필요", "지원 중", "취업 확정"] as const;

const mobileFilters = {
  grade: ["3학년", "2학년", "1학년"] as const,
  status: ["상담 필요", "지원 중", "취업 확정"] as const,
};

const selectFilters = [
  { label: "학년", value: "3학년" },
  { label: "학과", value: "기계과" },
  { label: "반", value: "전체 반" },
  { label: "상태", value: "상담 필요" },
  { label: "특채 여부", value: "전체" },
] as const;

const students = [
  {
    name: "김재윤",
    gradeClass: "3학년 2반",
    department: "기계과",
    specialTrack: "일반",
    desiredRole: "생산기술",
    latestApplication: "한빛정공 · 생산기술 보조 채용",
    status: "상담 필요",
    statusTone: "warning",
    note: "이력서 보완 후 추천 여부 확인 필요",
    reviewer: "박교사",
  },
  {
    name: "박서준",
    gradeClass: "3학년 1반",
    department: "전기과",
    specialTrack: "특채",
    desiredRole: "설비 유지보수",
    latestApplication: "동해테크 · 설비 유지보수 인턴",
    status: "지원 중",
    statusTone: "info",
    note: "면접 질문 정리본 전달 완료",
    reviewer: "정교사",
  },
  {
    name: "이현우",
    gradeClass: "2학년 4반",
    department: "전자과",
    specialTrack: "특채",
    desiredRole: "배선 조립",
    latestApplication: "미래에너지시스템 · 현장 배선 조립 채용",
    status: "추천 필요",
    statusTone: "warning",
    note: "특채 추천 명단 우선 검토 필요",
    reviewer: "김교사",
  },
  {
    name: "최민석",
    gradeClass: "3학년 3반",
    department: "자동차과",
    specialTrack: "일반",
    desiredRole: "차량 조립",
    latestApplication: "그린모빌리티 · 차량 조립 보조 채용",
    status: "미확정",
    statusTone: "neutral",
    note: "추가 지원 공고 연결 필요",
    reviewer: "박교사",
  },
  {
    name: "정하윤",
    gradeClass: "3학년 1반",
    department: "기계과",
    specialTrack: "일반",
    desiredRole: "설비 운영",
    latestApplication: "부산스마트팩토리 · 설비 운영 사원 모집",
    status: "취업 확정",
    statusTone: "success",
    note: "배치 안내 및 현장실습 서류 준비 중",
    reviewer: "정교사",
  },
] as const;

function StatusBadge({
  children,
  tone,
}: {
  children: string;
  tone: "warning" | "info" | "neutral" | "success";
}) {
  return (
    <span className={`${styles.statusBadge} ${styles[tone]}`.trim()}>
      <span aria-hidden="true" />
      {children}
    </span>
  );
}

export function EmploymentStudentsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>학생현황</h1>
          <p className={styles.description}>학생별 취업 준비 상태와 확인이 필요한 학생을 봅니다.</p>
        </div>
      </header>

      <section aria-label="학생 요약" className={styles.summaryGrid}>
        {summaryItems.map((item) => (
          <article className={styles.summaryCard} key={item.label}>
            <span className={styles.summaryLabel}>{item.label}</span>
            <strong className={styles.summaryValue}>{item.value}</strong>
            <span className={styles.summaryHint}>{item.hint}</span>
          </article>
        ))}
      </section>

      <section className={styles.controlSection} aria-labelledby="employment-students-controls">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="employment-students-controls">
              조회 조건
            </h2>
            <p className={styles.sectionDescription}>3학년 중심으로 확인하되 특채 지원자는 2학년까지 함께 봅니다.</p>
          </div>
          <div className={styles.paginationMeta}>1-20 / 233명</div>
        </div>

        <div className={styles.compactFilterBar}>
          <label className={styles.searchField}>
            <span className={styles.searchLabel}>학생 검색</span>
            <input type="text" value="김, 박, 희망 직무" readOnly aria-label="학생 검색" />
          </label>

          <div className={styles.desktopFilters} aria-label="desktop filters">
            {selectFilters.map((filter) => (
              <button type="button" className={styles.selectButton} key={filter.label} aria-label={`${filter.label} 선택`}>
                <span className={styles.selectLabel}>{filter.label}</span>
                <strong className={styles.selectValue}>{filter.value}</strong>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.mobileFilters} aria-label="mobile filters">
          <label className={styles.searchField}>
            <span className={styles.searchLabel}>학생 검색</span>
            <input type="text" value="김, 박, 희망 직무" readOnly aria-label="학생 검색" />
          </label>

          <div className={styles.mobileFilterGroup}>
            <span className={styles.mobileFilterLabel}>학년</span>
            <div className={styles.filterRow}>
              {mobileFilters.grade.map((item, index) => (
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

          <div className={styles.mobileFilterGroup}>
            <span className={styles.mobileFilterLabel}>상태</span>
            <div className={styles.filterRow}>
              {mobileFilters.status.map((item, index) => (
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

        <div className={styles.statusFilters}>
          {statusFilters.map((item, index) => (
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
      </section>

      <section className={styles.listSection} aria-labelledby="employment-students-list">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="employment-students-list">
              학생 운영 목록
            </h2>
            <p className={styles.sectionDescription}>상태, 최근 지원, 확인 메모를 한 줄에서 빠르게 비교합니다.</p>
          </div>
          <div className={styles.paginationMeta}>현재 필터 63명</div>
        </div>

        <div className={styles.tableShell}>
          <div className={styles.tableHeader} role="row">
            <span>학생명</span>
            <span>학년/반</span>
            <span>학과</span>
            <span>특채</span>
            <span>희망 직무</span>
            <span>최근 지원</span>
            <span>상태</span>
            <span>확인 메모</span>
            <span>상세</span>
          </div>

          <div className={styles.tableBody}>
            {students.map((student) => (
              <article className={styles.tableRow} key={`${student.name}-${student.latestApplication}`}>
                <strong className={styles.studentName}>{student.name}</strong>
                <span>{student.gradeClass}</span>
                <span>{student.department}</span>
                <span>{student.specialTrack}</span>
                <span>{student.desiredRole}</span>
                <span className={styles.latestApplication}>{student.latestApplication}</span>
                <StatusBadge tone={student.statusTone}>{student.status}</StatusBadge>
                <span className={styles.noteCell}>{student.note}</span>
                <div className={styles.inlineActionCell}>
                  <button className={styles.primaryAction} type="button">
                    상세 확인
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.paginationRow}>
            <span className={styles.paginationInfo}>1-20 / 233명</span>
            <div className={styles.paginationActions}>
              <button type="button" className={styles.secondaryAction} aria-disabled="true">
                이전
              </button>
              <button type="button" className={styles.secondaryAction} aria-disabled="true">
                다음
              </button>
            </div>
          </div>
        </div>

        <div className={styles.cardList}>
          {students.map((student) => (
            <article className={styles.studentCard} key={`${student.name}-${student.latestApplication}-mobile`}>
              <div className={styles.cardTop}>
                <div className={styles.identityBlock}>
                  <div className={styles.nameRow}>
                    <strong className={styles.studentName}>{student.name}</strong>
                    <span className={styles.classInfo}>
                      {student.department} · {student.gradeClass}
                    </span>
                  </div>
                  <div className={styles.metaChips}>
                    <span className={styles.metaChip}>{student.specialTrack}</span>
                    <span className={styles.metaChip}>희망 {student.desiredRole}</span>
                  </div>
                  <h3 className={styles.latestJob}>{student.latestApplication}</h3>
                </div>

                <div className={styles.statusBlock}>
                  <StatusBadge tone={student.statusTone}>{student.status}</StatusBadge>
                </div>
              </div>

              <div className={styles.metaRow}>
                <span>담당 교사 · {student.reviewer}</span>
                <span>최근 지원 확인</span>
              </div>

              <p className={styles.note}>{student.note}</p>

              <div className={styles.actionRow}>
                <button className={styles.primaryAction} type="button">
                  상세 확인
                </button>
                <button aria-disabled="true" className={styles.secondaryAction} type="button">
                  상담 메모 예정
                </button>
                <button aria-disabled="true" className={styles.secondaryAction} type="button">
                  상태 변경 예정
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
