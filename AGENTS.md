# BMT Job Platform Codex Instructions

AGENTS.md에 적힌 규칙은 Codex 작업 안전장치이며, 상세 설계 기준은 docs/*.md를 우선한다.

이 파일은 VSCode Codex용 **행동 지침**이다.  
상세 기준은 `docs/*.md`와 `src/styles/tokens.css`로 위임한다.

---

## 1. 반드시 먼저 읽을 기준 문서

작업 전 아래 문서를 확인한다.

1. `docs/ARCHITECTURE.md`
2. `docs/FEATURE_SCOPE.md`
3. `docs/ROLE_PERMISSION.md`
4. `docs/ROUTE_MAP.md`
5. `docs/DATA_MODEL.md`
6. `docs/DESIGN_SYSTEM.md`
7. `docs/SCREEN_FEATURE_MAP.md`
8. `docs/IMPLEMENTATION_TODO.md`
9. `src/styles/tokens.css`

---

## 2. 문서 역할

| 문서 | 역할 |
|---|---|
| `ARCHITECTURE.md` | 코드 구조, 계층, 금지 패턴, AI/API/알림 아키텍처 |
| `FEATURE_SCOPE.md` | 기능 범위와 Phase |
| `ROLE_PERMISSION.md` | 역할별 권한, 커스텀 역할/권한 빌더 |
| `ROUTE_MAP.md` | route, 메뉴, redirect |
| `DATA_MODEL.md` | Firestore/Storage 데이터 모델 |
| `DESIGN_SYSTEM.md` | UI 컴포넌트, 레이아웃, 디자인 규칙 |
| `SCREEN_FEATURE_MAP.md` | 화면/탭별 특색과 주요 기능 |
| `IMPLEMENTATION_TODO.md` | 다음 작업 순서 |
| `tokens.css` | 디자인 token 실제 값 |

AGENTS.md에는 상세 기준을 중복 작성하지 않는다. 기준이 충돌하면 `docs/*.md`를 우선한다.

---

## 3. 작업 원칙

- 기존 v1 파일을 임의로 수정하지 않는다.
- v2 작업 전 기준 문서를 먼저 확인한다.
- 큰 작업을 한 번에 하지 않고 작은 단위로 진행한다.
- 기능 구현 전 `FEATURE_SCOPE.md`에서 Phase를 확인한다.
- 권한은 `ROLE_PERMISSION.md`, route는 `ROUTE_MAP.md`, 데이터는 `DATA_MODEL.md`, UI는 `DESIGN_SYSTEM.md`를 따른다.
- 화면 목적/탭 특색은 `SCREEN_FEATURE_MAP.md`를 따른다.
- 상세 금지 패턴은 `ARCHITECTURE.md`의 금지 패턴 섹션을 따른다.

---

## 4. Phase 판단

| 표기 | 처리 |
|---|---|
| ✅ MVP | 학생 파일럿 전 필수. 명시 요청 시 구현 가능 |
| 🟦 v2 Core | 정식 운영 전 필요. 해당 기능 명시 요청 시 구현 |
| 💰 Budget Option | 예산/API 계약 필요. 구조/placeholder 가능, 실제 발송·과금 기능은 명시 승인 전 금지 |
| 🔜 Phase 2 | 추후 확장. 구현 금지, 설계/placeholder/문서화만 가능 |
| ❌ 제외 | 구현 금지 |

Phase가 불명확하면 구현하지 말고 먼저 보고한다.

---

## 5. 작업 후 보고 형식

1. 기준으로 읽은 문서
2. 수행한 작업
3. 생성/수정한 파일
4. 기존 v1 파일 수정 여부
5. v1 참고 여부와 참고한 파일/범위
6. Firebase/DB/Storage write 여부
7. 외부 API/AI API/메시지 발송 여부
8. 금지 영역 침범 여부
9. 다음 추천 작업

---

## 6. 학교별 동적 설정 원칙

멀티학교 확장을 위해 아래 값은 코드에 하드코딩하지 않는다.

- 학교명
- 서비스명
- 학과명
- 학년/반 구조
- 학생/교사 이메일 형식
- 역할 표시명
- 메뉴 노출
- 산업뉴스 탭
- 학과별 뉴스 키워드
- 주제별 뉴스 키워드
- 외부 API 소스
- 알림 채널 사용 여부
- 게시판/자료실 구성

작업 전 아래 설정 흐름을 확인한다.

- 학교 기본값: `siteConfig`
- 학과/학년/반: `departmentSettings`, `departments`
- 메뉴 노출: `menuConfig`
- 산업뉴스 탭/키워드: `newsSettings`, `newsTopics`, `newsSources`
- 역할/권한: `roles`, `members`
- AI/API/알림: `aiSettings`, `notificationSettings`

학교별 차이는 관리 콘솔에서 수정 가능해야 한다.

구현 원칙:

```txt
school settings
→ departments
→ news topics
→ keywords
→ menu/tabs
→ role permissions
→ rendered UI
```

학생/교사/취업진로부/admin 화면은 설정값을 읽어 동적으로 구성한다.

---

## 7. v1 참고 원칙

기존 v1 프로젝트는 아래 위치에 보존되어 있다.

```txt
D:\BMT_meister_job
```

현재 v2 프로젝트는 아래 위치에서 독립 개발한다.

```txt
D:\BMT_meister_job_v2
```

v2 개발 중 v1은 기본적으로 스캔하지 않는다.

다만 아래 목적이 있을 때만 사용자가 명시한 특정 파일 또는 특정 범위만 참고할 수 있다.

- 기존 기능 동작 확인
- 데이터 구조 확인
- 마이그레이션 비교
- 회귀 기준 확인
- 특정 화면의 기존 selector 또는 함수명 확인

원칙:

- v1 전체 폴더 스캔 금지
- v1 파일 수정 금지
- v1 파일 복사 금지
- v1 CSS/JS를 v2에 그대로 이식 금지
- v1 참고가 필요하면 먼저 “어떤 파일의 어떤 범위를 왜 확인할지” 보고한다.
- 사용자가 허용한 특정 파일/범위만 확인한다.
- v1 참고 후에는 어떤 파일의 어떤 범위를 봤는지 보고한다.

예시:

```txt
허용 가능:
D:\BMT_meister_job\student.html 의 일정 화면 selector만 확인
D:\BMT_meister_job\js\student.js 의 개인 일정 저장 함수명만 확인

금지:
D:\BMT_meister_job 전체 스캔
v1 CSS 전체 복사
v1 JS 로직을 v2에 그대로 이식
```

---

## 8. AI/API/알림 원칙

AI/API 기능은 프론트에서 직접 외부 API를 호출하지 않는다.

기본 흐름:

```txt
Frontend
→ Cloud Functions
→ Secret Manager
→ External API / AI Model / Messaging Provider
→ Firestore Draft or Log
→ Teacher/Admin Review
→ Approved Action
```

원칙:

- API Key를 프론트에 저장하지 않는다.
- API Key를 Firestore/Realtime Database에 저장하지 않는다.
- API Key 원문을 관리 콘솔에 노출하지 않는다.
- Secret Manager에는 실제 secret을 저장한다.
- Firestore에는 secret 이름, 연결 상태, 마지막 테스트 시간 정도만 저장한다.
- AI/API 결과는 자동 게시하지 않는다.
- 공고 PDF 분석, 기업 DB 추출, 산업뉴스 수집, 외부공고 발굴은 draft/review 구조를 따른다.
- 카카오 알림톡/SMS/Push 실제 발송은 Budget Option이며 명시 승인 전 금지한다.
- 실제 과금 발송 전 대상 수, 채널, 예상 발송 건수, 확인 modal이 필요하다.
- 발송 이력은 반드시 저장한다.

---

## 9. 학생 write 범위

학생 화면은 기본적으로 read 중심이다.

학생에게 허용되는 write는 명시된 범위로 제한한다.

허용 범위:

- 본인 개인 일정 생성/수정/삭제
- 관심공고 등록/해제
- 본인 지원 요청/취소
- 참여조사 본인 응답
- 게시판별 설정으로 명시 허용된 경우의 제한적 글쓰기

금지 기본값:

- 학생 화면에 작성/수정/삭제 UI 기본 노출 금지
- 학생 자유게시판 write 기본 허용 금지
- 학생이 공식 일정 수정/삭제 금지
- 학생이 공고/기업/뉴스/게시판 설정 수정 금지

---

## 10. 불확실할 때

아래 상황에서는 임의 구현하지 말고 먼저 보고한다.

- Phase가 불명확할 때
- 권한 기준이 불명확할 때
- route가 문서에 없을 때
- 데이터 모델이 문서에 없을 때
- v1 참고가 필요해 보일 때
- Firebase/DB/Storage write가 필요할 때
- 외부 API 호출이 필요할 때
- API Key/Secret 처리가 필요할 때
- 학생 화면에 write UI가 필요해 보일 때
- Budget Option 기능을 실제로 켜야 할 것처럼 보일 때