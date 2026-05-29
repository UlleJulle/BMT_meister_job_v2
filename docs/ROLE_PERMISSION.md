# ROLE_PERMISSION.md

??븷蹂?read/write/action 沅뚰븳 湲곗?. 湲곕낯? deny-first.

---

## 1. ??븷 援ъ“

湲곕낯 ?쒖뒪????븷:
- `anonymous`
- `pending`
- `student`
- `general_teacher`
- `employment_teacher`
- `admin`
- `master`

?숆탳蹂?而ㅼ뒪? ??븷:
- ?숆탳 愿由ъ옄媛 ?앹꽦 媛??- ?? ?댁엫援먯궗, 痍⑥뾽吏?먭?, ?숆낵遺?? ?고븰?묐젰 ?대떦, 蹂댁“愿由ъ옄
- 沅뚰븳 ?먮떒? role ?대쫫???꾨땲??permission code 湲곗?

---

## 2. 沅뚰븳 肄붾뱶 ?덉떆

| ?곸뿭 | 沅뚰븳 |
|---|---|
| jobs | read, create, update, archive, delete, approve |
| companies | read, create, update, archive, delete |
| students | read, update, export |
| applications | read, updateStatus, export |
| recommendations | read, approve, reject |
| schedules | read, create, update, delete |
| personalSchedules | readSelf, createSelf, updateSelf, deleteSelf |
| content | read, create, update, delete, approve |
| boards | read, createPost, updatePost, deletePost, manageBoard, managePermission |
| surveys | read, create, update, close, reopen, export |
| ai | run, reviewDraft, approveDraft, manageSources, manageSettings |
| notifications | read, createDraft, send, manageTemplates, manageSettings |
| admin | manageUsers, manageRoles, manageAuthSettings, manageSiteConfig |
| audit | read, export |

---

## 3. ?숈깮 媛쒖씤 ?쇱젙

| 湲곕뒫 | student | general_teacher | employment_teacher | admin | master |
|---|---:|---:|---:|---:|---:|
| 怨듭떇 ?쇱젙 議고쉶 | R | R | R | R | R |
| 怨듭떇 ?쇱젙 ?깅줉/?섏젙/??젣 | - | - | C/U/D | C/U/D | C/U/D |
| 媛쒖씤 ?쇱젙 議고쉶 | R 蹂몄씤 | - | - | - | - |
| 媛쒖씤 ?쇱젙 ?앹꽦 | C 蹂몄씤 | - | - | - | - |
| 媛쒖씤 ?쇱젙 ?섏젙 | U 蹂몄씤 | - | - | - | - |
| 媛쒖씤 ?쇱젙 ??젣 | D 蹂몄씤 | - | - | - | - |

---

## 4. 梨꾩슜怨듦퀬/吏??異붿쿇

| 湲곕뒫 | student | general_teacher | employment_teacher | admin | master |
|---|---:|---:|---:|---:|---:|
| 怨듦퀬 議고쉶 | R | R | R | R | R |
| 愿?ш났怨?C/U/D | 蹂몄씤 | - | - | - | - |
| 怨듦퀬 ?깅줉/?섏젙/蹂닿? | - | - | C/U | C/U | C/U |
| 怨듦퀬 hard delete | - | - | - | ?쒗븳 | D |
| 蹂몄씤 吏???붿껌/痍⑥냼 | C/U/D 蹂몄씤 | - | - | - | - |
| 吏?먯옄 紐⑸줉/?곹깭 蹂寃?| - | R ?쒗븳 | R/U | R/U | R/U |
| 異붿쿇 ?붿껌 | C 蹂몄씤 | - | - | - | - |
| 異붿쿇 ?뱀씤/諛섎젮 | - | - | A | A | A |

---

