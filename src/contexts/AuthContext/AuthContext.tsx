// contexts/AuthContext/AuthContext.tsx - Updated
import { createContext } from "react";
import type { User } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  userRole: string | null;
  userProfile: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  googleLogin: () => Promise<import("firebase/auth").UserCredential>;
  createUser: (email: string, password: string) => Promise<import("firebase/auth").UserCredential>;
  loginUser: (email: string, password: string) => Promise<import("firebase/auth").UserCredential>;
  logOut: () => Promise<void>;
  ForgetPassword: (email: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);