# DESIGN_SYSTEM.md

BMT 취업지원관리 시스템 v2의 최상위 UI 디자인 기준이다.

루트의 `DESIGN.md`는 폐기 대상으로 간주하며, 이 문서의 기준으로 사용하지 않는다. `references/DESIGN_*.md` 파일은 외부 제품의 분위기와 구조를 해석하기 위한 참고 자료일 뿐이며, 브랜드명·로고·고유 문구·고유 CTA·시각 패턴을 1:1 복제하지 않는다.

---

## 1. 기준 문서 역할

- 이 문서는 v2 화면, 레이아웃, 컴포넌트, 반응형, 검증 기준의 최상위 디자인 기준이다.
- 실제 색상·간격·radius·shadow 값은 `src/styles/tokens.css`의 semantic token을 우선한다.
- 코드 구현은 CSS Modules를 기본으로 하며 Tailwind, styled-components, Emotion은 사용하지 않는다.
- 화면 목적, 역할별 노출, write 가능 여부는 `SCREEN_FEATURE_MAP.md`, `ROLE_PERMISSION.md`, `FEATURE_SCOPE.md`를 함께 따른다.
- 학교명, 학과명, 역할 표시명, 산업뉴스 탭, 키워드, 메뉴 노출은 하드코딩하지 않고 설정 기반 UI로 확장 가능해야 한다.

---

## 2. 외부 참고 해석

| 참고 문서 | BMT에 반영할 해석 | 복제 금지 |
|---|---|---|
| `DESIGN_notion.md` | warm ivory/off-white 배경, thin warm-gray border, 부드러운 surface, 12px 전후 카드 감각, 차분한 typography | 컬러풀한 일러스트, 고유 CTA, 브랜드 장식 |
| `DESIGN_cal.md` | 로그인·회원가입·비밀번호 찾기 form 구조, input/button spacing, clean SaaS auth layout | 특정 폰트·문구·마케팅 hero |
| `DESIGN_clerk.md` | 인증 UX 흐름, 역할 선택, 승인 대기, 보안감 있는 안내 구조 | 보라색 브랜드, 외부 인증 브랜딩 |
| `DESIGN_linear.md` | compact density, 낮은 시각 소음, 정확한 정렬, hairline border, 불필요한 장식 제거 | dark marketing canvas, 고유 accent |
| `DESIGN_mintlify.md` | 산업뉴스, 게시판, 공지, 상세 읽기 화면의 읽기 밀도와 문서형 레이아웃 | 강한 gradient hero, 개발자 문서 브랜드 패턴 |
| `DESIGN_vercel.md` | 관리자 대시보드, 설정, 상태 카드, 시스템 UI 정밀도, 상태/메타 정보 처리 | mesh gradient, black-pill CTA 남발 |

---

## 3. 최종 디자인 방향

- 학교 홈페이지 느낌과 공공기관 관리자 페이지처럼 딱딱한 느낌을 피한다.
- 전체 분위기는 warm ivory/off-white 배경 위에 얇은 warm-gray border를 얹은 calm SaaS UI다.
- 화면은 compact, calm, precise 해야 하며 큰 hero, 큰 카드, 큰 설명 박스를 반복하지 않는다.
- primary blue는 action, link, selected state, focus ring에만 제한적으로 사용한다.
- 버튼은 neutral/outline 중심이며 primary filled button은 반드시 필요한 주요 action에만 쓴다.
- 정보는 카드보다 list, compact section, small status chip으로 우선 정리한다.
- 학생 화면은 빠른 확인, 지원, 일정 중심이다.
- 일반교사는 read-only 확인 중심이다.
- 취업진로부는 운영, 검토, 관리 중심이다.
- 관리자는 설정, 권한, 시스템 상태 중심이다.

---

## 4. 색상 토큰 원칙

