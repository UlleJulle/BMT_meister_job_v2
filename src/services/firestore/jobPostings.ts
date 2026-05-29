import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import { getFirebaseFirestore } from "../firebase/firestore";
import type { JobPostingDoc } from "../../types/jobPosting";

type FetchJobPostingsResult =
  | { state: "success"; items: JobPostingDoc[]; path: string }
  | { state: "permission-denied"; path: string; message: string }
  | { state: "unavailable"; path: string; message: string }
  | { state: "error"; path: string; message: string };

function normalizeJobPostingDoc(id: string, schoolId: string, value: Record<string, unknown>): JobPostingDoc {
  return {
    jobId: typeof value.jobId === "string" && value.jobId.trim() ? value.jobId : id,
    schoolId,
    companyName: typeof value.companyName === "string" ? value.companyName : undefined,
    title: typeof value.title === "string" ? value.title : undefined,
    departmentTags: Array.isArray(value.departmentTags)
      ? value.departmentTags.filter((item): item is string => typeof item === "string")
      : undefined,
    jobType: typeof value.jobType === "string" ? value.jobType : undefined,
    employmentType: typeof value.employmentType === "string" ? value.employmentType : undefined,
    deadlineAt: value.deadlineAt,
    status: typeof value.status === "string" ? value.status : undefined,
    visibility: typeof value.visibility === "string" ? value.visibility : undefined,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
    sourceType: typeof value.sourceType === "string" ? value.sourceType : undefined,
    memo: typeof value.memo === "string" ? value.memo : undefined,
  };
}

export type { FetchJobPostingsResult };

export async function fetchJobPostings(schoolId: string): Promise<FetchJobPostingsResult> {
  const path = `schools/${schoolId}/jobPostings`;
  const firestore = getFirebaseFirestore();

  if (!firestore) {
    return {
      state: "unavailable",
      path,
      message: "공고 데이터를 읽을 수 있는 Firestore 연결이 준비되지 않았습니다.",
    };
  }

  try {
    const jobPostingsQuery = query(collection(firestore, path), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(jobPostingsQuery);

    return {
      state: "success",
      path,
      items: snapshot.docs.map((item) => normalizeJobPostingDoc(item.id, schoolId, item.data() as Record<string, unknown>)),
    };
  } catch (error) {
    const firebaseError = error as { code?: unknown; message?: unknown };
    const code = typeof firebaseError.code === "string" ? firebaseError.code : "";

    if (code === "permission-denied") {
      return {
        state: "permission-denied",
        path,
        message: "공고 데이터를 읽을 권한이 없어 Firestore rules 확인이 필요합니다.",
      };
    }

    if (code === "failed-precondition" || code === "unavailable") {
      return {
        state: "unavailable",
        path,
        message: "공고 데이터를 읽는 동안 Firestore 연결 상태를 확인해야 합니다.",
      };
    }

    return {
      state: "error",
      path,
      message: "공고 데이터를 불러오지 못했습니다.",
    };
  }
}
