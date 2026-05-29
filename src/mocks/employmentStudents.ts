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
  { label: "병특 여부", value: "전체" },
] as const;
