# DATA_MODEL.md

v2 데이터 모델 기준. v2 primary database는 Cloud Firestore다.

---

## 1. 기본 경로

```txt
/users/{uid}
/schools/{schoolId}
/schools/{schoolId}/members/{uid}
/schools/{schoolId}/roles/{roleId}
/schools/{schoolId}/settings/{settingId}
/schools/{schoolId}/students/{studentId}
/schools/{schoolId}/students/{studentId}/favorites/{jobId}
/schools/{schoolId}/students/{studentId}/personalSchedules/{personalScheduleId}
/schools/{schoolId}/teachers/{teacherId}
/schools/{schoolId}/companies/{companyId}
/schools/{schoolId}/jobs/{jobId}
/schools/{schoolId}/applications/{applicationId}
/schools/{schoolId}/recommendations/{recommendationId}
/schools/{schoolId}/schedules/{scheduleId}
/schools/{schoolId}/content/{contentId}
/schools/{schoolId}/boards/{boardId}
/schools/{schoolId}/boards/{boardId}/posts/{postId}
/schools/{schoolId}/surveys/{surveyId}
/schools/{schoolId}/surveys/{surveyId}/responses/{studentId}
/schools/{schoolId}/uploads/{uploadId}
/schools/{schoolId}/aiDrafts/{draftId}
/schools/{schoolId}/externalJobSources/{sourceId}
/schools/{schoolId}/externalJobDrafts/{draftId}
/schools/{schoolId}/notifications/{notificationId}
/schools/{schoolId}/notificationTemplates/{templateId}
/schools/{schoolId}/notificationLogs/{logId}
/schools/{schoolId}/auditLogs/{logId}
```

초기 `schoolId`: `bmt`

---

## 2. 역할/권한 빌더

```ts
type RoleDoc = {
  roleId: string;
  schoolId: string;
  name: string;
  displayName: string;
  description?: string;
  type: "system" | "custom";
  isSystemRole: boolean;
  isEditable: boolean;
  permissions: Record<string, Record<string, boolean>>;
  menuAccess: string[];
  dataScope: {
    students: "self" | "assignedClass" | "department" | "all";
    jobs: "all";
    schedules: "all" | "targeted";
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  updatedBy: string;
};
```

```ts
type MemberDoc = {
  uid: string;
  schoolId: string;
  roleIds: string[];
  primaryRoleId: string;
  status: "active" | "pending" | "disabled";
  assignedDepartments?: string[];
  assignedClasses?: string[];
  permissionsSnapshot?: Record<string, Record<string, boolean>>;
  updatedAt: Timestamp;
};
```

---

## 3. 학생 개인 일정

