export type StudentStatusTone = "warning" | "info" | "neutral" | "success";

export type StudentDoc = {
  studentId: string;
  uid?: string;
  schoolId: string;
  name?: string;
  grade?: number | string;
  classNo?: number | string;
  department?: string;
  studentNo?: number | string;
  specialTrack?: string;
  desiredJob?: string;
  employmentStatus?: string;
  applicationStatus?: string;
  assignedTeacherName?: string;
  recentApplicationSummary?: string;
  memo?: string;
  status?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type EmploymentStudentListItem = {
  id: string;
  name: string;
  gradeClass: string;
  department: string;
  specialTrack: string;
  desiredRole: string;
  latestApplication: string;
  status: string;
  statusTone: StudentStatusTone;
  note: string;
  reviewer: string;
};