- 모든 색상은 `tokens.css`의 semantic token을 사용한다.
- page background는 `--color-bg-page`를 기본으로 하되, 구현 시 warm ivory/off-white 계열로 조정 가능한 구조를 유지한다.
- surface는 `--color-bg-surface`, subtle panel은 `--color-bg-subtle`, hover는 `--color-bg-hover`를 사용한다.
- border는 `--color-border-default` 또는 `--color-border-subtle`을 사용하며 1px hairline을 기본으로 한다.
- text는 primary/secondary/tertiary 계층을 엄격히 구분한다.
- primary blue는 `--color-primary`, `--color-primary-hover`, `--color-primary-subtle`에 한정한다.
- success/warning/danger는 상태 전달에만 사용하고 장식 색으로 쓰지 않는다.
- 학교별 테마가 필요해도 코드에 hex를 직접 넣지 않고 site 설정 또는 token 확장으로 처리한다.

금지:
- 임의 hex color 반복 사용
- 큰 blue hero, blue filled button 남발
- semantic color를 의미 없이 장식으로 사용
- reference 브랜드 고유 색상을 그대로 도입

---

## 5. 타이포그래피 원칙

- 기본 font stack은 system UI 계열을 사용한다.
- 본문 기본 크기는 `--text-base` 또는 `--text-sm` 중심으로 설계한다.
- 화면 제목은 `--text-xl` 이상을 남발하지 않고, 운영 화면에서는 `--text-lg`와 `--weight-semibold` 중심으로 compact하게 쓴다.
- label, caption, metadata는 `--text-xs` 또는 `--text-sm`로 낮은 시각 소음 상태를 유지한다.
- heading은 600 weight를 기본으로 하고 700 weight는 핵심 페이지 타이틀 등 제한적으로만 쓴다.
- 긴 설명은 두 줄 이내를 기본으로 하며, 반복 설명 박스를 만들지 않는다.
- 학생 화면의 문장은 짧고 직접적이어야 한다.
- 관리자 화면의 문장은 상태, 권한, 영향 범위를 명확히 말해야 한다.

---

## 6. Spacing, Radius, Density

- spacing은 `--space-*` token만 사용한다.
- page padding은 desktop `--layout-content-padding`, mobile `--space-4` 수준을 기준으로 한다.
- section gap은 `--layout-section-gap`보다 과하게 커지지 않게 한다.
- card gap은 `--layout-card-gap`을 기준으로 한다.
- input/button height는 `--size-input-md` 또는 `--size-input-lg`를 사용한다.
- touch target은 최소 `--size-touch-target`을 지킨다.
- button/input radius는 `--radius-sm` 또는 `--radius-md`를 우선한다.
- card radius는 12px 감각을 목표로 하되 현재 token 기준 `--radius-md`와 `--radius-lg` 사이에서 일관되게 사용한다.
- large panel은 `--radius-lg`, modal은 `--radius-lg` 또는 `--radius-xl`까지 허용한다.
- shadow는 `--shadow-xs`, `--shadow-sm` 중심으로 쓰고, heavy shadow는 modal 등 제한된 맥락에만 사용한다.

---

## 7. 컴포넌트 기준

### Button

- 기본 버튼은 neutral 또는 outline이다.
- primary filled button은 로그인 제출, 저장, 승인 등 화면의 단일 주요 action에만 사용한다.
- destructive button은 항상 danger 색상과 confirm UX를 동반한다.
- 같은 화면에 primary button을 여러 개 반복하지 않는다.
- icon-only button은 accessible label을 제공한다.

### Input

- input은 white surface, thin border, compact height를 기본으로 한다.
- focus는 primary color ring 또는 border로 표시한다.
- placeholder는 보조 설명이 아니라 예시 정도로만 사용한다.
- error는 field 아래 짧은 문장으로 표시한다.

### Tab

- auth와 content section은 line-style tab을 우선한다.
- pill tab은 작은 필터나 compact segmented control에만 사용한다.
- active state는 text color와 bottom border 또는 subtle surface로 표현한다.
- tab이 많으면 모바일에서는 horizontal scroll 또는 select/dropdown으로 전환한다.

### Badge

