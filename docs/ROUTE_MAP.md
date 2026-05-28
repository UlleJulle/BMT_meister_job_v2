# ROUTE_MAP.md

v2 Route / Menu / Navigation 기준.

---

## 1. Route Groups

```txt
/login
/signup
/reset-password
/pending
/student/*
/teacher/*
/employment/*
/admin/*
```

---

## 2. Student

| Route | Phase | 설명 |
|---|---:|---|
| `/student` | ✅ | 홈 |
| `/student/jobs` | ✅ | 채용공고 |
| `/student/jobs/:jobId` | ✅ | 공고 상세 |
| `/student/favorites` | ✅ | 관심공고 |
| `/student/applications` | ✅ | 내 지원현황 |
| `/student/schedules` | ✅ | 공식+개인 일정 |
| `/student/content/news` | ✅ | 산업뉴스 |
| `/student/content/board` | ✅ | 게시판/공지 |
| `/student/content/resources` | ✅ | 자료실 |
| `/student/boards` | 🟦 | 커스텀 게시판 |
| `/student/surveys` | ✅ | 참여조사 |
| `/student/profile` | ✅ | 내 정보 |

Mobile bottom nav: 홈 / 공고 / 일정 / 콘텐츠 / 더보기

---

## 3. General Teacher

| Route | Phase | 설명 |
|---|---:|---|
| `/teacher` | 🟦 | 대시보드 |
| `/teacher/students` | 🟦 | 학생현황 read-only |
| `/teacher/jobs` | 🟦 | 공고 read-only |
| `/teacher/schedules` | 🟦 | 일정 read-only |
| `/teacher/content` | 🟦 | 콘텐츠/자료실 read-only |

---

## 4. Employment Teacher

| Route | Phase | 설명 |
|---|---:|---|
| `/employment` | 🟦 | 운영 대시보드 |
| `/employment/jobs` | 🟦 | 채용공고 운영 |
| `/employment/companies` | 🟦 | 기업 DB |
| `/employment/applications` | 🟦 | 지원현황 |
| `/employment/recommendations` | 🟦 | 추천/승인 |
| `/employment/students` | 🟦 | 학생현황 |
| `/employment/schedules` | 🟦 | 공식 일정 관리 |
| `/employment/content/news` | 🟦 | 산업뉴스 관리 |
| `/employment/boards` | 🟦 | 게시판/자료실 관리 |
| `/employment/surveys` | 🟦 | 행사/참여조사 |
| `/employment/notifications` | 🟦 | 알림/메시지 초안/발송 |
| `/employment/ai-import` | 🟦 | PDF/텍스트 공고/기업 분석 |
| `/employment/ai-drafts` | 🟦 | AI draft 검토 |
| `/employment/news-drafts` | 🟦 | AI 뉴스 draft |
| `/employment/company-import` | 🟦 | 기업 DB 자동 추출 |
| `/employment/external-jobs` | 🔜 | 외부공고 발굴 |
| `/employment/reports` | 🔜 | 리포트/export |

---

## 5. Admin

| Route | Phase | 설명 |
|---|---:|---|
| `/admin` | 🟦 | 대시보드 |
| `/admin/school` | 🟦 | 학교 설정 |
| `/admin/auth` | 🟦 | 인증/회원가입 |
| `/admin/users` | 🟦 | 사용자 |
| `/admin/roles` | 🟦 | 학교별 역할/권한 빌더 |
| `/admin/permissions` | 🟦 | 권한 매트릭스 |
| `/admin/boards` | 🟦 | 게시판 설정 |
| `/admin/notifications` | 🟦 | 알림 설정/이력 |
| `/admin/notification-settings` | 💰 | 카톡/SMS/Push 설정 상태 |
| `/admin/ai-settings` | 🟦 | AI/API 설정 상태 |
| `/admin/system` | 🟦 | 시스템 |
| `/admin/audit` | 🟦 | 변경 이력 |
| `/admin/external-sources` | 🔜 | 외부 소스 관리 |

---

## 6. Redirect

| Role | Default |
|---|---|
| anonymous | `/login` |
| pending | `/pending` |
| student | `/student` |
| general_teacher | `/teacher` |
| employment_teacher | `/employment` |
| admin/master | `/admin` |

Phase 2 route는 구현 금지, placeholder만 가능하다.

---

## 학교별 동적 설정 Routes

| Route | Phase | 설명 |
|---|---:|---|
| `/admin/departments` | 🟦 | 학과/학년/반 관리 |
| `/admin/menu-config` | 🟦 | 역할별 메뉴 노출 설정 |
| `/admin/news-settings` | 🟦 | 산업뉴스 탭/키워드/소스 설정 |
| `/admin/news-topics` | 🟦 | 주제별 키워드 관리 |
| `/employment/news-settings` | 🟦 | 취업진로부 뉴스 운영 설정 |
| `/employment/news-drafts` | 🟦 | AI 수집 뉴스 draft 검토 |

학생/교사/취업진로부의 뉴스 메뉴는 하드코딩된 route 목록이 아니라 `newsSettings`, `departments`, `newsTopics`를 읽어 탭/필터를 구성한다.
