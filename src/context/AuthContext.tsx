/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { AuthUser } from "@/types/user"
import React, { createContext, useContext, useReducer, useState } from "react";

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  register: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode;}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const isAuthenticated = user !== null;

  async function login() {

  }

  async function register() {

  }

  function logout() {
    
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  if(!context){
    throw new Error("useAuth must be used inside AuthProvider");
  }
  
  return context;
}

