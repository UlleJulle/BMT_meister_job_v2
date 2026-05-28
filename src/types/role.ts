import type { PermissionAction, PermissionDomain } from "../constants/permissions";

export type SystemRole =
  | "anonymous"
  | "pending"
  | "student"
  | "general_teacher"
  | "employment_teacher"
  | "admin"
  | "master";

export type PermissionMatrix = Partial<
  Record<PermissionDomain, Partial<Record<PermissionAction, boolean>>>
>;

export type DataScope = {
  students: "self" | "assignedClass" | "department" | "all";
  jobs: "all";
  schedules: "all" | "targeted";
};

export type RoleDoc = {
  roleId: string;
  schoolId: string;
  name: string;
  displayName: string;
  description?: string;
  type: "system" | "custom";
  isSystemRole: boolean;
  isEditable: boolean;
  permissions: PermissionMatrix;
  menuAccess: string[];
  dataScope: DataScope;
  createdAt?: unknown;
  updatedAt?: unknown;
  createdBy?: string;
  updatedBy?: string;
};

export type MemberDoc = {
  uid: string;
  schoolId: string;
  roleIds: string[];
  primaryRoleId: string;
  status: "active" | "pending" | "disabled";
  assignedDepartments?: string[];
  assignedClasses?: string[];
  permissionsSnapshot?: PermissionMatrix;
  updatedAt?: unknown;
};
