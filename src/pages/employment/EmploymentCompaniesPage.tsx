import { useEffect, useMemo, useState } from "react";
import { useAuthSession } from "../../features/auth/useAuthSession";
import {
  companyDepartmentFilters,
  companyHiringFilters,
  companyScaleFilters,
  companyTrainingFilters,
} from "../../mocks/employmentCompanies";
import { defaultSchoolId } from "../../services/configService";
import { fetchCompanies, type FetchCompaniesResult } from "../../services/firestore/companies";
import type { CompanyDoc, CompanyTone, EmploymentCompanyListItem } from "../../types/company";
import styles from "./EmploymentCompaniesPage.module.css";

function Badge({
  children,
  tone,
}: {
  children: string;
  tone: CompanyTone;
}) {
  return (
    <span className={`${styles.badge} ${styles[tone]}`.trim()}>
      <span aria-hidden="true" />
      {children}
    </span>
  );
}

function getTrainingTone(trainingType: CompanyDoc["trainingType"]): CompanyTone {
  if (trainingType === "참여기업") {
    return "warning";
  }

  if (trainingType === "선도기업") {
    return "info";
  }

  return "default";
}

function getRelationshipTone(relationshipStatus: CompanyDoc["relationshipStatus"]): CompanyTone {
  if (relationshipStatus === "공고 진행") {
    return "success";
  }

  if (relationshipStatus === "접촉 필요") {
    return "warning";
  }

  if (relationshipStatus === "최근 채용") {
    return "neutral";
  }

  return "default";
}

function toCompanyItem(item: CompanyDoc): EmploymentCompanyListItem {
  return {
    id: item.companyId,
    name: item.companyName?.trim() || "기업명 확인 필요",
    scale: item.companySize?.trim() || "규모 확인 필요",
    trainingType: item.trainingType?.trim() || "구분 확인 필요",
    trainingTone: getTrainingTone(item.trainingType),
    relatedJobs: item.relatedJobs?.length ? item.relatedJobs.join(" · ") : "직무 확인 필요",
    recentPostingTitle: item.recentPostingTitle?.trim() || "최근 공고 확인 필요",
    hiringHistory: item.hiringHistory?.trim() || "채용 이력 확인 필요",
    salary: item.salary?.trim() || "급여 확인 필요",
    militaryService: item.militaryService?.trim() || "확인 필요",
    dormitory: item.dormitory?.trim() || "확인 필요",
    relationshipStatus: item.relationshipStatus?.trim() || "상태 확인 필요",
    relationshipTone: getRelationshipTone(item.relationshipStatus),
    memo: item.memo?.trim() || "관리 메모 확인 필요",
  };
}

function createSummaryItems(items: CompanyDoc[]) {
  const activeCount = items.filter((item) => item.status === "active").length;
  const participantCount = items.filter((item) => item.trainingType === "참여기업").length;
  const leaderCount = items.filter((item) => item.trainingType === "선도기업").length;
  const contactCount = items.filter((item) => item.relationshipStatus === "접촉 필요").length;

  return [
    { label: "전체", value: `${items.length}곳` },
    { label: "운영 중", value: `${activeCount}곳` },
    { label: "참여", value: `${participantCount}곳` },
    { label: "선도", value: `${leaderCount}곳` },
    { label: "접촉", value: `${contactCount}곳` },
  ];
}

type CompaniesLoadState =
  | { state: "loading" }
  | { state: "success"; path: string; items: CompanyDoc[] }
  | { state: "empty"; path: string }
  | { state: "permission-denied"; path: string; message: string }
  | { state: "unavailable"; path: string; message: string }
  | { state: "error"; path: string; message: string };

function toLoadState(result: FetchCompaniesResult): CompaniesLoadState {
  if (result.state === "success") {
    return result.items.length
      ? { state: "success", path: result.path, items: result.items }
      : { state: "empty", path: result.path };
  }

  return result;
}

