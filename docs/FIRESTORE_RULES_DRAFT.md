# FIRESTORE_RULES_DRAFT.md

BMT v2 Firestore security rules 1차 draft 문서.

이 문서는 실제 Firebase Console에 배포하지 않는 로컬 초안이다.
현재 목적은 schema와 role 기준을 security rules 관점에서 정리하는 것이며, 실제 rules 적용은 후속 차수에서 진행한다.

---

## 1. 기본 원칙

- deny-first 기준으로 설계한다.
- `pending` / `suspended` 사용자는 데이터 접근을 기본 제한한다.
- `users/{uid}`는 route guard용 최소 문서이므로 본인 read를 우선 허용한다.
- school-scoped 데이터는 `schools/{schoolId}/members/{uid}`를 기준으로 권한을 확장한다.
- 이번 단계에서는 실제 write path를 열지 않는다.

---

## 2. helper 개념 초안

실배포 전 helper 함수 방향:

```rules
function isSignedIn() {
  return request.auth != null;
}

function isSelf(uid) {
  return isSignedIn() && request.auth.uid == uid;
}

function userDoc() {
  return get(/databases/$(database)/documents/users/$(request.auth.uid));
}

function hasActiveUser() {
  return isSignedIn()
    && userDoc().data.status == "active"
    && userDoc().data.schoolId is string;
}

function sameSchool(schoolId) {
  return hasActiveUser() && userDoc().data.schoolId == schoolId;
}

function memberDoc(schoolId) {
  return get(/databases/$(database)/documents/schools/$(schoolId)/members/$(request.auth.uid));
}

function hasRole(schoolId, role) {
  return sameSchool(schoolId)
    && memberDoc(schoolId).data.role == role
    && memberDoc(schoolId).data.status == "active";
}

function isSchoolStaff(schoolId) {
  return hasRole(schoolId, "general_teacher")
    || hasRole(schoolId, "employment_teacher")
    || hasRole(schoolId, "admin");
}
```

메모:

- 실제 rules에서는 `get()` 비용과 null-safe 처리를 더 엄격히 다듬어야 한다.
- `admin`이 다른 school까지 관리하는 구조는 후속 차수에서 별도 설계한다.

---

## 3. `users/{uid}` draft

정책:

- 본인 read 허용
- write는 이번 단계에서 금지

```rules
match /users/{uid} {
  allow read: if isSelf(uid);
  allow write: if false;
}
```

---

## 4. `schools/{schoolId}/members/{uid}` draft

정책:

- 본인 read 허용
- `employment_teacher` / `admin`은 같은 school 멤버 문서 read 허용
- `general_teacher`의 타인 member read는 후순위로 두거나 제한적으로 검토
- write는 이번 단계에서 금지

```rules
match /schools/{schoolId}/members/{uid} {
  allow read: if isSelf(uid)
    || hasRole(schoolId, "employment_teacher")
    || hasRole(schoolId, "admin");

  allow write: if false;
}
```

---

## 5. `jobPostings` draft

정책:

- `active` 상태의 `student / general_teacher / employment_teacher / admin`은 read 가능
- write는 장래에 `employment_teacher / admin` 예정
- 이번 단계에서는 write 금지

```rules
match /schools/{schoolId}/jobPostings/{jobId} {
  allow read: if sameSchool(schoolId) && hasActiveUser();
  allow write: if false;
}
```

추후 세분화 메모:

- 학생은 `published` 공고만 읽게 할지
- 일반교사 read 범위를 제한할지
- archived/draft 공고를 누가 읽는지

---

## 6. `companies` draft

정책:

- 초기에는 `employment_teacher / admin` 중심 read
- student 직접 read는 후순위
- write는 이번 단계에서 금지

```rules
match /schools/{schoolId}/companies/{companyId} {
  allow read: if hasRole(schoolId, "employment_teacher")
    || hasRole(schoolId, "admin");

  allow write: if false;
}
```

---

## 7. `applications` draft

정책:

- 학생은 본인 application만 read 예정
- `general_teacher`는 school 내 read-only 예정
- `employment_teacher / admin`은 school 내 운영 read/write 예정
- 이번 단계에서는 write 금지

```rules
match /schools/{schoolId}/applications/{applicationId} {
  allow read: if hasRole(schoolId, "employment_teacher")
    || hasRole(schoolId, "admin")
    || hasRole(schoolId, "general_teacher")
    || (
      sameSchool(schoolId)
      && hasRole(schoolId, "student")
      && resource.data.studentUid == request.auth.uid
    );

  allow write: if false;
}
```

---

## 8. `students` draft

정책:

- 학생은 본인 student 문서 read 예정
- `general_teacher`는 read-only 예정
- `employment_teacher / admin`은 운영 read/write 예정
- 이번 단계에서는 write 금지

```rules
match /schools/{schoolId}/students/{studentId} {
  allow read: if hasRole(schoolId, "employment_teacher")
    || hasRole(schoolId, "admin")
    || hasRole(schoolId, "general_teacher")
    || (
      sameSchool(schoolId)
      && hasRole(schoolId, "student")
      && resource.data.uid == request.auth.uid
    );

  allow write: if false;
}
```

---

## 9. status별 제한 메모

- `anonymous`: read/write 모두 금지
- `pending`: route guard와 rules 모두 데이터 접근 제한
- `suspended`: route guard와 rules 모두 데이터 접근 제한
- `active`: role 기준으로만 접근 허용

즉, 실 rules에서는 `hasActiveUser()`를 거의 모든 school-scoped read 조건의 전제로 두는 방향이 안전하다.

---

## 10. 이번 단계의 비범위

- rules 실제 배포
- `allow create / update / delete` 오픈
- schedules / content / surveys / notifications 세부 rules
- cross-school admin 예외 처리
- custom claims 기반 강화
- Cloud Storage rules draft

---

## 11. 다음 차수에서 다룰 것

1. `members` 문서 실제 read 연결
2. `students` / `applications` / `jobPostings` 실 read path 좁히기
3. `employment_teacher` write 범위 세분화
4. `general_teacher` read-only 범위 확정
5. rules syntax 검증 후 staging 환경에서만 테스트

---

## 12. 2026-05-29 read-only rules 상태 메모

현재 live read 검증 완료 기준:

- `users/{uid}`: 본인 read 허용, write false
- `schools/{schoolId}/jobPostings/{jobId}`:
  - `student / general_teacher / employment_teacher / admin` read 허용
  - write false
- `schools/{schoolId}/companies/{companyId}`:
  - `employment_teacher / admin` read 허용
  - write false
- `schools/{schoolId}/students/{studentId}`:
  - `employment_teacher / admin` read 허용
  - write false
- `schools/{schoolId}/applications/{applicationId}`:
  - `employment_teacher / admin` read 허용
  - write false

applications 초안은 현재 아래 기준으로 유지한다.

```rules
match /schools/{schoolId}/applications/{applicationId} {
  allow read: if isSameSchool(schoolId)
    && userDoc().data.role in ["employment_teacher", "admin"];
  allow write: if false;
}
```

주의:

- 이 문서는 rules 초안 정리용이다.
- 실제 rules 배포는 Firebase Console에서 수동 관리 중이며, 이번 문서 작업에서 배포는 하지 않는다.