```ts
type PersonalScheduleDoc = {
  personalScheduleId: string;
  schoolId: string;
  studentId: string;
  title: string;
  description?: string;
  startAt: Timestamp;
  endAt?: Timestamp;
  type: "personal" | "study" | "interview_prepare" | "document_prepare" | "other";
  isDone?: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

---

## 4. AI Drafts

```ts
type AiDraftDoc = {
  draftId: string;
  schoolId: string;
  type: "job" | "company" | "industry_news";
  sourceType: "pdf" | "text" | "url" | "api" | "manual";
  sourceFileId?: string;
  sourceUrl?: string;
  rawTextRef?: string;
  extractedData: Record<string, unknown>;
  aiSummary?: string;
  departmentTags?: string[];
  topicTags?: string[];
  careerConnection?: string;
  confidence?: number;
  status: "draft" | "reviewing" | "approved" | "rejected" | "published";
  createdBy: string;
  reviewedBy?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  reviewedAt?: Timestamp;
};
```

---

## 5. External Job Discovery

Phase 2 구조. 구현 금지, 설계만 가능.

```ts
type ExternalJobSourceDoc = {
  sourceId: string;
  schoolId: string;
  name: string;
  type: "api" | "scraping" | "manual_url";
  baseUrl?: string;
  keywords?: string[];
  departments?: string[];
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

```ts
type ExternalJobDraftDoc = {
  draftId: string;
  schoolId: string;
  sourceId?: string;
  sourceType: "api" | "scraping" | "manual_url";
  sourceName: string;
  sourceUrl?: string;
  companyName: string;
  title: string;
  deadlineAt?: Timestamp;
  departmentTags: string[];
  jobTypeTags: string[];
  qualificationSummary?: string;
  aiSummary?: string;
  matchReason?: string;
  status: "collected" | "reviewing" | "approved" | "rejected" | "imported";
  createdAt: Timestamp;
  reviewedAt?: Timestamp;
  reviewedBy?: string;
};
```

---

## 6. Custom Boards

```ts
type BoardDoc = {
  boardId: string;
  schoolId: string;
  name: string;
  description?: string;
  type: "notice" | "resource" | "faq" | "department" | "event" | "general";
  visibility: {
    roles: string[];
    departments?: string[];
    grades?: number[];
  };
  permissions: {
    canRead: string[];
    canCreate: string[];
    canUpdate: string[];
    canDelete: string[];
    canUpload: string[];
  };
  allowStudentPost: boolean;
  allowComments: boolean;
  allowAttachments: boolean;
  status: "active" | "archived";
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string;
  updatedBy: string;
};
```

---

## 7. Notifications

```ts
type NotificationDoc = {
  notificationId: string;
  schoolId: string;
  title: string;
  message: string;
  channel: "in_app" | "push" | "sms" | "kakao" | "email";
  targetType: "students" | "teachers" | "custom";
  targetUserIds: string[];
  relatedType?: "schedule" | "job" | "survey" | "application";
  relatedId?: string;
  status: "draft" | "scheduled" | "sent" | "failed" | "cancelled";
  scheduledAt?: Timestamp;
  sentAt?: Timestamp;
  createdBy: string;
  createdAt: Timestamp;
};
```

```ts
type NotificationTemplateDoc = {
  templateId: string;
  schoolId: string;
  name: string;
  channel: "in_app" | "push" | "sms" | "kakao" | "email";
  titleTemplate?: string;
  messageTemplate: string;
  variables: string[];
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

```ts
type NotificationLogDoc = {
  logId: string;
  schoolId: string;
  notificationId: string;
  channel: "in_app" | "push" | "sms" | "kakao" | "email";
  targetUserId: string;
  status: "sent" | "failed" | "skipped";
  providerMessageId?: string;
  errorMessage?: string;
  sentAt?: Timestamp;
  createdAt: Timestamp;
};
```

API Key 원문 저장 금지. Secret Manager 사용.

---

## 8. Security Rules 핵심

- user.schoolId와 path schoolId 일치 검증.
- 학생은 본인 데이터와 대상 공개 데이터만 접근.
- 학생 개인 일정은 본인만 C/U/D.
- custom role은 permission code 기준으로 판정.
- AI Draft는 employment_teacher/admin/master만 접근.
- Notification 발송은 employment_teacher/admin/master만 가능.
- 실제 카톡/SMS/Push는 Cloud Functions에서 최종 검증.

---

## 학교별 학과 / 뉴스 동적 설정

```txt
/schools/{schoolId}/departments/{departmentId}
/schools/{schoolId}/newsTopics/{topicId}
/schools/{schoolId}/newsSources/{sourceId}
/schools/{schoolId}/settings/newsSettings
```

```ts
type DepartmentDoc = {
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
  createdAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy: string;
};
```

```ts
type NewsTopicDoc = {
  topicId: string;
  schoolId: string;
  name: string;
  description?: string;
  keywords: string[];
  departmentIds: string[];
  sourceTypes: ("news" | "blog" | "cafe" | "public_api")[];
  isActive: boolean;
  displayOrder: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy: string;
};
```

```ts
type NewsSourceDoc = {
  sourceId: string;
  schoolId: string;
  name: string;
  provider: "naver" | "public_api" | "manual" | "custom";
  sourceType: "news" | "blog" | "cafe" | "api";
  enabled: boolean;
  secretName?: string;
  baseUrl?: string;
  rateLimitMemo?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

```ts
type NewsSettingsDoc = {
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
  updatedAt: Timestamp;
  updatedBy: string;
};
```

원칙:
- 학과명, 뉴스탭, 키워드는 코드에 하드코딩하지 않는다.
- 다른 학교 적용 시 departments/newsTopics/newsSettings만 바꾸면 화면이 바뀌어야 한다.
- AI 뉴스 수집 결과는 departmentTags/topicTags를 추천하고, 취업진로부 검토 후 게시한다.
