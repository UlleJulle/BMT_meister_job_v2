# FIRESTORE_SCHEMA_V1.md

BMT v2 Firestore 1차 schema 설계 문서.

이 문서는 실제 CRUD 연결 전에 `users/{uid}`와 학교 단위 운영 컬렉션의 역할을 좁혀 정리한 초안이다.
이번 단계에서는 schema 방향만 고정하고, 앱 코드의 read/write 연결과 Firebase Console 반영은 하지 않는다.

---

## 1. 설계 범위

이번 차수에서 우선 고정하는 경로:

```txt
/users/{uid}
/schools/{schoolId}
/schools/{schoolId}/members/{uid}
/schools/{schoolId}/jobPostings/{jobId}
/schools/{schoolId}/companies/{companyId}
/schools/{schoolId}/applications/{applicationId}
/schools/{schoolId}/students/{studentId}
```

후순위 경로:

```txt
/schools/{schoolId}/schedules/{scheduleId}
/schools/{schoolId}/contentItems/{contentItemId}
/schools/{schoolId}/surveys/{surveyId}
/schools/{schoolId}/notifications/{notificationId}
```

---

## 2. 공통 설계 원칙

- `users/{uid}`는 전역 로그인 / route guard용 최소 문서로 유지한다.
- `schools/{schoolId}/members/{uid}`는 school-scoped profile / permission source로 유지한다.
- 운영 데이터는 모두 `schools/{schoolId}` 하위에 둬서 멀티스쿨 확장을 가능하게 한다.
- 부산기계공고 전용 하드코딩은 두지 않는다.
- `schoolId`는 모든 school-scoped 문서의 필수 필드로 유지한다.
- 실제 write path는 추후 CRUD 연결 차수 전까지 열지 않는다.

---

## 3. users 와 members 역할 분담

### 3-1. `users/{uid}`

목적:

- Firebase Auth 로그인 사용자의 전역 최소 프로필
- route guard가 빠르게 읽는 문서
- `anonymous / pending / active / suspended` 상태 판단
- role별 home redirect 판단

권장 필드:

```ts
type UserDoc = {
  uid: string;
  email: string;
  displayName: string;
  role: "student" | "general_teacher" | "employment_teacher" | "admin";
  status: "pending" | "active" | "suspended";
  schoolId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
};
```

원칙:

- `role`, `status`, `schoolId`는 route guard용 최소 필수 필드다.
- 학교별 상세 권한, 학년, 담당 범위는 이 문서에 과하게 넣지 않는다.
- write는 후순위이며, 초기 단계에서는 수동 관리 또는 admin 전용 유지가 안전하다.

### 3-2. `schools/{schoolId}/members/{uid}`

목적:

- 학교별 멤버십 / 세부 권한 / 소속 관리
- security rules에서 school-scoped 접근 범위를 판단하는 기준
- 추후 `general_teacher`, `employment_teacher`, `admin`의 상세 permission source

권장 필드:

