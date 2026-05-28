export type SiteConfig = {
  schoolId: string;
  schoolName?: string;
  serviceName?: string;
  logoUrl?: string;
};

export type DepartmentDoc = {
  departmentId: string;
  schoolId: string;
  name: string;
  shortName?: string;
  description?: string;
  isActive: boolean;
  displayOrder: number;
  relatedTopicIds: string[];
  defaultKeywords: string[];
  gradeOptions?: number[];
  classOptions?: string[];
  createdAt?: unknown;
  updatedAt?: unknown;
  updatedBy?: string;
};

export type NewsTopicDoc = {
  topicId: string;
  schoolId: string;
  name: string;
  description?: string;
  keywords: string[];
  departmentIds: string[];
  sourceTypes: Array<"news" | "blog" | "cafe" | "public_api">;
  isActive: boolean;
  displayOrder: number;
  createdAt?: unknown;
  updatedAt?: unknown;
  updatedBy?: string;
};

export type NewsSourceDoc = {
  sourceId: string;
  schoolId: string;
  name: string;
  provider: "naver" | "public_api" | "manual" | "custom";
  sourceType: "news" | "blog" | "cafe" | "api";
  enabled: boolean;
  secretName?: string;
  baseUrl?: string;
  rateLimitMemo?: string;
  createdAt?: unknown;
  updatedAt?: unknown;
};

export type NewsSettingsDoc = {
  schoolId: string;
  enabled: boolean;
  defaultMode: "department_first" | "topic_first" | "mixed";
  autoCollectEnabled: boolean;
  requireReviewBeforePublish: boolean;
  visibleTabs: Array<{
    type: "department" | "topic" | "custom";
    id: string;
    label: string;
    displayOrder: number;
    enabled: boolean;
  }>;
  updatedAt?: unknown;
  updatedBy?: string;
};
