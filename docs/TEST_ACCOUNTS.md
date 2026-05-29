# TEST_ACCOUNTS.md

> 경고: 비밀번호는 `\.env.local` 또는 `\.env.e2e`에만 보관한다. 이 문서와 repo에는 비밀번호를 기록하지 않는다.

Firebase Auth / route guard / Firestore read 검증에 사용하는 테스트 계정 목록이다.

## 공통 기준

- schoolId: `bmt`
- status: `active`
- 비밀번호: 문서화 금지
- Firebase API key / env 값: 문서화 금지

## 계정 목록

### 1. 학생

- email: `test_student@bmt.hs.kr`
- uid: `gGjGmUB3QaVyOdqAIavQ408osUa2`
- role: `student`
- status: `active`
- schoolId: `bmt`
- expected home: `/student`

### 2. 취업진로부

- email: `test_teacher1@bmt.hs.kr`
- uid: `gdZ8aojbaXfwXMuFHNrnsTRSZ5v2`
- role: `employment_teacher`
- status: `active`
- schoolId: `bmt`
- expected home: `/employment`

### 3. 일반교사

- email: `test_teacher2@bmt.hs.kr`
- uid: `ZBLCFFZsL0TOK0YdaiMlM4t3HDH2`
- role: `general_teacher`
- status: `active`
- schoolId: `bmt`
- expected home: `/teacher`

### 4. 관리자

- email: `test_master@bmt.hs.kr`
- uid: `zHPSylRk9td708m9DOdOD0zGZhK2`
- role: `admin`
- status: `active`
- schoolId: `bmt`
- expected home: `/admin`

## 사용 메모

- `employment_teacher` 계정은 `/employment/*` live read 검증 기본 계정으로 사용한다.
- `student` 계정은 student route redirect와 학생 화면 검증에 사용한다.
- `general_teacher` 계정은 teacher route redirect와 read-only 범위 검증에 사용한다.
- `admin` 계정은 `/admin` route 진입과 상위 권한 검증에 사용한다.
