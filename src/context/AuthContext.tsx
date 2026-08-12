/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { ChangeUserPassword, EditUserProfile, loginUser, registerUser } from "@/services/auth";
import {  AuthUser, ChangePasswordData, EditData, LoginData, RegisterData } from "@/types/user";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface AuthContextType {
  user: AuthUser;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  editProfile: (userId: string, data: EditData) => Promise<void>;
  changePassword: (userId: string, data: ChangePasswordData) => Promise<void>,
  updateUser: (updatedData: Partial<AuthUser>) => void,
  logout: () => void;
  isLoading: boolean; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "authUser";

export function AuthProvider({children}: {children: React.ReactNode;}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const isAuthenticated = user !== null;
  const [isLoading, setIsLoading] = useState(false);

  function persistAuthenticatedUser(authUser: AuthUser) {
    setIsLoading(true);
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
        const authUser = await loginUser(data);
        persistAuthenticatedUser(authUser);
    }
    finally {
      setIsLoading(false);
    }
  }

  async function register(data: RegisterData) {
    try {
        const authUser = await registerUser(data);
        persistAuthenticatedUser(authUser);
    }
    finally {
      setIsLoading(false);
    }
  }

  function logout() {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
    }
    finally {
      setIsLoading(false);
    }
  }

  async function editProfile(userId: string, data: EditData) {
    try {
      const authUser = await EditUserProfile(userId, data);
      persistAuthenticatedUser(authUser);
    }
    finally {
      setIsLoading(false);
    }
  }

  async function changePassword(userId: string, data: ChangePasswordData) {
    try {
      const authUser = await ChangeUserPassword(userId, data);
      persistAuthenticatedUser(authUser);
    }
    finally {
      setIsLoading(false);
    }
  }

  function updateUser(updatedData: Partial<AuthUser>) {
    setUser((prev) => {
      if (!prev) return prev;

      const updatedUser = {
        ...prev,
        ...updatedData,
      };

      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(updatedUser)
      );

      return updatedUser;
    });
  }

  return (
    <AuthContext.Provider value={{user, isAuthenticated, login, register, editProfile, updateUser, changePassword, logout, isLoading}}>
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


