export const employmentStudentSummaryItems = [
  { label: "3학년 관리 대상", value: "233명", hint: "취업 중심" },
  { label: "현재 필터", value: "63명", hint: "상담 필요 기준" },
  { label: "상담 필요", value: "18명", hint: "이번 주 우선" },
  { label: "취업 확정", value: "34명", hint: "배치 준비 포함" },
] as const;

export const employmentStudentStatusFilters = ["전체", "미확정", "상담 필요", "추천 필요", "지원 중", "취업 확정"] as const;

export const employmentStudentMobileFilters = {
  grade: ["3학년", "2학년", "1학년"] as const,
  status: ["상담 필요", "지원 중", "취업 확정"] as const,
} as const;

export const employmentStudentSelectFilters = [
  { label: "학년", value: "3학년" },
  { label: "학과", value: "기계과" },
  { label: "반", value: "전체 반" },
  { label: "상태", value: "상담 필요" },
  { label: "특채 여부", value: "전체" },
] as const;

export const employmentStudents = [
  {
    name: "김다윤",
    gradeClass: "3학년 2반",
    department: "기계과",
    specialTrack: "일반",
    desiredRole: "생산기술",
    latestApplication: "세림정공 · 생산기술 보조 채용",
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
    name: "최민재",
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
    note: "배치 안내 반·현장실습 서류 준비 중",
    reviewer: "정교사",
  },
] as const;