## 5. 肄섑뀗痢?寃뚯떆???먮즺??
| 湲곕뒫 | student | general_teacher | employment_teacher | admin | master |
|---|---:|---:|---:|---:|---:|
| ?곗뾽?댁뒪/怨듭?/?먮즺??議고쉶 | R | R | R | R | R |
| 肄섑뀗痢??깅줉/?섏젙/??젣 | - | - | C/U/D | C/U/D | D |
| 而ㅼ뒪? 寃뚯떆??議고쉶 | R ???| R ???| R | R | R |
| 寃뚯떆???앹꽦/?깃꺽 ?ㅼ젙 | - | - | C/U | C/U | M |
| 寃뚯떆??沅뚰븳 ?ㅼ젙 | - | - | ?쒗븳 | U | M |
| ?숈깮 寃뚯떆湲 ?묒꽦 | 議곌굔遺 | - | - | - | - |

?숈깮 write??寃뚯떆?먮퀎 ?ㅼ젙?먯꽌 紐낆떆 ?덉슜???뚮쭔 媛?ν븯??

---

## 6. AI/API

| 湲곕뒫 | student | general_teacher | employment_teacher | admin | master |
|---|---:|---:|---:|---:|---:|
| AI 怨듦퀬/湲곗뾽/?댁뒪 遺꾩꽍 ?ㅽ뻾 | - | - | C | C | C |
| AI Draft 議고쉶/?섏젙 | - | - | R/U | R/U | R/U |
| AI Draft ?뱀씤/寃뚯떆 | - | - | A | A | A |
| AI/API ?ㅼ젙 愿由?| - | - | - | M | M |
| ?몃?怨듦퀬 ?섏쭛/寃??| - | - | ?뵜 | ?뵜 | ?뵜 |

?숈깮? ?뱀씤 寃뚯떆??寃곌낵留?蹂????덈떎.

---

## 7. ?뚮┝/硫붿떆吏 沅뚰븳

| 湲곕뒫 | student | general_teacher | employment_teacher | admin | master |
|---|---:|---:|---:|---:|---:|
| 蹂몄씤 ?뚮┝ 議고쉶 | R 蹂몄씤 | R 蹂몄씤 | R 蹂몄씤 | R 蹂몄씤 | R 蹂몄씤 |
| ?뚮┝ ???議고쉶 | - | R ?쒗븳 | R | R | R |
| ?뚮┝ 珥덉븞 ?앹꽦 | - | - | C | C | C |
| ?대? ?뚮┝ 諛쒖넚 | - | - | C | C | C |
| 移댄넚/SMS/Push 諛쒖넚 | - | - | ?뮥 | ?뮥 | ?뮥 |
| 諛쒖넚 ?대젰 議고쉶 | - | - | R | R | R |
| ?뚮┝ ?쒗뵆由?愿由?| - | - | C/U | C/U | C/U |
| ?뚮┝ API ?ㅼ젙 愿由?| - | - | - | M | M |

?ㅼ젣 怨쇨툑 諛쒖넚? ?덉궛/API 怨꾩빟 諛?紐낆떆 ?뱀씤 ??湲덉?.

---

## 8. ??븷/沅뚰븳 鍮뚮뜑

| 湲곕뒫 | employment_teacher | admin | master |
|---|---:|---:|---:|
| ??븷 紐⑸줉 議고쉶 | R | R | R |
| 而ㅼ뒪? ??븷 ?앹꽦 | - | C | C |
| ??븷 ?쒖떆紐??ㅻ챸 ?섏젙 | - | U | U |
| 沅뚰븳 留ㅽ듃由?뒪 ?섏젙 | - | U | M |
| 硫붾돱 ?묎렐 ?섏젙 | - | U | M |
| ?곗씠??踰붿쐞 ?ㅼ젙 | - | U | M |
| ?꾪뿕 沅뚰븳 遺??| - | ?쒗븳 | M |
| ?쒖뒪????븷 ??젣 | - | - | - |

---

## 9. ?꾪뿕 ?묒뾽

?꾪뿕 ?묒뾽? confirm modal + audit log ?꾩슂:
- role 蹂寃?- hard delete
- authSettings/siteConfig 蹂寃?- 寃뚯떆??沅뚰븳 蹂寃?- ?뚯씪 ??젣
- 媛쒖씤?뺣낫 export
- 硫붿떆吏 ???諛쒖넚
- AI/API ?ㅼ젙 蹂寃?
---

