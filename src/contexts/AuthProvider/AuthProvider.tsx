import React, { useEffect, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import type { AuthContextType } from "../AuthContext/AuthContext";
import type { User } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

interface AuthProviderProps {
  children: React.ReactNode;
}

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

//   login user
const loginUser = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
}

// user logout 
const logOut = () => {
    setLoading(true);
    return signOut(auth);
}

// onauth state change
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        setLoading(false);
        console.log(currentUser);
    })
    return () => unsubscribe();
}, [])

  const userInfo: AuthContextType = {
    user,
    loading,
    googleLogin,
    createUser,
    loginUser,
    logOut,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