export function EmploymentCompaniesPage() {
  const session = useAuthSession();
  const [loadState, setLoadState] = useState<CompaniesLoadState>({ state: "loading" });

  const schoolId = useMemo(() => {
    if (session.state === "active" && session.user.schoolId.trim()) {
      return session.user.schoolId;
    }

    return defaultSchoolId || "bmt";
  }, [session]);

  useEffect(() => {
    let isMounted = true;

    setLoadState({ state: "loading" });

    fetchCompanies(schoolId).then((result) => {
      if (!isMounted) {
        return;
      }

      setLoadState(toLoadState(result));
    });

    return () => {
      isMounted = false;
    };
  }, [schoolId]);

  const summaryItems = useMemo(() => {
    if (loadState.state === "success") {
      return createSummaryItems(loadState.items);
    }

    return createSummaryItems([]);
  }, [loadState]);

  const companies = useMemo(() => {
    if (loadState.state !== "success") {
      return [];
    }

    return loadState.items.map(toCompanyItem);
  }, [loadState]);

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>취업진로부</p>
          <h1 className={styles.title}>기업DB</h1>
          <p className={styles.description}>채용 이력과 현장실습 전환 기준을 함께 관리합니다.</p>
        </div>
      </header>

      <section aria-label="기업 요약" className={styles.summaryGrid}>
        {summaryItems.map((item) => (
          <article className={styles.summaryCard} key={item.label}>
            <span className={styles.summaryLabel}>{item.label}</span>
            <strong className={styles.summaryValue}>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className={styles.controlSection} aria-labelledby="employment-companies-controls">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="employment-companies-controls">
              조회 조건
            </h2>
            <p className={styles.sectionDescription}>기업 규모와 현장실습 구분을 함께 보고 학생 배치 판단에 활용합니다.</p>
          </div>
        </div>

        <div className={styles.searchRow}>
          <label className={styles.searchField}>
            <span className={styles.searchLabel}>기업 검색</span>
            <input type="text" value="기업명, 직무, 담당자" readOnly aria-label="기업 검색" />
          </label>
        </div>

        <div className={styles.filterGroups}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>기업 규모</span>
            <div className={styles.filterRow}>
              {companyScaleFilters.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={index === 0}
                  className={`${styles.filterChip} ${index === 0 ? styles.activeFilterChip : ""}`.trim()}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>현장실습</span>
            <div className={styles.filterRow}>
              {companyTrainingFilters.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={index === 0}
                  className={`${styles.filterChip} ${index === 0 ? styles.activeFilterChip : ""}`.trim()}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>채용 상태</span>
            <div className={styles.filterRow}>
              {companyHiringFilters.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={index === 0}
                  className={`${styles.filterChip} ${index === 0 ? styles.activeFilterChip : ""}`.trim()}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>관련 학과</span>
            <div className={styles.filterRow}>
              {companyDepartmentFilters.map((item, index) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={index === 0}
                  className={`${styles.filterChip} ${index === 0 ? styles.activeFilterChip : ""}`.trim()}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.listSection} aria-labelledby="employment-companies-list">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle} id="employment-companies-list">
              기업 운영 목록
            </h2>
            <p className={styles.sectionDescription}>참여기업과 선도기업 구분, 채용 조건, 관리 메모를 한 화면에서 비교합니다.</p>
          </div>
        </div>

        {loadState.state === "loading" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>기업 데이터를 불러오는 중입니다.</strong>
            <p className={styles.stateDescription}>`schools/{'{'}schoolId{'}'}/companies` 읽기 결과를 확인하고 있습니다.</p>
          </div>
        ) : null}

        {loadState.state === "permission-denied" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>기업 데이터를 읽을 권한이 없습니다.</strong>
            <p className={styles.stateDescription}>{loadState.message}</p>
            <p className={styles.stateMeta}>경로: {loadState.path}</p>
          </div>
        ) : null}

        {loadState.state === "unavailable" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>Firestore 연결을 확인해 주세요.</strong>
            <p className={styles.stateDescription}>{loadState.message}</p>
            <p className={styles.stateMeta}>경로: {loadState.path}</p>
          </div>
        ) : null}

        {loadState.state === "error" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>기업 데이터를 불러오지 못했습니다.</strong>
            <p className={styles.stateDescription}>{loadState.message}</p>
            <p className={styles.stateMeta}>경로: {loadState.path}</p>
          </div>
        ) : null}

        {loadState.state === "empty" ? (
          <div className={styles.stateCard}>
            <strong className={styles.stateTitle}>등록된 기업이 아직 없습니다.</strong>
            <p className={styles.stateDescription}>Firestore read는 성공했지만 `companies` 컬렉션에 표시할 데이터가 없습니다.</p>
            <p className={styles.stateMeta}>경로: {loadState.path}</p>
          </div>
        ) : null}

        {loadState.state === "success" ? (
          <>
            <p className={styles.stateMeta}>읽은 경로: {loadState.path}</p>

            <div className={styles.tableShell}>
              <div className={styles.tableHeader} role="row">
                <span>기업명</span>
                <span>구분</span>
                <span>관련 직무</span>
                <span>채용 요약</span>
                <span>근무 조건</span>
                <span>관리 상태</span>
                <span>상세</span>
              </div>

              <div className={styles.tableBody}>
                {companies.map((company) => (
                  <article className={styles.tableRow} key={company.id}>
                    <strong className={styles.companyName}>{company.name}</strong>
                    <div className={styles.stackCell}>
                      <span className={styles.muted}>{company.scale}</span>
                      <Badge tone={company.trainingTone}>{company.trainingType}</Badge>
                    </div>
                    <span>{company.relatedJobs}</span>
                    <div className={styles.stackCell}>
                      <span className={styles.muted}>{company.recentPostingTitle}</span>
                      <span className={styles.muted}>{company.hiringHistory}</span>
                    </div>
                    <span className={styles.muted}>
                      {company.salary} · 병특 {company.militaryService} · 기숙사 {company.dormitory}
                    </span>
                    <div className={styles.stackCell}>
                      <Badge tone={company.relationshipTone}>{company.relationshipStatus}</Badge>
                      <span className={styles.muted}>{company.memo}</span>
                    </div>
                    <div className={styles.inlineActionCell}>
                      <button className={styles.primaryAction} type="button">
                        상세 확인
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.cardList}>
              {companies.map((company) => (
                <article className={styles.companyCard} key={`${company.id}-mobile`}>
                  <div className={styles.cardTop}>
                    <div className={styles.identityBlock}>
                      <strong className={styles.companyName}>{company.name}</strong>
                      <span className={styles.scale}>{company.scale}</span>
                    </div>
                    <Badge tone={company.trainingTone}>{company.trainingType}</Badge>
                  </div>

                  <div className={styles.metaBlock}>
                    <span>{company.relatedJobs}</span>
                    <span>{company.recentPostingTitle}</span>
                    <span>{company.hiringHistory}</span>
                    <span className={styles.conditionsText}>
                      {company.salary} · 병특 {company.militaryService} · 기숙사 {company.dormitory}
                    </span>
                  </div>

                  <div className={styles.cardFooter}>
                    <Badge tone={company.relationshipTone}>{company.relationshipStatus}</Badge>
                    <p className={styles.note}>{company.memo}</p>
                  </div>

                  <div className={styles.actionRow}>
                    <button className={styles.primaryAction} type="button">
                      상세 확인
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