## ?숆탳蹂??ㅼ젙 沅뚰븳

| 湲곕뒫 | student | general_teacher | employment_teacher | admin | master |
|---|---:|---:|---:|---:|---:|
| ?숆탳 湲곕낯?뺣낫 議고쉶 | R | R | R | R | R |
| ?숆탳 湲곕낯?뺣낫 ?섏젙 | - | - | - | U | M |
| ?숆낵/?숇뀈/諛??ㅼ젙 議고쉶 | R | R | R | R | R |
| ?숆낵/?숇뀈/諛??ㅼ젙 ?섏젙 | - | - | ?쒗븳 | U | M |
| ?댁뒪 ???ㅼ젙 議고쉶 | R ???| R ???| R | R | R |
| ?댁뒪 ???ㅼ젙 ?섏젙 | - | - | U | U | M |
| ?숆낵蹂??댁뒪 ?ㅼ썙???섏젙 | - | - | U | U | M |
| ?댁뒪 ?뚯뒪 ?ㅼ젙 ?섏젙 | - | - | ?쒗븳 | U | M |
| 硫붾돱 ?몄텧 ?ㅼ젙 ?섏젙 | - | - | - | U | M |

?먯튃:
- ?숈깮? ?먯떊???숆낵? 怨듦컻 ????댁뒪??쓣 蹂????덈떎.
- ?쇰컲援먯궗???대떦/?덉슜 踰붿쐞 ?댁뒪??쓣 蹂????덈떎.
- 痍⑥뾽吏꾨줈遺???댁뒪 ?ㅼ썙?쒖? 二쇱젣 ?ㅼ젙???댁쁺?????덈떎.
- admin/master???숆탳蹂??ㅼ젙 ?꾩껜瑜?愿由ы븳??

---

## ?숈깮 怨듦퀬 沅뚰븳 硫붾え

- 梨꾩슜怨듦퀬 `read` 沅뚰븳? ?숈깮 ???숇뀈 怨듯넻 沅뚰븳?쇰줈 蹂몃떎.
- ?ㅻ쭔 ?ㅼ젣 吏??異붿쿇/?댁쁺 愿由??먮쫫? 3?숇뀈 以묒떖?대ŉ, 2?숇뀈? ?뱀콈 ???쇰? 耳?댁뒪留??덉슜?쒕떎.
- ?숇뀈 ?꾪꽣 ?쒖떆??`1?숇뀈 / 2?숇뀈 / 3?숇뀈`??湲곕낯?쇰줈 ?섍퀬, `?뱀콈`??蹂꾨룄 ?띿꽦/?꾪꽣濡?遺꾨━?쒕떎.

---

## 湲곗뾽DB ?댁쁺 硫붾え

- 痍⑥뾽吏꾨줈遺? 愿由ъ옄 ?붾㈃??湲곗뾽DB??`李몄뿬湲곗뾽 / ?좊룄湲곗뾽 / ?쇰컲湲곗뾽` 援щ텇???④퍡 蹂몃떎.
- ?대떦 援щ텇? ?꾩옣?ㅼ뒿 ???뺤떇 洹쇰줈怨꾩빟 ?꾪솚 ?쒖젏 ?먮떒???ъ슜?섎뒗 ?댁쁺 湲곗??대떎.
- 怨듦퀬, 吏?먰쁽?? ?숈깮 諛곗튂 ?먮떒 ?붾㈃?먯꽌??媛숈? 湲곗???李몄“?쒕떎.

---

## Auth / role routing 사전 설계 메모

- 실제 Firebase/Auth 연결 전에는 `docs/AUTH_ROLE_ROUTING_PLAN.md`를 기준으로 role별 접근 route를 먼저 고정한다.
- 1차 기본 정책:
  - `student` -> `/student/*`
  - `general_teacher` -> `/teacher/*`
  - `employment_teacher` -> `/employment/*`
  - `admin` -> `/admin/*`
