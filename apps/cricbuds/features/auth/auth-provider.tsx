"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  getFirebaseAuth,
  getFirebaseDb,
  isFirebaseConfigured,
} from "@/lib/firebase/client";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  configError: string | null;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function persistUserProfile(user: User) {
  const db = getFirebaseDb();
  await setDoc(
    doc(db, "users", user.uid),
    {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const configured = isFirebaseConfigured();
  const configError = configured
    ? null
    : "Firebase client env vars are missing. Copy .env.example to .env.local.";

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(() => configured);

  useEffect(() => {
    if (!configured) return;
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          await persistUserProfile(u);
        } catch (e) {
          console.error("Failed to persist user profile", e);
        }
      }
      setLoading(false);
    });
    return () => unsub();
  }, [configured]);

  const signInWithGoogle = useCallback(async () => {
    if (configError) throw new Error(configError);
    const auth = getFirebaseAuth();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await signInWithPopup(auth, provider);
  }, [configError]);

  const signOutUser = useCallback(async () => {
    if (configError) return;
    await signOut(getFirebaseAuth());
  }, [configError]);

  const value = useMemo(
    () => ({
      user,
      loading,
      configError,
      signInWithGoogle,
      signOutUser,
    }),
    [user, loading, configError, signInWithGoogle, signOutUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
