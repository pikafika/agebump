import {
  GoogleAuthProvider,
  User,
  browserPopupRedirectResolver,
  linkWithPopup,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCredential,
  unlink,
} from 'firebase/auth';
import { create } from 'zustand';
import { auth } from '../lib/firebase';

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
        set({ user, isInitialized: true });
      } else {
        try {
          const credential = await signInAnonymously(auth);
          set({ user: credential.user, isInitialized: true });
        } catch {
          set({ isInitialized: true });
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
    const { user } = get();
    if (!user) return;
    set({ isLinking: true, linkError: null });
    unlink(user, 'google.com')
      .then((updatedUser) => {
        set({ user: updatedUser, isLinking: false });
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : '연결 해제에 실패했어요.';
        set({ isLinking: false, linkError: message });
      });
  },

  clearLinkError: () => set({ linkError: null }),
}));
