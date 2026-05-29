import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import type { CompanyDoc } from "../../types/company";
import { getFirebaseFirestore } from "../firebase/firestore";

export type FetchCompaniesResult =
  | { state: "success"; items: CompanyDoc[]; path: string }
  | { state: "permission-denied"; path: string; message: string }
  | { state: "unavailable"; path: string; message: string }
  | { state: "error"; path: string; message: string };

function normalizeCompaniesDoc(id: string, schoolId: string, value: Record<string, unknown>): CompanyDoc {
  return {
    companyId: typeof value.companyId === "string" && value.companyId.trim() ? value.companyId : id,
    schoolId,
    companyName: typeof value.companyName === "string" ? value.companyName : undefined,
    companySize: typeof value.companySize === "string" ? value.companySize : undefined,
    trainingType: typeof value.trainingType === "string" ? value.trainingType : undefined,
    relatedJobs: Array.isArray(value.relatedJobs)
      ? value.relatedJobs.filter((item): item is string => typeof item === "string")
      : undefined,
    recentPostingTitle: typeof value.recentPostingTitle === "string" ? value.recentPostingTitle : undefined,
    hiringHistory: typeof value.hiringHistory === "string" ? value.hiringHistory : undefined,
    salary: typeof value.salary === "string" ? value.salary : undefined,
    militaryService: typeof value.militaryService === "string" ? value.militaryService : undefined,
    dormitory: typeof value.dormitory === "string" ? value.dormitory : undefined,
    relationshipStatus: typeof value.relationshipStatus === "string" ? value.relationshipStatus : undefined,
    memo: typeof value.memo === "string" ? value.memo : undefined,
    status: typeof value.status === "string" ? value.status : undefined,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
  };
}

export async function fetchCompanies(schoolId: string): Promise<FetchCompaniesResult> {
  const path = `schools/${schoolId}/companies`;
  const firestore = getFirebaseFirestore();

  if (!firestore) {
    return {
      state: "unavailable",
      path,
      message: "기업 데이터를 읽을 수 있는 Firestore 연결이 준비되지 않았습니다.",
    };
  }

  try {
    const companiesQuery = query(collection(firestore, path), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(companiesQuery);

    return {
      state: "success",
      path,
      items: snapshot.docs.map((item) => normalizeCompaniesDoc(item.id, schoolId, item.data() as Record<string, unknown>)),
    };
  } catch (error) {
    const firebaseError = error as { code?: unknown };
    const code = typeof firebaseError.code === "string" ? firebaseError.code : "";

    if (code === "permission-denied") {
      return {
        state: "permission-denied",
        path,
        message: "기업 데이터를 읽을 권한이 없어 Firestore rules 확인이 필요합니다.",
      };
    }

    if (code === "failed-precondition" || code === "unavailable") {
      return {
        state: "unavailable",
        path,
        message: "기업 데이터를 읽는 동안 Firestore 연결 상태를 확인해야 합니다.",
      };
    }

    return {
      state: "error",
      path,
      message: "기업 데이터를 불러오지 못했습니다.",
    };
  }
}
