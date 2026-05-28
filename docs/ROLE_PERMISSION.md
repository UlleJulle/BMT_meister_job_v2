# ROLE_PERMISSION.md

역할별 read/write/action 권한 기준. 기본은 deny-first.

---

## 1. 역할 구조

기본 시스템 역할:
- `anonymous`
- `pending`
- `student`
- `general_teacher`
- `employment_teacher`
- `admin`
- `master`

학교별 커스텀 역할:
- 학교 관리자가 생성 가능
- 예: 담임교사, 취업지원관, 학과부장, 산학협력 담당, 보조관리자
- 권한 판단은 role 이름이 아니라 permission code 기준

---

## 2. 권한 코드 예시

| 영역 | 권한 |
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

## 3. 학생 개인 일정

| 기능 | student | general_teacher | employment_teacher | admin | master |
|---|---:|---:|---:|---:|---:|
| 공식 일정 조회 | R | R | R | R | R |
| 공식 일정 등록/수정/삭제 | - | - | C/U/D | C/U/D | C/U/D |
| 개인 일정 조회 | R 본인 | - | - | - | - |
| 개인 일정 생성 | C 본인 | - | - | - | - |
| 개인 일정 수정 | U 본인 | - | - | - | - |
| 개인 일정 삭제 | D 본인 | - | - | - | - |

---

## 4. 채용공고/지원/추천

| 기능 | student | general_teacher | employment_teacher | admin | master |
|---|---:|---:|---:|---:|---:|
| 공고 조회 | R | R | R | R | R |
| 관심공고 C/U/D | 본인 | - | - | - | - |
| 공고 등록/수정/보관 | - | - | C/U | C/U | C/U |
| 공고 hard delete | - | - | - | 제한 | D |
| 본인 지원 요청/취소 | C/U/D 본인 | - | - | - | - |
| 지원자 목록/상태 변경 | - | R 제한 | R/U | R/U | R/U |
| 추천 요청 | C 본인 | - | - | - | - |
| 추천 승인/반려 | - | - | A | A | A |

---

## 5. 콘텐츠/게시판/자료실

| 기능 | student | general_teacher | employment_teacher | admin | master |
|---|---:|---:|---:|---:|---:|
| 산업뉴스/공지/자료실 조회 | R | R | R | R | R |
| 콘텐츠 등록/수정/삭제 | - | - | C/U/D | C/U/D | D |
| 커스텀 게시판 조회 | R 대상 | R 대상 | R | R | R |
| 게시판 생성/성격 설정 | - | - | C/U | C/U | M |
| 게시판 권한 설정 | - | - | 제한 | U | M |
| 학생 게시글 작성 | 조건부 | - | - | - | - |

학생 write는 게시판별 설정에서 명시 허용될 때만 가능하다.

---

## 6. AI/API

| 기능 | student | general_teacher | employment_teacher | admin | master |
|---|---:|---:|---:|---:|---:|
| AI 공고/기업/뉴스 분석 실행 | - | - | C | C | C |
| AI Draft 조회/수정 | - | - | R/U | R/U | R/U |
| AI Draft 승인/게시 | - | - | A | A | A |
| AI/API 설정 관리 | - | - | - | M | M |
| 외부공고 수집/검토 | - | - | 🔜 | 🔜 | 🔜 |

학생은 승인 게시된 결과만 볼 수 있다.

---

## 7. 알림/메시지 권한

| 기능 | student | general_teacher | employment_teacher | admin | master |
|---|---:|---:|---:|---:|---:|
| 본인 알림 조회 | R 본인 | R 본인 | R 본인 | R 본인 | R 본인 |
| 알림 대상 조회 | - | R 제한 | R | R | R |
| 알림 초안 생성 | - | - | C | C | C |
| 내부 알림 발송 | - | - | C | C | C |
| 카톡/SMS/Push 발송 | - | - | 💰 | 💰 | 💰 |
| 발송 이력 조회 | - | - | R | R | R |
| 알림 템플릿 관리 | - | - | C/U | C/U | C/U |
| 알림 API 설정 관리 | - | - | - | M | M |

실제 과금 발송은 예산/API 계약 및 명시 승인 전 금지.

---

## 8. 역할/권한 빌더

| 기능 | employment_teacher | admin | master |
|---|---:|---:|---:|
| 역할 목록 조회 | R | R | R |
| 커스텀 역할 생성 | - | C | C |
| 역할 표시명/설명 수정 | - | U | U |
| 권한 매트릭스 수정 | - | U | M |
| 메뉴 접근 수정 | - | U | M |
| 데이터 범위 설정 | - | U | M |
| 위험 권한 부여 | - | 제한 | M |
| 시스템 역할 삭제 | - | - | - |

---

## 9. 위험 작업

위험 작업은 confirm modal + audit log 필요:
- role 변경
- hard delete
- authSettings/siteConfig 변경
- 게시판 권한 변경
- 파일 삭제
- 개인정보 export
- 메시지 대량 발송
- AI/API 설정 변경

---

## 학교별 설정 권한

| 기능 | student | general_teacher | employment_teacher | admin | master |
|---|---:|---:|---:|---:|---:|
| 학교 기본정보 조회 | R | R | R | R | R |
| 학교 기본정보 수정 | - | - | - | U | M |
| 학과/학년/반 설정 조회 | R | R | R | R | R |
| 학과/학년/반 설정 수정 | - | - | 제한 | U | M |
| 뉴스 탭 설정 조회 | R 대상 | R 대상 | R | R | R |
| 뉴스 탭 설정 수정 | - | - | U | U | M |
| 학과별 뉴스 키워드 수정 | - | - | U | U | M |
| 뉴스 소스 설정 수정 | - | - | 제한 | U | M |
| 메뉴 노출 설정 수정 | - | - | - | U | M |

원칙:
- 학생은 자신의 학과와 공개 대상 뉴스탭을 볼 수 있다.
- 일반교사는 담당/허용 범위 뉴스탭을 볼 수 있다.
- 취업진로부는 뉴스 키워드와 주제 설정을 운영할 수 있다.
- admin/master는 학교별 설정 전체를 관리한다.

---

## 학생 공고 권한 메모

- 채용공고 `read` 권한은 학생 전 학년 공통 권한으로 본다.
- 다만 실제 지원/추천/운영 관리 흐름은 3학년 중심이며, 2학년은 특채 등 일부 케이스만 허용한다.
- 학년 필터 표시는 `1학년 / 2학년 / 3학년`을 기본으로 하고, `특채`는 별도 속성/필터로 분리한다.

---

## 기업DB 운영 메모

- 취업진로부와 관리자 화면의 기업DB는 `참여기업 / 선도기업 / 일반기업` 구분을 함께 본다.
- 해당 구분은 현장실습 후 정식 근로계약 전환 시점 판단에 사용하는 운영 기준이다.
- 공고, 지원현황, 학생 배치 판단 화면에서도 같은 기준을 참조한다.
