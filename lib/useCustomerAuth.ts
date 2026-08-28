"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { getClientAuth } from "@/lib/firebaseClient";

export interface CustomerAuthState {
  user: User | null;
  loading: boolean;
  /**
   * True once we don't need to ask for anything further:
   * - Email/password users: true as soon as they're signed in.
   * - Google/Facebook users: true only once a phone number is linked to
   *   their account (see /login/verify-phone).
   */
  isFullyVerified: boolean;
  needsPhoneVerification: boolean;
}

function isPasswordOnlyUser(user: User): boolean {
  return user.providerData.every((p) => p.providerId === "password");
}

export function useCustomerAuth(): CustomerAuthState {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getClientAuth(), (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (!user) {
    return { user: null, loading, isFullyVerified: false, needsPhoneVerification: false };
  }

  const needsPhoneVerification = !isPasswordOnlyUser(user) && !user.phoneNumber;

  return {
    user,
    loading,
    isFullyVerified: !needsPhoneVerification,
    needsPhoneVerification,
  };
}
