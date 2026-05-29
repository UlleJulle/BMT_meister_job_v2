import { collection, getDocs, orderBy, query } from "firebase/firestore/lite";
import type { StudentDoc } from "../../types/student";
import { getFirebaseFirestore } from "../firebase/firestore";

export type FetchStudentsResult =
  | { state: "success"; items: StudentDoc[]; path: string }
  | { state: "permission-denied"; path: string; message: string }
  | { state: "unavailable"; path: string; message: string }
  | { state: "error"; path: string; message: string };

function normalizeStudentDoc(id: string, schoolId: string, value: Record<string, unknown>): StudentDoc {
  return {
    studentId: typeof value.studentId === "string" && value.studentId.trim() ? value.studentId : id,
    uid: typeof value.uid === "string" ? value.uid : undefined,
    schoolId,
    name: typeof value.name === "string" ? value.name : undefined,
    grade: typeof value.grade === "number" || typeof value.grade === "string" ? value.grade : undefined,
    classNo: typeof value.classNo === "number" || typeof value.classNo === "string" ? value.classNo : undefined,
    department: typeof value.department === "string" ? value.department : undefined,
    studentNo: typeof value.studentNo === "number" || typeof value.studentNo === "string" ? value.studentNo : undefined,
    specialTrack: typeof value.specialTrack === "string" ? value.specialTrack : undefined,
    desiredJob: typeof value.desiredJob === "string" ? value.desiredJob : undefined,
    employmentStatus: typeof value.employmentStatus === "string" ? value.employmentStatus : undefined,
    applicationStatus: typeof value.applicationStatus === "string" ? value.applicationStatus : undefined,
    assignedTeacherName: typeof value.assignedTeacherName === "string" ? value.assignedTeacherName : undefined,
    recentApplicationSummary: typeof value.recentApplicationSummary === "string" ? value.recentApplicationSummary : undefined,
    memo: typeof value.memo === "string" ? value.memo : undefined,
    status: typeof value.status === "string" ? value.status : undefined,
    createdAt: value.createdAt,
    updatedAt: value.updatedAt,
  };
}

export async function fetchStudents(schoolId: string): Promise<FetchStudentsResult> {
  const path = `schools/${schoolId}/students`;
  const firestore = getFirebaseFirestore();

  if (!firestore) {
    return {
      state: "unavailable",
      path,
      message: "학생 데이터를 읽을 수 있는 Firestore 연결이 준비되지 않았습니다.",
    };
  }

  try {
    const studentsQuery = query(collection(firestore, path), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(studentsQuery);

    return {
      state: "success",
      path,
      items: snapshot.docs.map((item) => normalizeStudentDoc(item.id, schoolId, item.data() as Record<string, unknown>)),
    };
  } catch (error) {
    const firebaseError = error as { code?: unknown };
    const code = typeof firebaseError.code === "string" ? firebaseError.code : "";

    if (code === "permission-denied") {
      return {
        state: "permission-denied",
        path,
        message: "학생 데이터를 읽을 권한이 없어 Firestore rules 확인이 필요합니다.",
      };
    }

    if (code === "failed-precondition" || code === "unavailable") {
      return {
        state: "unavailable",
        path,
        message: "학생 데이터를 읽는 동안 Firestore 연결 상태를 확인해야 합니다.",
      };
    }

    return {
      state: "error",
      path,
      message: "학생 데이터를 불러오지 못했습니다.",
    };
  }
}
