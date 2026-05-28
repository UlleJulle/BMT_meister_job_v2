# FEATURE_SCOPE.md

v2 기능 범위와 Phase 기준 문서. Codex는 구현 전 반드시 이 문서의 Phase를 확인한다.

---

## 0. Phase 규칙

| 기호 | 의미 | Codex 처리 |
|---|---|---|
| ✅ MVP | 학생 파일럿 전 필수 | 명시 요청 시 구현 가능 |
| 🟦 v2 Core | 정식 운영 전 필요 | 해당 기능 명시 요청 시 구현 |
| 💰 Budget Option | 예산/API 계약 필요 | 구조/placeholder 가능, 실제 API 발송·과금은 승인 전 금지 |
| 🔜 Phase 2 | 추후 확장 | 구현 금지, 설계/placeholder만 가능 |
| ❌ 제외 | 구현하지 않음 | 구현 금지 |
| 🆕 신규 | v1에 없던 기능 | Phase와 함께 판단 |

---

## 1. MVP 컷라인

- 로그인/로그아웃/학생 회원가입/role guard
- 학생 홈
- 채용공고 목록/상세/검색/필터/D-day/관심공고
- 본인 지원현황/지원요청/요청취소
- 공식 일정 조회 + 학생 개인 일정 생성/수정/삭제
- 산업뉴스/공지/게시판/자료실 읽기
- 참여조사 조회/응답
- 기본 공지 배너
- 취업진로부 최소 조회
- 관리자 계정/권한/인증정책 최소 확인

---

## 2. 학생 기능

| 기능 | 범위 | 비고 |
|---|---|---|
| 학생 홈 요약 | ✅ MVP | 공고/일정/지원/공지 |
| 채용공고 탐색 | ✅ MVP | 목록/상세/필터/검색 |
| 관심공고 | ✅ MVP | 본인 저장함 |
| 지원현황 | ✅ MVP | 본인 상태/요청 |
| 공식 일정 조회 | ✅ MVP | 학교 일정 |
| 개인 일정 C/U/D | ✅ MVP | 학생 본인 일정 |
| 산업뉴스 읽기 | ✅ MVP | 학과/주제/진로 연결 |
| 게시판/공지/자료실 읽기 | ✅ MVP | 기본 read-only |
| 참여조사 응답 | ✅ MVP | 대상 학생 |
| 개인 맞춤 추천 | 🔜 Phase 2 | |

---

## 3. 교사/취업진로부/관리자 기본 기능

| 기능 | 범위 | 비고 |
|---|---|---|
| 일반교사 read-only 대시보드 | 🟦 v2 Core | 학생/공고/일정/콘텐츠 조회 |
| 취업진로부 운영 대시보드 | 🟦 v2 Core | 취업현황/지원/마감/미응답 |
| 채용공고 등록/수정/보관 | 🟦 v2 Core | employment/admin |
| 기업 DB 관리 | 🟦 v2 Core | 기업 정보/담당자/메모 |
| 지원 상태 변경 | 🟦 v2 Core | 전형 단계 관리 |
| 추천/승인 요청 관리 | 🟦 v2 Core | 학교장 추천 흐름 |
| 공식 일정 관리 | 🟦 v2 Core | 학생에게 노출 |
| 행사/참여조사 생성/관리 | 🟦 v2 Core | 응답/미응답 |
| 사용자/권한/authSettings | 🟦 v2 Core | admin/master |
| Audit Log | 🟦 v2 Core | 주요 write 추적 |

---

## 4. AI/API 자동화 🆕

| 기능 | 범위 | 비고 |
|---|---|---|
| 채용공고 PDF 자동 읽기 | 🟦 v2 Core | draft/review |
| 채용공고 텍스트 자동 양식화 | 🟦 v2 Core | 붙여넣기 → draft |
| 기업 DB 자동 추출 | 🟦 v2 Core | PDF/텍스트/명함/URL |
| 산업뉴스 학과별 자동 수집 | 🟦 v2 Core | draft/review |
| 산업뉴스 주제별 자동 수집 | 🟦 v2 Core | draft/review |
| AI 요약/진로 연결 문장 생성 | 🟦 v2 Core | 학생 친화 요약 |
| AI Draft 저장/검토/승인 | 🟦 v2 Core | 자동 게시 금지 |
| API Key Secret Manager 관리 | 🟦 v2 Core | 프론트 저장 금지 |
| AI 결과 자동 게시 | ❌ 제외 | |

---

## 5. 외부 채용정보 발굴 🆕

| 기능 | 범위 | 비고 |
|---|---|---|
| 대기업 채용공고 수집 | 🔜 Phase 2 | 삼성/현대/SK/LG/포스코 등 |
| 공기업/공공기관 공고 수집 | 🔜 Phase 2 | API/스크래핑 |
| 학과별 관련 공고 매칭 | 🔜 Phase 2 | |
| 직무/자격요건 자동 추출 | 🔜 Phase 2 | |
| 외부공고 Draft 생성 | 🔜 Phase 2 | |
| 취업진로부 검토 후 게시 | 🔜 Phase 2 | |
| 수집 소스/키워드 관리 | 🔜 Phase 2 | |

