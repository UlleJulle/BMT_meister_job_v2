import { createContext } from "react";
import type { AuthSession } from "../../types/auth";

export const AuthSessionContext = createContext<AuthSession | null>(null);
