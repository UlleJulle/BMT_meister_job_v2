# AUTH_ROLE_ROUTING_PLAN.md

BMT v2 Auth / role routing 사전 설계 문서.

이 문서는 실제 Firebase Auth, route guard, security rules 연결 전에
역할별 접근 route, redirect 정책, role source 기준을 먼저 합의하기 위한 계획 문서다.

---

## 1. 목표

- `student / general_teacher / employment_teacher / admin` 역할별 접근 route를 명확히 나눈다.
- 로그인 이후 기본 redirect 경로를 고정한다.
- shell 구현이 끝난 화면을 기준으로 추후 Firebase Auth와 role source를 연결할 수 있게 한다.
- 이번 단계에서는 실제 코드 구현, Firebase 연결, security rules 작성은 하지 않는다.

---

## 2. 역할 정의

| 역할 | 성격 |
|---|---|
| `student` | 학생용 취업 포털 사용자 |
| `general_teacher` | 읽기 전용 중심의 일반교사 |
| `employment_teacher` | 취업진로부 운영자 |
| `admin` | 학교 설정/권한/템플릿 관리자 |

보조 상태:
- `anonymous`: 로그인 전
- `pending`: 승인 대기 계정
- `active`: 사용 가능 계정
- `suspended`: 제한 계정

---

## 3. 기본 redirect 정책

| 상태/역할 | 기본 경로 |
|---|---|
| `anonymous` | `/login` |
| `pending` | `/pending` |
| `student` | `/student` |
| `general_teacher` | `/teacher` |
| `employment_teacher` | `/employment` |
| `admin` | `/admin` |

---

## 4. 역할별 접근 route 범위

### 4-1. Student

허용:
- `/student`
- `/student/jobs`
- `/student/schedules`
- `/student/content`
- `/student/profile`

원칙:
- 학생은 학생용 화면만 접근한다.
- 취업진로부/일반교사/admin route로 직접 접근하면 본인 기본 route로 되돌린다.

### 4-2. General Teacher

허용:
- `/teacher`
- `/teacher/students`
- `/teacher/jobs`
- `/teacher/schedules`
- `/teacher/content`

원칙:
- 일반교사는 read-only 중심이다.
- `/employment/*`는 직접 접근 불가다.
- `/admin/*`는 접근 불가다.

### 4-3. Employment Teacher

허용:
- `/employment`
- `/employment/jobs`
- `/employment/companies`
- `/employment/applications`
- `/employment/students`
- `/employment/schedules`
- `/employment/content`
- `/employment/surveys`
- `/employment/notifications`

원칙:
- 취업진로부 화면은 기본적으로 `employment_teacher` 이상 접근이다.
- 추후 `/employment/recommendations`, `/employment/ai-*`, `/employment/reports` 등을 같은 그룹으로 확장한다.
- `/admin/*`는 접근 불가다.

### 4-4. Admin

허용:
- `/admin/*`

조건부 허용 제안:
- 필요 시 read-only 점검 목적의 `/employment/*`, `/teacher/*`, `/student/*` 접근을 허용할 수 있다.
- 단, 1차 구현에서는 admin이 다른 role shell을 직접 쓰는 구조보다 admin console에 집중하는 편이 안전하다.

권장 기본값:
- 1차 guard 설계에서는 `admin` 기본 진입을 `/admin`으로 제한하고,
  타 role 화면 접근은 명시 승인 후 확장한다.

---

## 5. Protected route 구조 제안

### 5-1. 계층 구조

```txt
PublicRoutes
- /login
- /signup
- /reset-password
- /pending

ProtectedApp
- AuthenticatedGuard
  - PendingGuard
  - RoleHomeRedirect

RoleScopedRoutes
- StudentGuard
  - /student/*
- GeneralTeacherGuard
  - /teacher/*
- EmploymentTeacherGuard
  - /employment/*
- AdminGuard
  - /admin/*
```

### 5-2. 권장 가드 개념

- `AuthenticatedGuard`
  - 로그인 여부 확인
  - 비로그인 사용자는 `/login`으로 이동

- `PendingGuard`
  - 승인 상태가 `pending`이면 `/pending`으로 이동
  - 승인 완료 전에는 실제 앱 route 차단

- `RoleGuard(allowedRoles)`
  - route group별 허용 role 확인
  - 허용되지 않은 role은 본인 기본 home route로 redirect

- `RoleHomeRedirect`
  - `/` 또는 잘못된 상위 route 진입 시 role 기준 홈으로 보냄

---

## 6. route group별 권장 allowedRoles

| Route group | allowedRoles |
|---|---|
| `/student/*` | `student` |
| `/teacher/*` | `general_teacher` |
| `/employment/*` | `employment_teacher` |
| `/admin/*` | `admin` |

