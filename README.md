# BMT Job Platform v2 Docs Final

부산기계공업고등학교 취업지원관리 플랫폼 v2 기준 문서 묶음입니다.

## 포함 파일

```txt
AGENTS.md
docs/
  ARCHITECTURE.md
  FEATURE_SCOPE.md
  ROLE_PERMISSION.md
  ROUTE_MAP.md
  DATA_MODEL.md
  DESIGN_SYSTEM.md
  SCREEN_FEATURE_MAP.md
  IMPLEMENTATION_TODO.md
src/styles/
  tokens.css
```

## 이번 최종본 반영 내용

- AGENTS.md는 행동 지침 중심으로 정리하고 상세 기준은 docs/*.md로 위임
- 학생 개인 일정 커스터마이징 반영
- AI/API 기반 공고 PDF 분석, 기업 DB 추출, 산업뉴스 자동 수집 반영
- 대기업/공기업 외부 채용정보 발굴 구상 반영
- 커스텀 게시판/자료실 빌더 반영
- 학교별 커스텀 역할/권한 빌더 반영
- 카톡/SMS/푸시/내부알림 메시징 모듈 반영
- Phase 경계 강화: MVP / v2 Core / Budget Option / Phase 2 / Exclude

---

## Revision 03 반영 내용

- 학교별 학과/뉴스탭/주제/키워드 동적 설정 구조 추가
- 학과명·뉴스탭·역할명·메뉴노출 하드코딩 금지 원칙 추가
- 관리 콘솔에서 학교별 departments/newsTopics/newsSources/menuConfig를 수정하는 구조 반영
- 학생/교사/취업진로부 화면이 학교 설정을 읽어 탭과 필터를 자동 구성하도록 문서화