- badge는 상태, 역할, 권한, 마감, 검토 상태를 짧게 표시한다.
- 색상 badge는 의미가 명확할 때만 사용한다.
- 역할 badge는 학교별 역할 표시명 설정을 읽어 렌더링해야 한다.

### Card

- card는 정보를 담는 최소 단위이며 큰 박스 반복을 피한다.
- card header에는 title, short meta, 핵심 action 1개만 둔다.
- 학생 화면 card는 빠른 확인이 가능해야 하며 table 대체 용도로 사용한다.
- 관리자 화면 card는 상태 요약, 설정 그룹, 운영 지표에 사용한다.

### List

- list는 학생·교사 화면의 기본 정보 표현이다.
- row 하나에는 title, meta, status, secondary action 정도만 둔다.
- 날짜, 마감, 상태는 오른쪽 또는 상단 metadata로 정렬한다.
- 모바일에서는 list/card hybrid 형태를 우선한다.

### Table

- table은 취업진로부와 관리자 화면의 대량 관리에만 사용한다.
- 학생 화면에는 table을 기본 사용하지 않는다.
- 일반교사 화면에서도 read-only 확인 목적이 아니면 table을 피한다.
- 모바일 table은 horizontal overflow를 기본 허용하지 말고 card/list로 전환한다.

---

## 8. Auth 화면 기준

- 로그인 화면은 form이 첫 화면에서 바로 보여야 한다.
- desktop은 하나의 split container 안에서 왼쪽은 짧은 브랜드/시스템 설명, 오른쪽은 form으로 구성한다.
- mobile은 상단 브랜드를 짧게 보여준 뒤 즉시 form을 노출한다.
- 모바일에서 설명 패널을 반복하거나 큰 소개 박스를 남기지 않는다.
- 로그인, 회원가입, 비밀번호 찾기는 line-style tab 또는 compact switch로 전환한다.
- 역할 선택은 회원가입 또는 승인 흐름에서 짧고 명확하게 제공한다.
- 승인 대기 화면은 다음 단계, 예상 처리 주체, 문의 경로를 간단히 보여준다.
- 실제 Firebase Auth 연결 전에는 submit을 no-op 또는 placeholder로 둔다.
- 학교명 고정 문구를 남발하지 않고 service name 또는 site config 기반 문구로 구성한다.

---

## 9. Student 화면 기준

- 학생 화면은 빠른 확인, 지원, 일정, 관심 항목 중심이다.
- 첫 화면은 오늘/이번 주 일정, 관심공고, 지원 상태, 공지 요약을 우선한다.
- write UI는 기본 노출하지 않고 허용된 개인 일정, 관심공고, 지원 요청 등 명시 범위에만 둔다.
- table 대신 compact card/list를 사용한다.
- action은 "확인", "관심", "지원 요청", "일정 추가"처럼 짧게 표현한다.
- 산업뉴스는 학과/주제 설정 기반으로 탭과 키워드가 동적으로 구성되어야 한다.
- 학생에게 운영/검토/승인/설정 UI가 보이면 안 된다.

---

## 10. Teacher, Employment Teacher, Admin 화면 기준

### General Teacher

- 일반교사는 read-only 확인 중심이다.
- 담당 학생, 공고, 일정, 공지, 학생 상태를 요약해서 본다.
- 수정/삭제/승인 action은 기본 노출하지 않는다.
- 학생 상세로 이동하더라도 권한 없는 write action은 숨긴다.

### Employment Teacher

- 취업진로부는 운영, 검토, 승인, 게시, 관리 중심이다.
- 공고, 기업, 지원 현황, 게시판, 산업뉴스 draft, 알림 draft를 검토할 수 있다.
- AI/API 결과는 draft/review 상태로만 표시하고 자동 게시처럼 보이면 안 된다.
- table과 bulk action은 이 역할부터 허용하되 confirm, status, log 기준을 유지한다.

### Admin

