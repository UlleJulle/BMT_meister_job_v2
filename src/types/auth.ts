export type UserRole = "student" | "general_teacher" | "employment_teacher" | "admin";

export type UserStatus = "anonymous" | "pending" | "active" | "suspended";

export type AuthSessionState =
  | "loading"
  | "anonymous"
  | "authenticated_user_doc_loading"
  | "pending"
  | "active"
  | "suspended"
  | "error";

export type AuthUserBase = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

export type AuthUser = AuthUserBase & {
  role: UserRole;
  status: Exclude<UserStatus, "anonymous">;
  schoolId: string;
};

export type AuthSession =
  | {
      state: "loading";
      isAuthenticated: false;
      status: "anonymous";
      user: null;
    }
  | {
      state: "anonymous";
      isAuthenticated: false;
      status: "anonymous";
      user: null;
    }
  | {
      state: "authenticated_user_doc_loading";
      isAuthenticated: false;
      status: "anonymous";
      user: null;
      authUser: AuthUserBase;
    }
  | {
      state: "pending";
      isAuthenticated: true;
      status: "pending";
      user: AuthUserBase;
      reason: "missing_user_doc" | "invalid_user_doc" | "pending_status";
    }
  | {
      state: "active";
      isAuthenticated: true;
      status: "active";
      user: AuthUser;
    }
  | {
      state: "suspended";
      isAuthenticated: true;
      status: "suspended";
      user: AuthUserBase & Partial<Pick<AuthUser, "role" | "schoolId">>;
    }
  | {
      state: "error";
      isAuthenticated: false;
      status: "anonymous";
      user: null;
      code:
        | "firebase_not_configured"
        | "auth_unavailable"
        | "firestore_unavailable"
        | "user_doc_read_failed";
      message: string;
    };
