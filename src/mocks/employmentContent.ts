export type ContentTone = "warning" | "info" | "neutral" | "success";

export const employmentContentSummaryItems = [
  { label: "전체", value: "42건" },
  { label: "게시", value: "28건" },
  { label: "검토", value: "6건" },
  { label: "AI", value: "5건" },
  { label: "최근", value: "8건" },
] as const;

export const contentTypeFilters = ["전체", "공지", "뉴스", "자료실", "게시판", "AI draft"] as const;
export const contentStatusFilters = ["전체", "게시 중", "검토 필요", "임시저장", "비공개"] as const;
export const contentDepartmentFilters = ["전체", "기계", "전기", "전자", "자동차"] as const;
export const contentAudienceFilters = ["전체", "학생", "일반교사", "취업진로부"] as const;

export const contentOperationHighlights = [
  { label: "오늘 검토", value: "3건", note: "AI draft 2 · 공지 1" },
  { label: "자료 확인", value: "2건", note: "면접 자료 링크 점검" },
  { label: "최근 게시", value: "8건", note: "이번 주 업데이트" },
] as const;

export const employmentContents = [
  {
    title: "기계과 현장실습 준비 안내",
    type: "공지",
    typeTone: "info",
    audience: "3학년 학생",
    department: "기계",
    status: "게시 중",
    statusTone: "success",
    updatedAt: "2026.06.10",
    note: "면접 자료 링크 확인 필요",
  },
  {
    title: "전기 설비 유지보수 직무 흐름",
    type: "뉴스",
    typeTone: "neutral",
    audience: "학생",
    department: "전기",
    status: "검토 필요",
    statusTone: "warning",
    updatedAt: "2026.06.09",
    note: "학과 키워드 적합성 확인",
  },
  {
    title: "자기소개서 점검 체크리스트",
    type: "자료실",
    typeTone: "info",
    audience: "학생",
    department: "전체",
    status: "게시 중",
    statusTone: "success",
    updatedAt: "2026.06.08",
    note: "최신 양식 버전 유지",
  },
  {
    title: "현장실습 참여 전 유의사항",
    type: "게시판",
    typeTone: "neutral",
    audience: "학생 · 일반교사",
    department: "전체",
    status: "임시저장",
    statusTone: "neutral",
    updatedAt: "2026.06.07",
    note: "문구 검토 후 게시 예정",
  },
  {
    title: "자동차 부품 조립 산업 동향",
    type: "AI draft",
    typeTone: "warning",
    audience: "학생",
    department: "자동차",
    status: "검토 필요",
    statusTone: "warning",
    updatedAt: "2026.06.06",
    note: "출처와 요약 문장 확인",
  },
  {
    title: "기업 면접 질문 예시 모음",
    type: "외부 draft",
    typeTone: "warning",
    audience: "취업진로부",
    department: "전체",
    status: "비공개",
    statusTone: "neutral",
    updatedAt: "2026.06.05",
    note: "파일 업로드 연결 전 보류",
  },
] as const;
