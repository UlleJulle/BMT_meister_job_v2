export type JobPostingStatus = "open" | "closed" | "draft";
export type JobPostingVisibility = "published" | "private";
export type JobPostingTone = "success" | "warning" | "danger" | "neutral";

export type JobPostingDoc = {
  jobId: string;
  schoolId: string;
  companyName?: string;
  title?: string;
  departmentTags?: string[];
  jobType?: string;
  employmentType?: string;
  deadlineAt?: unknown;
  status?: JobPostingStatus | string;
  visibility?: JobPostingVisibility | string;
  createdAt?: unknown;
  updatedAt?: unknown;
  sourceType?: string;
  memo?: string;
};

export type EmploymentJobListItem = {
  id: string;
  company: string;
  title: string;
  companyType: string;
  department: string;
  dueDate: string;
  dDay: string;
  dDayTone: JobPostingTone;
  publishStatus: string;
  publishTone: JobPostingTone;
  recommendation: string;
  recommendationTone: JobPostingTone;
  metric: string;
  note: string;
};