Phase 2이므로 구현 금지. 설계/placeholder/문서화만 가능하다.

---

## 6. 커스텀 게시판 / 자료실 🆕

| 기능 | 범위 | 비고 |
|---|---|---|
| 기본 게시판/공지 조회 | ✅ MVP | |
| 기본 자료실 조회/다운로드 | ✅ MVP | |
| 커스텀 게시판 생성 | 🟦 v2 Core | employment/admin |
| 게시판 성격 설정 | 🟦 v2 Core | 공지형/자료실형/FAQ형/학과형/행사형 |
| 게시판 권한 설정 | 🟦 v2 Core | role/학과/학년 |
| 카테고리 설정 | 🟦 v2 Core | |
| 첨부파일 업로드 | 🟦 v2 Core | 자료실 핵심 |
| 고정글/중요글 | 🟦 v2 Core | |
| 게시판 템플릿 | 🔜 Phase 2 | Notion/Cafe식 |
| 학생 개인 게시판 생성 | 🔜 Phase 2 | |

---

## 7. 학교별 역할/권한 빌더 🆕

| 기능 | 범위 | 비고 |
|---|---|---|
| 기본 역할 조회 | 🟦 v2 Core | student/general/employment/admin/master |
| 학교별 커스텀 역할 생성 | 🟦 v2 Core | 담임교사/취업지원관 등 |
| 역할 표시명/설명 수정 | 🟦 v2 Core | 학교별 명칭 |
| 권한 매트릭스 설정 | 🟦 v2 Core | read/create/update/delete/approve/export |
| 메뉴 노출 설정 | 🟦 v2 Core | 역할별 메뉴 |
| 데이터 범위 설정 | 🟦 v2 Core | 전체/학과/반/본인 |
| 위험 권한 별도 설정 | 🟦 v2 Core | role change/export/delete/API |
| 역할 템플릿 | 🔜 Phase 2 | 학교별 템플릿 |

---

## 8. 알림 / 메시지 발송 🆕

| 기능 | 범위 | 비고 |
|---|---|---|
| 내부 알림 구조 | 🟦 v2 Core | in-app notification |
| 알림 대상 자동 계산 | 🟦 v2 Core | 일정/공고/참여조사/지원상태 |
| 알림 초안 생성 | 🟦 v2 Core | 발송 전 검토 |
| 수동 발송 요청 | 🟦 v2 Core | employment/admin |
| 발송 이력 저장 | 🟦 v2 Core | notificationLogs |
| 알림 템플릿 관리 | 🟦 v2 Core | 문구 재사용 |
| 카카오 알림톡 실제 발송 | 💰 Budget Option | API 계약 후 |
| SMS/LMS 실제 발송 | 💰 Budget Option | API 계약 후 |
| Push/FCM 실제 발송 | 💰 Budget Option | PWA/앱 정책 후 |
| 자동 예약 발송 | 🔜 Phase 2 | 조건 기반 자동화 |
| API Key 프론트/DB 저장 | ❌ 제외 | Secret Manager 사용 |

---

## 9. 명시적 제외/보류

- AI/API 결과 자동 게시: ❌ 제외
- API Key 프론트/DB 저장: ❌ 제외
- 학생 자유게시판 write 기본 허용: ❌ 제외
- 학생 댓글/좋아요 MVP 구현: 🔜 Phase 2
- 앱 푸시/FCM 실제 발송: 💰 Budget Option
- 외부 대기업/공기업 공고 자동 발굴 실제 구현: 🔜 Phase 2
- 자동 예약 메시지 발송: 🔜 Phase 2

---

## 학교별 설정 / 동적 탭 구성 🆕

| 기능 | 범위 | 비고 |
|---|---|---|
| 학교 기본정보 관리 | 🟦 v2 Core | 학교명, 서비스명, 로고 |
| 학과 추가/수정/비활성화 | 🟦 v2 Core | 코드 하드코딩 금지 |
| 학년/반 구조 설정 | 🟦 v2 Core | 학교별 구조 |
| 역할별 메뉴 노출 설정 | 🟦 v2 Core | menuConfig |
| 학과별 산업뉴스 탭 자동 생성 | 🟦 v2 Core | departments 기반 |
| 학과별 뉴스 키워드 설정 | 🟦 v2 Core | department defaultKeywords |
| 주제별 뉴스 키워드 설정 | 🟦 v2 Core | newsTopics |
| 뉴스 소스 설정 | 🟦 v2 Core | newsSources |
| 학생 본인 학과 뉴스 우선 노출 | 🟦 v2 Core | student.department 기반 |
| 교사 담당 학과 뉴스 필터 | 🟦 v2 Core | assignedDepartments 기반 |
| AI 뉴스 학과/주제 자동 태깅 | 🟦 v2 Core | draft/review |
| 학교별 완전 자동 최적화 | 🔜 Phase 2 | 사람이 초기 키워드 세팅 필요 |
