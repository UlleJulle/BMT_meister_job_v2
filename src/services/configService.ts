import type {
  DepartmentDoc,
  NewsSettingsDoc,
  NewsSourceDoc,
  NewsTopicDoc,
  SiteConfig,
} from "../types/school";

export const defaultSchoolId = import.meta.env.VITE_DEFAULT_SCHOOL_ID || "bmt";

export type SchoolConfigSnapshot = {
  siteConfig: SiteConfig;
  departments: DepartmentDoc[];
  newsTopics: NewsTopicDoc[];
  newsSources: NewsSourceDoc[];
  newsSettings: NewsSettingsDoc;
};

export async function getSchoolConfigPlaceholder(
  schoolId = defaultSchoolId,
): Promise<SchoolConfigSnapshot> {
  return {
    siteConfig: { schoolId },
    departments: [],
    newsTopics: [],
    newsSources: [],
    newsSettings: {
      schoolId,
      enabled: false,
      defaultMode: "department_first",
      autoCollectEnabled: false,
      requireReviewBeforePublish: true,
      visibleTabs: [],
    },
  };
}
