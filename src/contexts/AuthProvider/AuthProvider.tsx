// contexts/AuthProvider/AuthProvider.tsx - Updated
import React, { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import type { AuthContextType } from "../AuthContext/AuthContext";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import axiosInstance from "../../hooks/AxiosInstance/AxiosInstance";

interface AuthProviderProps {
  children: React.ReactNode;
}

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Fetch user profile from backend
  const fetchUserProfile = async (uid: string) => {
    try {
      const response = await axiosInstance.get(`/users/${uid}`);
      const userData = response.data.data;
      setUserProfile(userData);
      setUserRole(userData.role || 'user');
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserRole('user'); // Default role
    }
  };

  const refreshUserProfile = async () => {
    if (user) {
      await fetchUserProfile(user.uid);
    }
  };

  // google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // create user
  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user
  const loginUser = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // user logout 
  const logOut = () => {
    setLoading(true);
    setUserRole(null);
    setUserProfile(null);
    return signOut(auth);
  }

  // forget password
  const ForgetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  }

  // onauth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        await fetchUserProfile(currentUser.uid);
      } else {
        setUserRole(null);
        setUserProfile(null);
      }
      
      setLoading(false);
      console.log(currentUser);
    })
    return () => unsubscribe();
  }, [])

  const userInfo: AuthContextType = {
    user,
    loading,
    userRole,
    userProfile,
    setLoading,
    googleLogin,
    createUser,
    loginUser,
    logOut,
    ForgetPassword,
    refreshUserProfile,
  };
  
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;