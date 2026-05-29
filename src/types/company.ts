export type CompanyStatus = "active" | "inactive" | "pending";
export type TrainingType = "참여기업" | "선도기업" | "일반기업";
export type CompanyTone = "warning" | "info" | "neutral" | "success" | "default";

export type CompanyDoc = {
  companyId: string;
  schoolId: string;
  companyName?: string;
  companySize?: string;
  trainingType?: TrainingType | string;
  relatedJobs?: string[];
  recentPostingTitle?: string;
  hiringHistory?: string;
  salary?: string;
  militaryService?: string;
  dormitory?: string;
  relationshipStatus?: string;
  memo?: string;
  status?: CompanyStatus | string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type EmploymentCompanyListItem = {
  id: string;
  name: string;
  scale: string;
  trainingType: string;
  trainingTone: CompanyTone;
  relatedJobs: string;
  recentPostingTitle: string;
  hiringHistory: string;
  salary: string;
  militaryService: string;
  dormitory: string;
  relationshipStatus: string;
  relationshipTone: CompanyTone;
  memo: string;
};
