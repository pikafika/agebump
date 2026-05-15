import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';

interface SyncState {
  pendingSyncIds: string[];
  hasMigrated: boolean;

  markPending: (id: string) => void;
  markSynced: (id: string) => void;
  setHasMigrated: () => void;
}

export const useSyncStore = create<SyncState>()(
  persist(
    (set) => ({
      pendingSyncIds: [],
      hasMigrated: false,

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
    }),
    {
      name: 'agebump-sync-state',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