확장 메모:
- 추후 필요 시 `admin`에 일부 하위 route read-only 접근을 추가할 수 있다.
- 하지만 1차 연결에서는 role 경계를 명확히 유지하는 편이 안전하다.

---

## 7. 권한 실패 시 처리 규칙

- 비로그인: `/login`
- 승인 대기: `/pending`
- role 불일치: 해당 사용자의 기본 home route로 redirect
- 존재하지 않는 route: role shell 내부 404 또는 기본 home route fallback

권장 UX:
- 단순 차단보다 “접근 권한이 없는 화면” 안내 후 홈으로 이동하는 패턴을 고려한다.
- 단, 1차는 복잡한 안내 UI보다 안전한 redirect를 우선한다.

---

## 8. role source 결정

### 8-1. 초기 role source

- 초기 role source는 `user doc` 기반으로 확정한다.
- 기준 위치 예시:
  - Firestore: `users/{uid}`
  - 또는 학교 구조에 맞춘 사용자 문서 경로
- route guard는 우선 사용자 문서를 읽어 `role`과 `status`를 판단하는 구조로 설계한다.

### 8-2. user doc 필드 초안

| 필드 | 예시 | 용도 |
|---|---|---|
| `role` | `student \| general_teacher \| employment_teacher \| admin` | route 접근 역할 |
| `status` | `pending \| active \| suspended` | 승인/차단 상태 |
| `schoolId` | `school-a` | 학교 구분 |
| `grade` | `1 \| 2 \| 3` | 학생 학년 |
| `department` | `기계` | 학과 |
| `classNo` | `1` | 반 |
| `permissions` | `[]` 또는 permission map | 세부 권한 확장 |
| `createdAt` | timestamp | 생성 시점 |
| `updatedAt` | timestamp | 수정 시점 |

메모:
- 학생이 아닌 역할에도 `schoolId`, `permissions`, `status`는 공통적으로 유지하는 편이 좋다.
- `grade / department / classNo`는 학생 중심 필드이며 교사 역할에는 null 또는 미사용 처리할 수 있다.

### 8-3. user doc 기반을 초기 선택으로 두는 이유

- 학교별/학년별/학과별/승인 상태를 함께 관리하기 쉽다.
- 프론트 shell 연결 단계에서 필요한 표시 정보와 권한 판단 정보를 한 번에 참조하기 좋다.
- 학교별 확장 필드가 생겨도 custom claims보다 유연하게 대응할 수 있다.

### 8-4. custom claims 보류 이유

- custom claims는 보안상 유용하지만 초기 구현의 role source로는 보류한다.
- 이유:
  - Admin SDK 또는 서버성 작업이 필요하다.
  - claims 동기화 시점 관리가 추가로 필요하다.
  - 학교별 세부 속성(`grade`, `department`, `classNo`, `status`)을 함께 다루기에는 user doc이 더 유연하다.
- 따라서 1차 프론트 shell 연결 단계에서는 `user doc`을 기준으로 하고,
  고권한 enforcement 강화가 필요해질 때 `employment_teacher` / `admin` 역할에 대해 custom claims를 후순위로 검토한다.

---

## 9. Firebase Auth 연동 전제

추후 구현 시 필요한 항목:
- Firebase Auth 로그인 상태
- 사용자 문서에서 `role` / `status` 확인
- `schoolId`, `userId`, `status(pending/active)` 확인
- role 기반 route guard 연결
- Firestore / Realtime DB / Storage security rules와 동일한 role 기준 정렬

이번 단계에서 하지 않는 것:
- 실제 Firebase Auth 연결
- 실제 custom claims 처리
- 실제 security rules 작성
- 실제 provider / hook 구현

중요:
- 프론트 route guard만으로 실제 보안이 완성되지는 않는다.
- Firestore / Realtime DB / Storage security rules에서 같은 role 기준으로 다시 차단해야 한다.

---

## 10. 후속 구현 순서 제안

1. auth 상태 모델 합의 (`anonymous / pending / active / suspended`)
2. `user doc` 기반 role source 연결
3. router 상단 공통 guard 설계
4. role별 route group guard 연결
5. login 후 redirect / deep-link 처리
6. 필요 시 고권한 역할 custom claims 검토
7. Firestore / Realtime DB / Storage security rules와 role 기준 맞춤
8. 최종 회귀검증

---

## 11. 현재 판단 요약

- 학생은 학생 route만 접근
- 일반교사는 `/teacher/*` read-only 중심
- 취업진로부는 `/employment/*` 운영 shell 접근
- 관리자는 `/admin/*` 중심 접근
- 초기 role source는 `user doc` 기반으로 확정
- custom claims는 후순위 보강 옵션으로 유지
- 실제 권한 enforcement는 Firebase Auth / user doc / security rules 단계에서 연결
- 현재는 설계 문서화만 완료 상태
