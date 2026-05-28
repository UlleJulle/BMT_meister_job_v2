# BMT 취업지원관리 플랫폼 v2 - 후순위 기능 메모

> 이 문서는 작업 중 “나중에 하면 됨”으로 미룬 기능과 운영 보완 항목을 모아두는 백로그입니다.  
> 새로 미루는 항목이 생기면 이 문서 맨 아래 `추가 메모`에 계속 붙여넣습니다.

---

## 1. Auth / 권한 / 라우팅

- Firebase Auth 연결
- 회원가입 / 로그인 실제 기능 구현
- 학생 / 일반교사 / 취업진로부 / 관리자 역할별 라우팅
- 로그인 후 역할별 기본 진입 화면 분기
- 계정 승인 / 가입 제한 / 학교 계정 도메인 정책
- `authSettings` 기반 설정 구조
- 비밀번호 찾기 실제 연결
- 이메일 인증 여부 처리
- 권한 없는 라우트 접근 차단

---

## 2. Firebase / 데이터 연결

- v2용 신규 Firebase 프로젝트 사용 여부 결정
- 기존 v1 Firebase 프로젝트 연결 여부 결정
- Firestore / Realtime DB 중 실제 사용 구조 확정
- Firebase config 연결
- 실제 데이터 read 연결
- 실제 write는 보안 rules 확정 후 단계적으로 허용
- Firebase Security Rules 작성
- 역할별 읽기/쓰기 권한 검증
- Firebase MCP는 초기 read-only/config/rules 확인용으로만 사용
- 기존 v1 데이터 훼손 방지

---

## 3. 학생 기능 후순위

### 3.1 채용공고

- 공고 상세 화면
- 관심공고 / 즐겨찾기
- 지원 요청 / 지원 취소
- 지원 상태 확인
- 추천 필요 공고 표시
- 학과/직무/지역 필터 실제 동작
- 마감임박 정렬
- 공고 검색
- 공고 상세에서 관련 일정/자료 연결

### 3.2 일정

- 학생 개인 일정 추가 drawer/form
- 개인 일정 수정
- 개인 일정 삭제
- 개인 일정 저장 경로 연결
  - `/schools/{schoolId}/students/{studentId}/personalSchedules`
- 공식 일정은 학생 조회 전용
- 개인 일정은 학생 본인 C/U/D 가능
- 캘린더 날짜 선택 실제 동작
- 월간/주간 보기 확장
- 일정 알림 여부 검토

### 3.3 콘텐츠

- 산업뉴스 상세
- 게시판/공지 상세
- 자료실 상세
- 자료 다운로드
- 원문 링크 처리
- 학과별 관련 뉴스 필터
- 게시판 읽음 상태
- 댓글/추천 기능은 후순위 검토

### 3.4 프로필

- 프로필 수정
- 연락처 수정
- 희망 직무/지역 수정
- 자격증 추가/수정
- 취업 준비 상태 수정
- 파일 업로드 여부 검토

---

## 4. 일반교사 기능 후순위

- 일반교사는 기본 read-only 유지
- 담당 학생현황 상세
- 학생별 취업 준비 상태 확인
- 학생별 지원 현황 조회
- 채용공고 조회
- 일정 조회
- 콘텐츠 조회
- 수정/등록/삭제 기능은 노출하지 않음
- 필요 시 메모/상담 기록은 별도 권한 검토 후 구현

---

## 5. 취업진로부 기능 후순위

### 5.1 채용공고 운영

- `/employment/jobs` desktop은 나중에 compact table/list 운영 화면으로 강화
- mobile은 현재 카드형 유지
- 검색 / 필터 / 정렬
- 체크박스 다중 선택
- 일괄 작업
- 상태 변경
- 공고 추가
- 공고 수정
- 공고 보관/마감
- 공개/비공개
- 지원자 수 연결
- 추천 필요 여부 관리
- 특채/일반 구분
- 노출 상태 관리

### 5.2 지원현황

- 학생별 지원 상태
- 공고별 지원자 목록
- 추천/승인/반려 흐름
- 서류 제출 상태
- 면접/합격/불합격 상태
- 상태별 필터
- 다운로드/엑셀 export 검토

### 5.3 학생현황

- 학과/반/학년별 학생 현황
- 취업 준비 상태
- 미확정 학생 관리
- 추천 필요 학생
- 상담 필요 학생
- 학생 상세 연결

### 5.4 기업DB

- 기업 목록
- 기업 유형
- 협약기업 / 중견기업 / 공공기관 등 분류
- 채용 이력
- 담당자 정보
- 기업 상세
- 기업 추가/수정은 후순위

### 5.5 일정

- 공식 일정 등록/수정/삭제
- 학과/학년/대상별 일정 노출
- 학생 개인 일정과 분리
- 행사 일정 연결

### 5.6 콘텐츠

- 공지 작성
- 산업뉴스 작성/검토
- 자료 업로드
- 게시판 관리
- AI draft 검토 흐름

### 5.7 참여조사 / 행사관리

- 행사 생성
- 참여조사 생성
- 응답자 목록
- 미응답자 확인
- 마감/종료 처리
- 결과 export
- 취업진로부가 주 운영자
- 일반교사는 read-only 또는 숨김

---

## 6. 관리자 / 설정 후순위

- Admin dashboard
- 학교 설정
- 메뉴 설정
- 권한 정책
- `authSettings`
- 가입 제한 설정
- 학생/교사 이메일 형식 설정
- 허용 도메인 설정
- 역할별 접근 제어
- 위험한 설정은 overflow/confirm 처리
- 시스템 로그/감사 기록 검토

---

## 7. UI / 디자인 후순위

- 공통 컴포넌트 정리
  - Button
  - Card
  - Input
  - Badge
  - Chip
  - Modal
  - Drawer
  - Tabs
- Storybook은 공통 UI 컴포넌트 10개 내외 이후 검토
- 모바일 bottom nav 역할별 일관성 유지
- desktop 운영 화면은 table/list, mobile은 card 원칙
- warm ivory / warm-gray token 유지
- 불필요한 큰 hero box 금지
- 개발자용 문구 화면 노출 금지
- 44px touch target 검증
- Playwright 캡처 기반 판단 유지

---

## 8. 개발환경 / 정리 후순위

- `.gitignore` 정리
  - `node_modules/`
  - `dist/`
  - `__captures/`
  - `*.tsbuildinfo`
  - `vite.config.js`
  - `vite.config.d.ts`
- 불필요 산출물 제거
- CI에 `npm run lint` + `npm run build`
- Playwright smoke test
- route check
- console error check
- overflow check
- screenshot capture workflow

---

## 9. MCP 사용 정책

- Playwright MCP
  - 화면 검증
  - 캡처
  - 라우트 확인
  - console/overflow 확인
- Context7 MCP
  - React/Vite/Firebase/TanStack Query/Zustand 최신 문서 확인
- Firebase MCP
  - read-only/config/rules/Auth/Firestore/Storage 확인 우선
  - write 권한은 명시 승인 전 금지
- Chrome DevTools MCP
  - CSS/console/network/performance 디버깅
- GitHub MCP
  - repo/PR/issue/workflow 관리 시작 후 사용
- Storybook MCP
  - 공통 UI 컴포넌트 성숙 후 사용

---

## 10. 추가 메모

> 앞으로 채팅 중 “나중에 하면 됨”, “후순위”, “지금은 보류”로 정한 항목은 이 아래에 계속 추가합니다.

- 
