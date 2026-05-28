export type EmploymentSurveyTone = "warning" | "info" | "neutral" | "success";

export const employmentSurveySummaryItems = [
  { label: "진행 중", value: "6건" },
  { label: "마감 임박", value: "2건" },
  { label: "미응답", value: "18명" },
  { label: "완료", value: "9건" },
  { label: "이번 주 행사", value: "3건" },
] as const;

export const employmentSurveyTypeFilters = [
  "전체",
  "설명회",
  "현장실습",
  "면접",
  "서류제출",
  "특강",
  "만족도",
] as const;

export const employmentSurveyStatusFilters = ["전체", "진행 중", "마감 임박", "완료", "준비 중"] as const;
export const employmentSurveyGradeFilters = ["전체", "3학년", "2학년", "1학년"] as const;
export const employmentSurveyDepartmentFilters = ["전체", "기계", "전기", "전자", "자동차"] as const;

export const employmentSurveyHighlights = [
  { label: "오늘 마감", value: "1건", note: "면접 참석 확인 · 미응답 5명" },
  { label: "이번 주 행사", value: "3건", note: "설명회 1 · 특강 2" },
  { label: "재안내 필요", value: "18명", note: "현장실습 조사 미응답 기준" },
] as const;

export const employmentSurveys = [
  {
    title: "한빛정공 현장실습 참여조사",
    type: "현장실습",
    typeTone: "warning",
    period: "2026.06.10 ~ 2026.06.14",
    target: "기계과 3학년",
    response: "응답 42 / 미응답 8",
    status: "진행 중",
    statusTone: "info",
    note: "미응답자 재안내 필요",
  },
  {
    title: "동해테크 면접 참석 확인",
    type: "면접",
    typeTone: "info",
    period: "2026.06.12 13:00",
    target: "전기과 3학년",
    response: "확인 11 / 미확인 2",
    status: "마감 임박",
    statusTone: "warning",
    note: "면접 장소 안내 문구 재전달",
  },
  {
    title: "미래에너지시스템 기업 설명회",
    type: "설명회",
    typeTone: "neutral",
    period: "2026.06.17 10:30",
    target: "전자과 2·3학년",
    response: "신청 29 / 대기 4",
    status: "준비 중",
    statusTone: "neutral",
    note: "강당 좌석 배치 확인 필요",
  },
  {
    title: "그린모빌리티 서류제출 확인",
    type: "서류제출",
    typeTone: "warning",
    period: "2026.06.18 16:00",
    target: "자동차과 3학년",
    response: "제출 17 / 미제출 3",
    status: "마감 임박",
    statusTone: "warning",
    note: "미제출 3명 담임 전달 필요",
  },
  {
    title: "취업캠프 참가 만족도 조사",
    type: "만족도",
    typeTone: "success",
    period: "2026.06.05 ~ 2026.06.09",
    target: "3학년 전체",
    response: "응답 88 / 미응답 6",
    status: "완료",
    statusTone: "success",
    note: "요약 결과 보고서 초안 준비 중",
  },
  {
    title: "부산스마트팩토리 특강 참석 조사",
    type: "특강",
    typeTone: "neutral",
    period: "2026.06.20 15:00",
    target: "기계과 · 전기과 3학년",
    response: "신청 31 / 미응답 7",
    status: "진행 중",
    statusTone: "info",
    note: "교통편 안내문 금요일 배포 예정",
  },
] as const;
