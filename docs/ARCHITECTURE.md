# ARCHITECTURE.md

부산기계공업고등학교 취업지원관리 플랫폼 v2 아키텍처 기준 문서.

`AGENTS.md`는 행동 지침만 담당하고, 상세 기준은 이 문서와 `docs/*.md`가 담당한다.

---

## 1. 개발 원칙

- 기존 v1은 삭제하지 않는다.
- v1은 기능 참고, 데이터 참고, 회귀검증 기준으로만 사용한다.
- v2는 `v2/` 하위 별도 Vite 프로젝트로 시작한다.
- v2는 Vite + React + TypeScript + Firebase modular SDK 기준이다.
- v2 primary database는 Cloud Firestore다.
- v1 Realtime Database는 직접 수정하지 않는다.
- 파일 업로드는 Firebase Storage를 사용한다.
- UI는 밝은 SaaS형 학교 취업지원 플랫폼 기준으로 설계한다.
- 디자인 시스템 없이 화면부터 만들지 않는다.
- 기존 UI 위에 CSS만 덧칠하는 방식은 금지한다.

---

## 2. 기술 결정

| 항목 | 결정 |
|---|---|
| Build Tool | Vite |
| UI | React |
| Language | TypeScript |
| Routing | React Router |
| Firebase SDK | Modular SDK |
| DB | Cloud Firestore |
| Storage | Firebase Storage |
| Server State | TanStack Query |
| UI State | Zustand |
| Auth/Role State | Auth Context + `useAuth` / `useRole` |
| Styling | `tokens.css` + `globals.css` + CSS Modules |
| Tailwind/styled-components/Emotion | 사용하지 않음 |

---

## 3. v1/v2 분리

```txt
BMT_meister_job/
├─ index.html, student.html, admin.html, js/, css/   # v1 유지
├─ AGENTS.md
├─ docs/
└─ v2/                                               # 새 React 앱
```

원칙:
- v2 개발 중 v1 파일을 임의로 수정하지 않는다.
- v2는 별도 package/project로 관리한다.
- v1 CSS/HTML/JS를 v2에 그대로 복사하지 않는다.
- v1 Realtime Database는 마이그레이션 참고만 하고 직접 write하지 않는다.

---

## 4. v2 기본 구조

```txt
v2/src/
 ├─ app/
 ├─ layouts/
 ├─ pages/
 ├─ features/
 │   ├─ auth/
 │   ├─ jobs/
 │   ├─ companies/
 │   ├─ applications/
 │   ├─ schedules/
 │   ├─ content/
 │   ├─ surveys/
 │   ├─ boards/
 │   ├─ notifications/
 │   ├─ aiAutomation/
 │   ├─ roleBuilder/
 │   └─ adminSettings/
 ├─ components/
 ├─ services/
 ├─ hooks/
 ├─ stores/
 ├─ types/
 ├─ constants/
 ├─ utils/
 └─ styles/
```

---

## 5. 경계 원칙

- 도메인 경계는 `src/types/`로 관리한다.
- 화면 경계는 `src/features/`로 관리한다.
- 공통 UI는 `src/components/ui/`에 둔다.
- feature 외부에서는 `features/{feature}/index.ts`의 public API만 import한다.
- feature types에서 domain types를 re-export하지 않는다.
- 권한 판단은 role 이름보다 permission code를 우선한다.

---

## 6. 데이터 접근 계층

```txt
Firebase
 ↓
services/{domain}Service.ts
 ↓
features/{feature}/services/{feature}Queries.ts
 ↓
features/{feature}/hooks/use{Feature}.ts
 ↓
features/{feature}/components
```

React 컴포넌트에서 Firebase를 직접 호출하지 않는다.

---

## 7. AI/API 아키텍처

```txt
Frontend
 ↓
Cloud Functions
 ↓
Secret Manager
 ↓
External API / Scraping / AI Model
 ↓
Firestore Draft
 ↓
Employment Teacher Review
 ↓
Approved Publish
```

