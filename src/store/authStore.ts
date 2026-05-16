import {
  GoogleAuthProvider,
  User,
  browserPopupRedirectResolver,
  linkWithPopup,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCredential,
  signOut,
} from 'firebase/auth';
import { create } from 'zustand';
import { auth } from '../lib/firebase';
import { useSyncStore } from './syncStore';

interface AuthState {
  user: User | null;
  isInitialized: boolean;
  isLinking: boolean;
  linkError: string | null;

  initialize: () => () => void;
  linkWithGoogle: () => void;
  unlinkGoogle: () => void;
  clearLinkError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isInitialized: false,
  isLinking: false,
  linkError: null,

  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        set({ user, isInitialized: true, isLinking: false });
      } else {
        try {
          const credential = await signInAnonymously(auth);
          set({ user: credential.user, isInitialized: true, isLinking: false });
        } catch {
          set({ isInitialized: true, isLinking: false });
        }
      }
    });
    return unsubscribe;
  },

  linkWithGoogle: () => {
    const { user } = get();
    if (!user) return;
    set({ isLinking: true, linkError: null });
    const provider = new GoogleAuthProvider();
    linkWithPopup(user, provider, browserPopupRedirectResolver)
      .then((result) => {
        set({ user: result.user, isLinking: false });
      })
      .catch((error: unknown) => {
        // credential-already-in-use: 같은 구글 계정이 이미 다른 UID에 연결된 경우 → 기존 계정으로 로그인
        if (
          error != null &&
          typeof error === 'object' &&
          'code' in error &&
          (error as { code: string }).code === 'auth/credential-already-in-use'
        ) {
          const credential = GoogleAuthProvider.credentialFromError(
            error as Parameters<typeof GoogleAuthProvider.credentialFromError>[0]
          );
          if (credential) {
            signInWithCredential(auth, credential)
              .then((result) => {
                set({ user: result.user, isLinking: false });
              })
              .catch((signInError: unknown) => {
                const message = signInError instanceof Error ? signInError.message : '연결에 실패했어요.';
                set({ isLinking: false, linkError: message });
              });
            return;
          }
        }
        const message = error instanceof Error ? error.message : '연결에 실패했어요.';
        set({ isLinking: false, linkError: message });
      });
  },

  unlinkGoogle: () => {
    set({ isLinking: true, linkError: null });
    useSyncStore.setState({ hasMigrated: false, restoredUid: null, pendingSyncIds: [] });

    if (!auth.currentUser) {
      // Firebase 세션이 이미 만료된 경우 → 익명 로그인으로 초기화
      signInAnonymously(auth)
        .then((c) => set({ user: c.user, isLinking: false }))
        .catch(() => set({ user: null, isLinking: false }));
      return;
    }

    // signOut → onAuthStateChanged(null) → signInAnonymously → onAuthStateChanged(newUser) → isLinking: false
    signOut(auth).catch((err: unknown) => {
      const message = err instanceof Error ? err.message : '연결 해제에 실패했어요.';
      set({ isLinking: false, linkError: message });
    });
  },

  clearLinkError: () => set({ linkError: null }),
}));
