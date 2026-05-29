export type ApplicationStatusTone = "warning" | "info" | "neutral" | "success";

export type ApplicationDoc = {
  applicationId: string;
  schoolId: string;
  studentId?: string;
  studentName?: string;
  studentDepartment?: string;
  studentGrade?: number | string;
  studentClassNo?: number | string;
  companyId?: string;
  companyName?: string;
  jobPostingId?: string;
  jobTitle?: string;
  applicationStatus?: string;
  reviewStatus?: string;
  nextStep?: string;
  submittedAt?: unknown;
  memo?: string;
  status?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type EmploymentApplicationListItem = {
  id: string;
  student: string;
  classInfo: string;
  company: string;
  jobTitle: string;
  status: string;
  statusTone: ApplicationStatusTone;
  schedule: string;
  note: string;
  reviewer: string;
};
