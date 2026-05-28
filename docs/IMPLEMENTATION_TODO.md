# IMPLEMENTATION_TODO.md

v2 작업 순서.

## 1. 현재 완료

- AGENTS.md 정리
- docs 기준 문서 정리
- tokens.css 준비
- v2 scaffold 계획 완료

## 2. 다음 작업

1. 회사 노트북/데스크톱 Git 동기화 기준 확정
2. `v2/` scaffold 생성
3. `v2/src/styles/tokens.css` 복사
4. `globals.css`, `responsive.css` 생성
5. constants/types/utils 기본 생성
6. Firebase modular 초기화
7. providers/router/route guard 생성
8. 공통 UI Button/Input/Card/Badge/Chip
9. Auth/Login
10. Student MVP

## 3. 구현 순서 원칙

- MVP → v2 Core → Budget Option → Phase 2 순서
- AI/API, 알림, 외부발굴은 draft/placeholder 구조부터
- Phase 2 기능은 실제 구현 금지
- Budget Option은 실제 API 계약 전 발송/과금 기능 금지

---

## 동적 학교 설정 구현 순서

1. `departments`, `newsTopics`, `newsSources`, `newsSettings` 타입 정의
2. `configService`, `departmentService`, `newsSettingsService` 생성
3. 관리자 학과 설정 화면
4. 관리자 뉴스탭/키워드 설정 화면
5. 학생 산업뉴스 탭을 설정 기반으로 렌더링
6. 취업진로부 뉴스 draft 검토 화면과 연결
7. AI/API 수집 시 department/topic 키워드 사용
8. 다른 학교 seed config 테스트

---

## 운영 규모 전제

- 학생 규모는 3학년 233명, 2학년 241명, 1학년 241명 기준으로 본다.
- 취업 업무는 3학년 중심이지만 2학년도 특채로 지원할 수 있다.
- `/employment/students`와 `/employment/applications`는 수백 명 단위 운영 화면이다.
- desktop은 카드 무한 나열이 아니라 compact table/list + 검색 + 학년/학과/반/상태/특채 필터 + pagination 구조로 설계한다.
- mobile은 필터 후 compact card 구조로 설계한다.

---

## 학생 학년별 공고 열람/지원 원칙

- 채용공고 열람은 1학년, 2학년, 3학년 전체 학생에게 허용한다.
- 1학년은 공고 열람을 통해 기업/직무 흐름을 미리 확인하는 사용자로 본다.
- 실제 취업 지원/추천/운영 관리는 3학년 중심으로 설계한다.
- 2학년은 특채 등 일부 케이스에서 지원 가능하도록 본다.
- 학년 필터 문구는 `1학년 / 2학년 / 3학년`으로 단순화하고, `특채`는 별도 필터/속성으로 분리한다.

---

## 기업DB 현장실습 전환 구분 원칙

- 기업DB는 기업 규모/유형뿐 아니라 현장실습 전환 구분을 함께 관리한다.
- 현장실습 전환 구분은 `참여기업 / 선도기업 / 일반기업`으로 나눈다.
- 참여기업은 `4주 실습 후 겨울방학 이후 전환` 기준 기업으로 본다.
- 선도기업은 `4주 실습 + 2/3 출석 후 조기 전환 가능` 기준 기업으로 본다.
- 이 구분은 공고, 지원현황, 학생 배치 판단에서 중요한 운영 기준으로 사용한다.

---

## mock 분리 원칙

- page 컴포넌트 내부 mock 배열이 길어지면 `src/mocks/*`로 분리한다.
- page `.tsx`는 화면 구조와 렌더링 중심으로 유지한다.
- 이후 Firebase/API 연결 시 mock import를 query/service 결과로 교체할 수 있게 구성한다.
