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

// Local Storage Keys
const LOCAL_STORAGE_KEYS = {
  USER_PROFILE: 'bb_user_profile',
  USER_ROLE: 'bb_user_role',
  LAST_SYNC: 'bb_last_sync',
  USER_DATA: 'bb_user_data'
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
    const [isInitialized, setIsInitialized] = useState(false); // ✅ New state

  // Save user data to localStorage
  const syncUserDataToLocalStorage = (userData: any) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_PROFILE, JSON.stringify(userData));
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ROLE, userData.role || 'user');
      localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify({
        uid: userData.uid,
        name: userData.name,
        email: userData.email,
        age: userData.age,
        profileimage: userData.profileimage,
        coverphoto: userData.coverphoto,
        role: userData.role,
        createdat: userData.createdat,
        updatedat: userData.updatedat
      }));
      console.log('✅ User data synced to localStorage');
    } catch (error) {
      console.error('❌ Error syncing to localStorage:', error);
    }
  };

  // Clear localStorage data
  const clearLocalStorageData = () => {
    try {
      Object.values(LOCAL_STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      console.log('✅ LocalStorage data cleared');
    } catch (error) {
      console.error('❌ Error clearing localStorage:', error);
    }
  };

  // Load user data from localStorage
  const loadUserDataFromLocalStorage = () => {
    try {
      const storedProfile = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_PROFILE);
      const storedRole = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ROLE);
      // const storedData = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);

      if (storedProfile && storedRole) {
        setUserProfile(JSON.parse(storedProfile));
        setUserRole(storedRole);
        console.log('✅ User data loaded from localStorage');
        return true;
      }
    } catch (error) {
      console.error('❌ Error loading from localStorage:', error);
    }
    return false;
  };

  // Check if data is stale (older than 1 hour)
  const isDataStale = () => {
    try {
      const lastSync = localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_SYNC);
      if (!lastSync) return true;
      
      const lastSyncTime = new Date(lastSync).getTime();
      const currentTime = new Date().getTime();
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
      
      return (currentTime - lastSyncTime) > oneHour;
    } catch {
      return true;
    }
  };

  // Fetch user profile from backend
  const fetchUserProfile = async (uid: string, forceRefresh = false) => {
    // Try to load from localStorage first if not forcing refresh
    if (!forceRefresh && !isDataStale()) {
      const hasLocalData = loadUserDataFromLocalStorage();
      if (hasLocalData) {
        return;
      }
    }

    try {
      console.log('🔄 Fetching fresh user data from server...');
      const response = await axiosInstance.get(`/users/${uid}`);
      const userData = response.data.data;
      
      setUserProfile(userData);
      setUserRole(userData.role || 'user');
      
      // Sync to localStorage
      syncUserDataToLocalStorage(userData);
      
    } catch (error) {
      console.error('❌ Error fetching user profile:', error);
      
      // Fallback to localStorage if available
      const hasLocalData = loadUserDataFromLocalStorage();
      if (!hasLocalData) {
        setUserRole('user'); // Default role
      }
    }
  };

  const refreshUserProfile = async () => {
    if (user) {
      await fetchUserProfile(user.uid, true); // Force refresh
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
  const logOut = async () => {
    setLoading(true);
    try {
      // Clear localStorage first
      clearLocalStorageData();
      
      // Clear state
      setUserRole(null);
      setUserProfile(null);
      setUser(null);
      
      // Sign out from Firebase
      await signOut(auth);
      
      console.log('✅ User logged out and localStorage cleared');
    } catch (error) {
      console.error('❌ Error during logout:', error);
      throw error;
    } finally {
      setLoading(false);
    }
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
        // Clear everything when no user
        setUserRole(null);
        setUserProfile(null);
        clearLocalStorageData();
      }
      
      setLoading(false);
      setIsInitialized(true); // ✅ Mark as initialized
      console.log('🔐 Auth state changed:', currentUser);
    })
    return () => unsubscribe();
  }, [])

  const userInfo: AuthContextType = {
    user,
    loading,
    userRole,
    userProfile,
    isInitialized, // ✅ Add to context
    setLoading,
    googleLogin,
    createUser,
    loginUser,
    logOut,
    ForgetPassword,
    refreshUserProfile,
    syncUserDataToLocalStorage,
    clearLocalStorageData,
  };
  
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;