- 관리자는 설정, 권한, 학교별 동적 구성, 시스템 상태 중심이다.
- 메뉴, 역할, 학과, 뉴스 탭, 키워드, API/알림 설정은 설정 카드와 compact table로 구성한다.
- 위험 권한 변경은 별도 section, confirm modal, audit log 전제를 갖는다.
- Secret/API key 원문은 화면에 노출하지 않는다.
- Firebase/Storage/Functions 연결 상태는 status card로만 표시하고 실제 secret 값은 다루지 않는다.

---

## 11. Mobile Responsive 기준

- 390px viewport에서 horizontal overflow가 없어야 한다.
- 모바일은 bottom navigation과 compact card/list 중심으로 설계한다.
- top-level navigation은 역할별 핵심 메뉴만 노출한다.
- page title, filter, primary action은 한 화면에서 과하게 높이를 차지하지 않게 한다.
- 설명 패널, helper card, onboarding text는 모바일에서 축약하거나 숨긴다.
- form은 한 column이며 input width는 container를 넘지 않는다.
- table은 모바일에서 card/list 또는 accordion으로 전환한다.
- touch target은 44px 이상을 지킨다.

---

## 12. Empty State 기준

- empty state는 작고 조용해야 한다.
- 구성은 title 1줄, description 1~2줄, 필요한 경우 action 1개로 제한한다.
- 학생 화면 empty state는 "아직 등록된 항목이 없습니다"처럼 중립적으로 표현한다.
- 운영 화면 empty state는 다음 action을 명확히 안내한다.
- error state와 empty state를 혼동하지 않는다.
- AI/API/외부공고/알림 placeholder는 실제 동작 가능처럼 보이지 않게 "준비 중", "설정 필요", "검토 후 사용" 상태를 표시한다.

---

## 13. Playwright 캡처 검증 기준

주요 화면 구현 후 가능하면 아래 기준으로 캡처와 런타임 검증을 수행한다.

### Desktop

- `/login`
- 학생 주요 화면
- 공고 목록/상세
- 취업진로부 운영 화면
- 관리자 설정 화면

### Mobile 390px

- `/login`
- 학생 홈
- 학생 공고 목록
- 학생 일정 또는 지원 상태
- 모바일 bottom navigation 포함 화면

### 필수 확인

```txt
document.documentElement.scrollWidth <= window.innerWidth
```

- 흰 화면 없이 렌더링되는지 확인한다.
- 새로고침 후 route가 유지되는지 확인한다.
- console error가 없는지 확인한다.
- 390px에서 가로 overflow가 없는지 확인한다.
- Firebase read/write, DB write, Storage write가 의도치 않게 발생하지 않는지 확인한다.
- placeholder 화면이 실제 기능 완료처럼 보이지 않는지 확인한다.

---

## 14. 금지 패턴

- 학교 홈페이지식 큰 배너, 기관형 컬러 블록, 과도한 공지 박스
- 공공기관 관리자 페이지처럼 딱딱하고 밀도만 높은 UI
- 큰 hero, 큰 card, 큰 설명 박스 반복
- primary blue filled button 남발
- 학생 화면 table 기본 사용
- 학생 화면 운영 write action 기본 노출
- reference 브랜드 로고, 문구, CTA, 고유 색상, 고유 장식 복제
- token 없는 임의 색상·간격·shadow 반복
- Firebase/Auth/DB/Storage write를 디자인 구현 중 연결
- AI/API, 외부공고, 카톡/SMS/Push를 실제 동작 UI처럼 구현

---

## 15. 구현 체크리스트

새 화면을 만들거나 리디자인할 때 아래를 확인한다.

- `tokens.css` semantic token만 사용했는가
- 역할별 권한과 Phase에 맞는 action만 노출했는가
- 학교별 설정값이 하드코딩되지 않았는가
- desktop과 390px mobile에서 모두 overflow가 없는가
- form, list, card, table 중 역할과 화면 목적에 맞는 표현을 골랐는가
- primary blue와 primary button을 제한적으로 사용했는가
- empty/placeholder가 실제 기능처럼 오해되지 않는가
- Playwright 캡처와 console error 확인이 가능한가
