/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { AuthUser } from "@/types/user"
import React, { createContext, useState } from "react";

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  register: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode;}) {
  const [user, setUser] = useState<AuthUser>();
}
