import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';

interface SyncState {
  pendingSyncIds: string[];
  hasMigrated: boolean;
  /** 마지막으로 Firestore 복원을 완료한 userId. 계정 전환 시 재복원 트리거용. */
  restoredUid: string | null;

  markPending: (id: string) => void;
  markSynced: (id: string) => void;
  setHasMigrated: () => void;
  setRestoredUid: (uid: string) => void;
}

export const useSyncStore = create<SyncState>()(
  persist(
    (set) => ({
      pendingSyncIds: [],
      hasMigrated: false,
      restoredUid: null,

      markPending: (id) =>
        set((s) => ({
          pendingSyncIds: s.pendingSyncIds.includes(id)
            ? s.pendingSyncIds
            : [...s.pendingSyncIds, id],
        })),

      markSynced: (id) =>
        set((s) => ({
          pendingSyncIds: s.pendingSyncIds.filter((i) => i !== id),
        })),

      setHasMigrated: () => set({ hasMigrated: true }),
      setRestoredUid: (uid) => set({ restoredUid: uid }),
    }),
    {
      name: 'agebump-sync-state',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
