export type FirebaseConnectionState = "not_configured" | "ready";

export type FirebaseServiceStatus = {
  state: FirebaseConnectionState;
  projectId?: string;
};

export type FirebaseWriteMode = "disabled" | "enabled";
