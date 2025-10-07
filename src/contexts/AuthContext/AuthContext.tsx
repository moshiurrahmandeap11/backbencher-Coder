import { createContext } from "react";
import { User } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  googleLogin: () => Promise<any>;
  createUser: (email: string, password: string) => Promise<any>;
  loginUser: (email: string, password: string) => Promise<any>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);