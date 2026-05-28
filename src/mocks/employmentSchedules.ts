export type ScheduleTone = "warning" | "info" | "neutral" | "success" | "danger";

export const employmentScheduleSummaryItems = [
  { label: "오늘", value: "3건" },
  { label: "이번 주", value: "14건" },
  { label: "마감", value: "5건" },
  { label: "면접", value: "4건" },
  { label: "실습", value: "7건" },
] as const;

export const scheduleTypeFilters = ["전체", "채용마감", "면접", "서류제출", "현장실습", "행사", "조사마감"] as const;
export const scheduleGradeFilters = ["전체", "3학년", "2학년", "1학년"] as const;
export const scheduleDepartmentFilters = ["전체", "기계", "전기", "전자", "자동차"] as const;
export const scheduleStatusFilters = ["전체", "예정", "진행 중", "마감 임박", "완료"] as const;

export const weeklyScheduleHighlights = [
  { day: "오늘", count: "3건", note: "면접 1 · 제출 1 · 조사 1" },
  { day: "내일", count: "2건", note: "채용마감 1 · 설명회 1" },
  { day: "금", count: "4건", note: "현장실습 관련 일정 집중" },
] as const;

export const employmentSchedules = [
  {
    title: "한빛정공 생산기술 면접",
    type: "면접",
    typeTone: "info",
    dateTime: "2026.06.12 14:00",
    target: "기계과 3학년",
    related: "한빛정공 · 생산기술 보조 채용",
    status: "예정",
    statusTone: "info",
    note: "면접 질문지 전달 필요",
  },
  {
    title: "동해테크 서류 제출 마감",
    type: "서류제출",
    typeTone: "warning",
    dateTime: "2026.06.13 17:00",
    target: "전기과 3학년",
    related: "동해테크 · 설비 유지보수 인턴",
    status: "마감 임박",
    statusTone: "warning",
    note: "미제출 학생 3명 확인",
  },
  {
    title: "부산스마트팩토리 현장실습 시작",
    type: "현장실습 시작",
    typeTone: "success",
    dateTime: "2026.06.15 09:00",
    target: "전기과 3학년",
    related: "부산스마트팩토리 · 설비 운영 사원 모집",
    status: "예정",
    statusTone: "info",
    note: "출근 안내문 재확인",
  },
  {
    title: "미래에너지시스템 설명회",
    type: "설명회/행사",
    typeTone: "neutral",
    dateTime: "2026.06.17 10:30",
    target: "전기과 · 전자과 2, 3학년",
    related: "미래에너지시스템 · 현장 배선 조립 채용",
    status: "예정",
    statusTone: "neutral",
    note: "강당 좌석과 참여 명단 확인",
  },
  {
    title: "그린모빌리티 참여조사 마감",
    type: "참여조사 마감",
    typeTone: "warning",
    dateTime: "2026.06.18 16:00",
    target: "자동차과 3학년",
    related: "그린모빌리티 · 차량 조립 보조 채용",
    status: "마감 임박",
    statusTone: "warning",
    note: "미응답 12명 재안내 필요",
  },
  {
    title: "부산스마트팩토리 현장실습 종료",
    type: "현장실습 종료",
    typeTone: "success",
    dateTime: "2026.07.10 18:00",
    target: "전기과 3학년",
    related: "부산스마트팩토리 · 현장실습 운영",
    status: "진행 중",
    statusTone: "success",
    note: "전환 가능 일정 별도 확인",
  },
] as const;
