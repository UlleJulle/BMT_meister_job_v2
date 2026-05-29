# TEST_ACCOUNTS.md

> 경고: 비밀번호는 `.env.local` 또는 `.env.e2e`에만 보관한다. 이 문서와 repo에는 비밀번호를 기록하지 않는다.

Firebase Auth / route guard / Firestore read 검증에 사용하는 테스트 계정 목록이다.

## 공통 기준

- schoolId: `bmt`
- status: `active`
- 비밀번호: 문서 기록 금지
- Firebase API key / env 값: 문서 기록 금지

## 계정 목록

### 1. student

- email: `test_student@bmt.hs.kr`
- uid: `gGjGmUB3QaVyOdqAIavQ408osUa2`
- role: `student`
- status: `active`
- schoolId: `bmt`
- expected home: `/student`

### 2. employment_teacher

- email: `test_teacher1@bmt.hs.kr`
- uid: `gdZ8aojbaXfwXMuFHNrnsTRSZ5v2`
- role: `employment_teacher`
- status: `active`
- schoolId: `bmt`
- expected home: `/employment`

### 3. general_teacher

- email: `test_teacher2@bmt.hs.kr`
- uid: `ZBLCFFZsL0TOK0YdaiMlM4t3HDH2`
- role: `general_teacher`
- status: `active`
- schoolId: `bmt`
- expected home: `/teacher`

### 4. admin / master

- email: `test_master@bmt.hs.kr`
- uid: `zHPSylRk9td708m9DOdOD0zGZhK2`
- role: `admin`
- adminLevel: `master`
- status: `active`
- schoolId: `bmt`
- expected home: `/admin`

## 사용 메모

- `employment_teacher` 계정은 `/employment/*` Firestore live read 검증 기본 계정으로 사용한다.
- `student` 계정은 `/student/*` route redirect 및 student shell 검증에 사용한다.
- `general_teacher` 계정은 `/teacher/*` route redirect 및 read-only shell 검증에 사용한다.
- `admin` 계정은 `/admin` route smoke test와 상위 권한 redirect 검증에 사용한다.
