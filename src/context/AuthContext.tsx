/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { loginUser, registerUser } from "@/services/auth";
import { AuthUser, LoginData, RegisterData } from "@/types/user"
import React, { createContext, useContext, useEffect, useState } from "react";

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode;}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const isAuthenticated = user !== null;
  const [isLoading, setIsLoading] = useState(false);
  const AUTH_STORAGE_KEY = "authUser";

  function persistAuthenticatedUser(authUser: AuthUser) {
    setUser(authUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
  }

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
    
    if(!storedUser) return;

    const parsedUser: AuthUser = JSON.parse(storedUser);
    setUser(parsedUser);

    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  async function login(data: LoginData) {
    try {
      setIsLoading(true);
      const authUser = await loginUser(data);

      persistAuthenticatedUser(authUser);
    }
    finally {
      setIsLoading(false);
    }
  }

  async function register(data: RegisterData) {
    try {
      setIsLoading(true);
      const authUser = await registerUser(data);

      persistAuthenticatedUser(authUser);
    }
    finally {
      setIsLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, login, register, logout, isLoading}}>
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


