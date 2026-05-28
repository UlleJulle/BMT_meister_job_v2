export type EmploymentNotificationTone = "warning" | "info" | "neutral" | "success";

export const employmentNotificationSummaryItems = [
  { label: "초안", value: "7건" },
  { label: "예약 예정", value: "3건" },
  { label: "발송 대기", value: "4건" },
  { label: "확인 필요", value: "5건" },
  { label: "이번 주 알림", value: "11건" },
] as const;

export const employmentNotificationTypeFilters = [
  "전체",
  "공고마감",
  "면접",
  "서류제출",
  "현장실습",
  "참여조사",
  "공지",
] as const;

export const employmentNotificationStatusFilters = [
  "전체",
  "초안",
  "예약 예정",
  "발송 대기",
  "확인 필요",
  "완료",
] as const;

export const employmentNotificationTargetFilters = [
  "전체",
  "3학년",
  "2학년",
  "1학년",
  "미응답자",
  "지원자",
] as const;

export const employmentNotificationChannelFilters = [
  "전체",
  "내부알림",
  "카톡 예정",
  "SMS 예정",
  "Push 예정",
] as const;

export const employmentNotificationHighlights = [
  { label: "오늘 발송 준비", value: "2건", note: "면접 안내 1 · 미응답 안내 1" },
  { label: "확인 필요", value: "5건", note: "문구 검수 및 대상 재확인" },
  { label: "이번 주 예약", value: "3건", note: "공고 마감 안내 중심" },
] as const;

export const employmentNotifications = [
  {
    title: "한빛정공 면접 안내",
    type: "면접",
    typeTone: "info",
    target: "기계과 3학년 지원자",
    channel: "내부알림",
    status: "초안",
    statusTone: "warning",
    related: "한빛정공 생산기술 면접",
    note: "면접 장소 문구 확인 필요",
  },
  {
    title: "동해테크 서류 제출 안내",
    type: "서류제출",
    typeTone: "warning",
    target: "전기과 3학년 지원자",
    channel: "카톡 예정",
    status: "발송 대기",
    statusTone: "neutral",
    related: "동해테크 설비 유지보수 인턴",
    note: "미제출 3명 대상 재안내 초안",
  },
  {
    title: "현장실습 시작 안내",
    type: "현장실습",
    typeTone: "success",
    target: "전기과 · 기계과 3학년",
    channel: "Push 예정",
    status: "예약 예정",
    statusTone: "info",
    related: "부산스마트팩토리 현장실습 시작",
    note: "출근 준비물 문구 최종 점검",
  },
  {
    title: "참여조사 미응답 안내",
    type: "참여조사",
    typeTone: "warning",
    target: "자동차과 3학년 미응답자",
    channel: "내부알림",
    status: "확인 필요",
    statusTone: "warning",
    related: "그린모빌리티 참여조사",
    note: "담임 공유 대상 포함 여부 확인",
  },
  {
    title: "공고 마감 임박 안내",
    type: "공고마감",
    typeTone: "warning",
    target: "기계과 3학년 지원 예정자",
    channel: "SMS 예정",
    status: "예약 예정",
    statusTone: "info",
    related: "한빛정공 생산기술 보조 채용",
    note: "예약 시간은 다음 단계에서 연결",
  },
  {
    title: "취업 확정 배치 안내",
    type: "공지",
    typeTone: "neutral",
    target: "취업 확정 학생",
    channel: "내부알림",
    status: "완료",
    statusTone: "success",
    related: "배치 및 서류 준비 공지",
    note: "현장실습 서류 일정 함께 안내",
  },
] as const;