원칙:
- API Key는 프론트/Firestore/Realtime DB에 저장하지 않는다.
- AI/API 결과는 자동 게시하지 않는다.
- 공고 PDF 분석, 기업 DB 추출, 산업뉴스 수집, 외부공고 발굴은 draft/review 구조를 따른다.
- 외부 API 호출, 스크래핑, AI 분석은 Cloud Functions 경유를 기본으로 한다.

---

## 8. Notification / Messaging 아키텍처

```txt
Schedule / Job / Survey / Application Event
 ↓
Target Resolver
 ↓
Notification Draft
 ↓
Employment Teacher Review
 ↓
Send via Channel
 ↓
Notification Log
```

원칙:
- 내부 알림은 v2 Core에서 구조화한다.
- 카카오 알림톡/SMS/푸시 실제 발송은 예산/API 계약이 필요한 Budget Option이다.
- 메시지 API Key는 프론트/DB에 저장하지 않고 Secret Manager를 사용한다.
- 실제 과금 발송 전 대상 수, 예상 건수, 채널, 확인 modal을 표시한다.
- 발송 이력은 반드시 저장한다.

---

## 9. School Role & Permission Builder 아키텍처

- 시스템 기본 역할은 유지한다.
- 학교별 커스텀 역할을 생성할 수 있다.
- 권한 판단은 역할명 문자열이 아니라 permission code 기준으로 한다.
- 메뉴 노출, 기능 권한, 데이터 범위를 학교별로 설정할 수 있다.
- 위험 권한은 별도 보호하고 audit log를 남긴다.
- 실제 권한 검증은 UI뿐 아니라 route guard, Security Rules, Cloud Functions에서 수행한다.

---

## 10. 금지 패턴

- 기존 v1 파일 임의 수정 금지
- Firebase compat SDK 사용 금지
- v2에서 `window.firebase` 사용 금지
- React 컴포넌트에서 Firebase 직접 호출 금지
- 기존 v1 CSS 복사 금지
- 학생 화면에 작성/수정/삭제 UI 기본 노출 금지
- 모바일 첫 화면을 큰 hero box로 채우는 것 금지
- Tailwind/styled-components/Emotion 사용 금지
- token 없는 임의 색상/간격/radius/shadow 사용 금지
- API Key 프론트/DB 저장 금지
- AI/API 결과 자동 게시 금지
- 카카오/SMS/푸시 실제 발송을 승인 없이 실행 금지
- Phase 2 기능 임의 구현 금지

---

## 학교별 동적 설정 / 하드코딩 금지

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

모든 학교별 차이는 아래 설정에서 읽어와 화면과 기능에 반영한다.

```txt
/schools/{schoolId}
/schools/{schoolId}/settings/siteConfig
/schools/{schoolId}/settings/departmentSettings
/schools/{schoolId}/settings/menuConfig
/schools/{schoolId}/settings/newsSettings
/schools/{schoolId}/settings/aiSettings
/schools/{schoolId}/settings/notificationSettings
/schools/{schoolId}/departments/{departmentId}
/schools/{schoolId}/newsTopics/{topicId}
/schools/{schoolId}/newsSources/{sourceId}
```

화면은 설정을 읽어 동적으로 구성한다.

```txt
school settings
→ departments
→ news topics
→ keywords
→ menu/tabs
→ role permissions
→ rendered UI
```


## 동적 설정 의존성 방향

```txt
Firestore school settings
 ↓
services/configService.ts
 ↓
features/adminSettings/services/settingsQueries.ts
 ↓
hooks/useSchoolConfig / useDepartments / useNewsSettings
 ↓
layouts/pages/features
```

UI 컴포넌트는 학과명/뉴스탭을 직접 알면 안 된다.  
반드시 hook 또는 feature service를 통해 설정값을 받아 렌더링한다.
