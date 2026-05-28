export const employmentDashboardKpis = [
  { label: "전체 취업률", value: "68%", meta: "이번 주 확인 대상 18명" },
  { label: "취업 확정", value: "34명", meta: "기업 배치 완료 기준" },
  { label: "취업 약정", value: "11명", meta: "추천·약정 약속 확인 필요" },
  { label: "미확정", value: "18명", meta: "집중 상담과 공고 연결 필요" },
  { label: "대상 학생", value: "63명", meta: "3학년 전체 관리 기준" },
] as const;

export const employmentDashboardCompanyDistribution = [
  { label: "중견기업", meta: "중소 포함 채용 비중", percent: 42 },
  { label: "중소기업", meta: "현장실습 연계 중심", percent: 34 },
  { label: "공공·기관", meta: "준비 중인 유형 포함", percent: 14 },
  { label: "기타", meta: "추가 탐색 기업군", percent: 10 },
] as const;

export const employmentDashboardDepartmentRanking = [
  { label: "기계과", meta: "취업 확정 14명 · 약정 3명", value: "79%" },
  { label: "전기과", meta: "취업 확정 11명 · 약정 2명", value: "73%" },
  { label: "전자과", meta: "취업 확정 9명 · 약정 4명", value: "66%" },
  { label: "자동차과", meta: "취업 확정 7명 · 상담 필요 5명", value: "61%" },
] as const;

export const employmentDashboardTasks = [
  { title: "한빛정공 생산기술 공고", meta: "마감까지 2일 · 지원서 최종 점검 필요", badge: "마감 임박", tone: "danger" },
  { title: "추천 확인 필요 학생 3명", meta: "전기과 2명 · 기계과 1명", badge: "추천 확인", tone: "warning" },
  { title: "미응답 참여조사 8명", meta: "현장실습 사전 조사 · 오늘 오후 안내 필요", badge: "미응답", tone: "neutral" },
  { title: "승인·검토 대기 4건", meta: "공지 1건 · 자료 3건", badge: "검토 대기", tone: "warning" },
  { title: "AI draft 검토 대기 2건", meta: "공고 초안 1건 · 뉴스 초안 1건", badge: "초안 검토", tone: "neutral" },
] as const;