```ts
type MemberDoc = {
  uid: string;
  schoolId: string;
  role: "student" | "general_teacher" | "employment_teacher" | "admin";
  status: "pending" | "active" | "suspended";
  name?: string;
  department?: string;
  teacherType?: "general_teacher" | "employment_teacher";
  grade?: 1 | 2 | 3;
  classNo?: string;
  studentNo?: string;
  managedDepartments?: string[];
  permissions?: Record<string, boolean>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

원칙:

- `users/{uid}`와 중복은 최소화하되, school-scoped 권한 판단에 필요한 정보는 `members` 쪽에 둔다.
- 향후 멀티스쿨 확장 시 한 사용자가 여러 `members` 문서를 가질 수 있게 설계한다.
- `users/{uid}.schoolId`는 현재 기본 학교 기준으로 유지한다.

---

## 4. 학교 루트 문서

### `schools/{schoolId}`

목적:

- 학교 기본 메타데이터
- 템플릿 / 설정 / 활성 여부의 최상위 기준

권장 필드:

```ts
type SchoolDoc = {
  schoolId: string;
  name: string;
  shortName?: string;
  region?: string;
  isActive: boolean;
  templateKey?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

메모:

- 환경별 기본값을 넣더라도 특정 학교 이름 하드코딩은 피한다.
- 세부 설정은 추후 `settings` 또는 별도 subcollection으로 확장한다.

---

## 5. jobPostings schema

### `schools/{schoolId}/jobPostings/{jobId}`

목적:

- 학생 공개용 채용공고
- 취업진로부 운영자가 게시 / 마감 / 숨김 관리

권장 필드:

```ts
type JobPostingDoc = {
  jobId: string;
  schoolId: string;
  companyId?: string;
  title: string;
  companyName: string;
  employmentType?: "full_time" | "internship" | "field_training" | "contract";
  targetGrades?: Array<1 | 2 | 3>;
  departmentTags: string[];
  jobTags?: string[];
  location?: string;
  salaryLabel?: string;
  dormitory?: "provided" | "not_provided" | "negotiable" | "check_required";
  militaryService?: "available" | "not_available" | "check_required";
  deadlineAt?: Timestamp;
  publishedAt?: Timestamp;
  status: "draft" | "published" | "closed" | "archived";
  isVisibleToStudents: boolean;
  sourceType?: "manual" | "ai_draft" | "external_import";
  createdBy: string;
  updatedBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

원칙:

- 학생은 `published + isVisibleToStudents === true` 기준으로만 읽는 방향을 기본으로 둔다.
- 실제 create/update/delete는 후속 차수에서만 연다.

---

## 6. companies schema

### `schools/{schoolId}/companies/{companyId}`

목적:

- 취업진로부 기업DB
- 참여기업 / 선도기업 / 일반기업 운영 분류

권장 필드:

```ts
type CompanyDoc = {
  companyId: string;
  schoolId: string;
  name: string;
  scale: "large" | "mid" | "small" | "public" | "startup";
  fieldTrainingType: "participant" | "leading" | "general";
  departmentTags: string[];
  contactStatus?: "active" | "watch" | "inactive";
  salaryLabel?: string;
  militaryService?: "available" | "not_available" | "check_required";
  dormitory?: "provided" | "not_provided" | "negotiable" | "check_required";
  latestPostingSummary?: string;
  hiringHistorySummary?: string;
  managerMemo?: string;
  status: "active" | "archived";
  createdBy: string;
  updatedBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

원칙:

- 학생 직접 접근은 후순위다.
- 초기 rules는 `employment_teacher / admin` 위주 read를 기본으로 둔다.

---

## 7. applications schema

### `schools/{schoolId}/applications/{applicationId}`

목적:

- 학생 지원현황과 취업진로부 운영 상태 관리

권장 필드:

```ts
type ApplicationDoc = {
  applicationId: string;
  schoolId: string;
  studentUid: string;
  studentId?: string;
  jobId: string;
  companyId?: string;
  companyName: string;
  jobTitle: string;
  status:
    | "draft"
    | "submitted"
    | "document_review"
    | "interview"
    | "offer"
    | "rejected"
    | "withdrawn";
  appliedAt?: Timestamp;
  lastStatusAt?: Timestamp;
  resumeSubmitted?: boolean;
  interviewAt?: Timestamp;
  managerMemo?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  updatedBy: string;
};
```

원칙:

- 학생은 본인 application만 read하는 방향을 기본으로 둔다.
- `general_teacher`는 read-only, `employment_teacher`는 school 단위 운영 read/write 예정으로 둔다.
- 실제 student write는 후순위다.

---

## 8. students schema

### `schools/{schoolId}/students/{studentId}`

목적:

- 학교 단위 학생 운영 현황
- 취업진로부 / 일반교사의 학생현황 화면 source

권장 필드:

```ts
type StudentDoc = {
  studentId: string;
  schoolId: string;
  uid?: string;
  name: string;
  grade: 1 | 2 | 3;
  classNo: string;
  studentNo: string;
  department: string;
  status:
    | "preparing"
    | "applying"
    | "interviewing"
    | "placed"
    | "field_training"
    | "employed";
  desiredJobTags?: string[];
  specialTrack?: boolean;
  contactMemo?: string;
  latestApplicationId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
```

원칙:

- 학생 자신은 본인 문서만 read하는 방향을 기본으로 둔다.
- `general_teacher`는 read-only, `employment_teacher`는 운영 read/write 예정으로 둔다.

---

## 9. 후순위 컬렉션 메모

이번 차수에서는 schema를 깊게 고정하지 않고, route shell 기준의 운영 방향만 남긴다.

- `schedules`: 공식 일정 중심
- `contentItems`: 공지 / 산업뉴스 / 자료실 / 게시판
- `surveys`: 행사 / 참여조사 / 응답 현황
- `notifications`: draft / scheduled / ready 상태 중심

이 컬렉션들은 실제 CRUD 연결 직전에 상세 필드를 좁혀도 충분하다.

---

## 10. 이번 단계의 비범위

- Firestore 실제 write 연결
- 사용자 문서 자동 생성
- seed script 실행
- security rules 배포
- `schools/{schoolId}/members/{uid}` 실제 read 연결
- schedules / content / surveys / notifications의 상세 CRUD schema 확정

