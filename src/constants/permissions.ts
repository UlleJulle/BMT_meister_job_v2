export const permissionDomains = [
  "jobs",
  "companies",
  "students",
  "applications",
  "recommendations",
  "schedules",
  "personalSchedules",
  "content",
  "boards",
  "surveys",
  "ai",
  "notifications",
  "admin",
  "audit",
] as const;

export const permissionActions = [
  "read",
  "create",
  "update",
  "delete",
  "archive",
  "approve",
  "reject",
  "export",
  "send",
  "manageSettings",
] as const;

export type PermissionDomain = (typeof permissionDomains)[number];
export type PermissionAction = (typeof permissionActions)[number];