- 취업진로부 화면은 기본적으로 `employment_teacher` 이상 접근 기준으로 본다.
- 일반교사는 취업진로부 운영 화면이 아니라 `/teacher/*` read-only 범위만 사용한다.
- 실제 route guard, custom claims, redirect, security rules 연결은 후속 구현 차수에서 진행한다.

## Role source 메모

- 초기 role 판단은 Firebase Auth custom claims보다 `users/{uid}` 계열 user doc을 우선 source로 사용한다.
- 이유는 학교별/학년별/학과별/승인 상태를 함께 관리하기 쉽기 때문이다.
- custom claims는 `employment_teacher`, `admin` 같은 고권한 역할을 security rules에서 더 강하게 enforcement할 때 후순위로 검토한다.
- 프론트 route guard와 별개로 Firestore / Realtime DB / Storage security rules에서도 같은 role 기준을 적용해야 한다.

## User doc / 상태 전이 메모

- 초기 사용자 정보와 role/status 판단은 `users/{uid}` user doc을 기준으로 읽는다.
- `status`는 `pending / active / suspended`를 기본으로 둔다.
- `anonymous`는 로그인 전 상태로 user doc 바깥 상태다.
- role별 home route:
  - `student` -> `/student`
  - `general_teacher` -> `/teacher`
  - `employment_teacher` -> `/employment`
  - `admin` -> `/admin`
- 실제 권한 enforcement는 route guard와 별개로 security rules에서 다시 강제해야 한다.

## users / members 역할 분담 메모

- 초기 route guard 기준 문서는 `users/{uid}`다.
- `schools/{schoolId}/members/{uid}`는 학교 단위 소속/범위/세부 권한 기준 문서다.
- 실제 DB 접근 권한 enforcement는 `members` 문서와 security rules 기준으로 다시 맞춘다.
- `suspended` 상태 사용자는 role과 관계없이 `/suspended` 제한 화면으로 보내는 정책을 기본으로 둔다.

## Firestore rules draft 메모

- users/{uid} 본인 read, school-scoped read 범위, role별 write 예정 범위 초안은 docs/FIRESTORE_RULES_DRAFT.md를 기준으로 본다.
- 이번 단계에서는 rules를 Firebase Console에 배포하지 않고 draft로만 유지한다.

## 2026-05-29 ?꾩옱 read-only 沅뚰븳 硫붾え

- `student`
  - `/student/*` ?묎렐
  - `/employment`, `/teacher`, `/admin` ?묎렐 ??`/student` redirect
  - 痍⑥뾽吏꾨줈遺 employment ?댁쁺 ?붾㈃ ?묎렐 遺덇?
- `general_teacher`
  - `/teacher/*` ?묎렐
  - `/employment`, `/student`, `/admin` ?묎렐 ??`/teacher` redirect
  - teacher shell? ?꾩옱 read-only smoke test ?듦낵
- `employment_teacher`
  - `/employment/*` ?묎렐
  - `/student`, `/teacher`, `/admin` ?묎렐 ??`/employment` redirect
  - ?꾨옒 4媛?Firestore read-only ?붾㈃ live 寃利??듦낵
    - `jobPostings`
    - `companies`
    - `students`
    - `applications`
- `admin`
  - `/admin` ?묎렐
  - `/employment`, `/teacher`, `/student` ?묎렐 ??`/admin` redirect
  - ?꾩옱 援ы쁽??role 媛믪? `admin`, ?좏깮?곸쑝濡?`adminLevel: master`瑜??④퍡 ?????덈떎

Firestore read-only 沅뚰븳 硫붾え:

- `users/{uid}`: 蹂몄씤 read留??덉슜, write false
- `jobPostings`: `student / general_teacher / employment_teacher / admin` read ?덉슜, write false
- `companies`: `employment_teacher / admin` read ?덉슜, write false
- `students`: `employment_teacher / admin` read ?덉슜, write false
- `applications`: `employment_teacher / admin` read ?덉슜, write false

