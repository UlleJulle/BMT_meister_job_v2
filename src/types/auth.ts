export type UserRole = "student" | "general_teacher" | "employment_teacher" | "admin";

export type UserStatus = "anonymous" | "pending" | "active" | "suspended";

export type AuthUser = {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  status: Exclude<UserStatus, "anonymous">;
  schoolId: string;
};

export type AuthSession =
  | {
      isAuthenticated: false;
      status: "anonymous";
      user: null;
    }
  | {
      isAuthenticated: true;
      status: Exclude<UserStatus, "anonymous">;
      user: AuthUser;
    };
