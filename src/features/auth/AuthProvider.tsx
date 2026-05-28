import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { onAuthStateChanged, type User as FirebaseUser } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore/lite";
import { getFirebaseAuth } from "../../services/firebase/auth";
import { getFirebaseFirestore } from "../../services/firebase/firestore";
import { getFirebaseStatus } from "../../services/firebase/firebaseApp";
import type { AuthSession, AuthUser, AuthUserBase, UserRole, UserStatus } from "../../types/auth";
import { AuthSessionContext } from "./AuthSessionContext";

type AuthProviderProps = {
  children: ReactNode;
};

type UserDocShape = {
  role?: unknown;
  status?: unknown;
  schoolId?: unknown;
};

function warnAuth(message: string, details?: Record<string, unknown>) {
  if (!import.meta.env.DEV) {
    return;
  }

  if (details) {
    console.warn(`[auth] ${message}`, details);
    return;
  }

  console.warn(`[auth] ${message}`);
}

function errorAuth(message: string, details?: Record<string, unknown>) {
  if (!import.meta.env.DEV) {
    return;
  }

  if (details) {
    console.error(`[auth] ${message}`, details);
    return;
  }

  console.error(`[auth] ${message}`);
}

function getMaskedUid(uid: string) {
  return uid.length <= 6 ? uid : `…${uid.slice(-6)}`;
}

function toAuthUserBase(user: FirebaseUser): AuthUserBase {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
}

function isUserRole(value: unknown): value is UserRole {
  return value === "student" || value === "general_teacher" || value === "employment_teacher" || value === "admin";
}

function isUserStatus(value: unknown): value is UserStatus {
  return value === "pending" || value === "active" || value === "suspended";
}

function buildSessionFromUserDoc(baseUser: AuthUserBase, userDoc: UserDocShape | undefined): AuthSession {
  if (!userDoc) {
    warnAuth("users/{uid} document not found", {
      uid: getMaskedUid(baseUser.uid),
    });

    return {
      state: "pending",
      isAuthenticated: true,
      status: "pending",
      user: baseUser,
      reason: "missing_user_doc",
    };
  }

  const { role, schoolId, status } = userDoc;

  if (!isUserRole(role) || !isUserStatus(status) || typeof schoolId !== "string" || !schoolId.trim()) {
    warnAuth("users/{uid} document has invalid shape", {
      uid: getMaskedUid(baseUser.uid),
      hasRole: isUserRole(role),
      hasStatus: isUserStatus(status),
      hasSchoolId: typeof schoolId === "string" && Boolean(schoolId.trim()),
    });

    return {
      state: "pending",
      isAuthenticated: true,
      status: "pending",
      user: baseUser,
      reason: "invalid_user_doc",
    };
  }

  if (status === "pending") {
    return {
      state: "pending",
      isAuthenticated: true,
      status: "pending",
      user: baseUser,
      reason: "pending_status",
    };
  }

  if (status === "suspended") {
    return {
      state: "suspended",
      isAuthenticated: true,
      status: "suspended",
      user: {
        ...baseUser,
        role,
        schoolId,
      },
    };
  }

  const activeUser: AuthUser = {
    ...baseUser,
    role,
    status: "active",
    schoolId,
  };

  return {
    state: "active",
    isAuthenticated: true,
    status: "active",
    user: activeUser,
  };
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<AuthSession>(() => {
    if (getFirebaseStatus().state !== "ready") {
      return {
        state: "error",
        isAuthenticated: false,
        status: "anonymous",
        user: null,
        code: "firebase_not_configured",
        message: "Firebase 설정이 없어 로그인 기능을 사용할 수 없습니다.",
      };
    }

    return {
      state: "loading",
      isAuthenticated: false,
      status: "anonymous",
      user: null,
    };
  });

  useEffect(() => {
    if (getFirebaseStatus().state !== "ready") {
      warnAuth("firebase status is not ready");
      return undefined;
    }

    const auth = getFirebaseAuth();

    if (!auth) {
      errorAuth("firebase auth service unavailable");
      setSession({
        state: "error",
        isAuthenticated: false,
        status: "anonymous",
        user: null,
        code: "auth_unavailable",
        message: "인증 서비스를 사용할 수 없습니다.",
      });
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setSession({
          state: "anonymous",
          isAuthenticated: false,
          status: "anonymous",
          user: null,
        });
        return;
      }

      const baseUser = toAuthUserBase(firebaseUser);
      setSession({
        state: "authenticated_user_doc_loading",
        isAuthenticated: false,
        status: "anonymous",
        user: null,
        authUser: baseUser,
      });

      const firestore = getFirebaseFirestore();

      if (!firestore) {
        errorAuth("firebase firestore service unavailable", {
          uid: getMaskedUid(firebaseUser.uid),
        });
        setSession({
          state: "error",
          isAuthenticated: false,
          status: "anonymous",
          user: null,
          code: "firestore_unavailable",
          message: "사용자 문서를 읽을 수 없습니다.",
        });
        return;
      }

      try {
        const userDocSnapshot = await getDoc(doc(firestore, "users", firebaseUser.uid));
        const userDoc = userDocSnapshot.exists() ? (userDocSnapshot.data() as UserDocShape) : undefined;
        setSession(buildSessionFromUserDoc(baseUser, userDoc));
      } catch (error) {
        const firebaseError = error as { code?: unknown; name?: unknown; message?: unknown };
        errorAuth("users/{uid} read failed", {
          uid: getMaskedUid(firebaseUser.uid),
          code: typeof firebaseError.code === "string" ? firebaseError.code : undefined,
          name: typeof firebaseError.name === "string" ? firebaseError.name : undefined,
          message: typeof firebaseError.message === "string" ? firebaseError.message : undefined,
        });
        setSession({
          state: "error",
          isAuthenticated: false,
          status: "anonymous",
          user: null,
          code: "user_doc_read_failed",
          message: "사용자 상태를 확인할 수 없습니다.",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => session, [session]);

  return <AuthSessionContext.Provider value={value}>{children}</AuthSessionContext.Provider>;
}

