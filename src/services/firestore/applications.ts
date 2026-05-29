import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import type { ApplicationDoc } from "../../types/application";
import { getFirebaseFirestore } from "../firebase/firestore";

export type FetchApplicationsResult =
  | { state: "success"; items: ApplicationDoc[]; path: string }
  | { state: "permission-denied"; path: string; message: string }
  | { state: "unavailable"; path: string; message: string }
  | { state: "error"; path: string; message: string };

function normalizeApplicationDoc(id: string, schoolId: string, value: Record<string, unknown>): ApplicationDoc {
  return {
    applicationId: typeof value.applicationId === "string" && value.applicationId.trim() ? value.applicationId : id,
    schoolId,
    studentId: typeof value.studentId === "string" ? value.studentId : undefined,
    studentName: typeof value.studentName === "string" ? value.studentName : undefined,
    studentDepartment: typeof value.studentDepartment === "string" ? value.studentDepartment : undefined,
    studentGrade: typeof value.studentGrade === "number" || typeof value.studentGrade === "string" ? value.studentGrade : undefined,
    studentClassNo: typeof value.studentClassNo === "number" || typeof value.studentClassNo === "string" ? value.studentClassNo : undefined,
    companyId: typeof value.companyId === "string" ? value.companyId : undefined,
    companyName: typeof value.companyName === "string" ? value.companyName : undefined,
    jobPostingId: typeof value.jobPostingId === "string" ? value.jobPostingId : undefined,
    jobTitle: typeof value.jobTitle === "string" ? value.jobTitle : undefined,
    applicationStatus: typeof value.applicationStatus === "string" ? value.applicationStatus : undefined,
    reviewStatus: typeof value.reviewStatus === "string" ? value.reviewStatus : undefined,
    nextStep: typeof value.nextStep === "string" ? value.nextStep : undefined,
    submittedAt: value.submittedAt,
    memo: typeof value.memo === "string" ? value.memo : undefined,
    status: typeof value.status === "string" ? value.status : undefined,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
  };
}

export async function fetchApplications(schoolId: string): Promise<FetchApplicationsResult> {
  const path = `schools/${schoolId}/applications`;
  const firestore = getFirebaseFirestore();

  if (!firestore) {
    return {
      state: "unavailable",
      path,
      message: "지원 데이터를 읽을 수 있는 Firestore 연결이 준비되지 않았습니다.",
    };
  }

  try {
    const applicationsQuery = query(collection(firestore, path), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(applicationsQuery);

    return {
      state: "success",
      path,
      items: snapshot.docs.map((item) => normalizeApplicationDoc(item.id, schoolId, item.data() as Record<string, unknown>)),
    };
  } catch (error) {
    const firebaseError = error as { code?: unknown };
    const code = typeof firebaseError.code === "string" ? firebaseError.code : "";

    if (code === "permission-denied") {
      return {
        state: "permission-denied",
        path,
        message: "지원 데이터를 읽을 권한이 없어 Firestore rules 확인이 필요합니다.",
      };
    }

    if (code === "failed-precondition" || code === "unavailable") {
      return {
        state: "unavailable",
        path,
        message: "지원 데이터를 읽는 동안 Firestore 연결 상태를 확인해야 합니다.",
      };
    }

    return {
      state: "error",
      path,
      message: "지원 데이터를 불러오지 못했습니다.",
    };
  }
}
