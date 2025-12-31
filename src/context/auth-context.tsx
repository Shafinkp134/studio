
"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { User, UserData } from "@/types";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signUpWithEmail: (email: string, pass: string) => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleUser = useCallback(
    async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const unsubscribe = onSnapshot(userRef, async (snapshot) => {
          if (snapshot.exists()) {
            const userData = snapshot.data() as UserData;
            setUser({ ...firebaseUser, ...userData });
          } else {
            // New user, create user document in Firestore
            const newUser: UserData = { 
              storageUsed: 0,
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              createdAt: serverTimestamp(),
            };
            await setDoc(userRef, newUser);
            setUser({ ...firebaseUser, ...newUser });
          }
          setLoading(false);
        });
        return () => unsubscribe();
      } else {
        setUser(null);
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);
    return () => unsubscribe();
  }, [handleUser]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  const signInWithGitHub = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      router.push("/");
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };
  
  const signUpWithEmail = async (email: string, pass: string) => {
    const creds = await createUserWithEmailAndPassword(auth, email, pass);
    if(creds.user) {
      router.push("/");
    }
  }

  const signInWithEmail = async (email: string, pass: string) => {
    const creds = await signInWithEmailAndPassword(auth, email, pass);
    if(creds.user) {
      router.push("/");
    }
  }

  const signOut = async () => {
    await firebaseSignOut(auth);
    router.push("/login");
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithGitHub,
    signUpWithEmail,
    signInWithEmail,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
