import AsyncStorage from '@react-native-async-storage/async-storage';
import { type FoodRecord } from '../types/food';
import { toDateString } from '../utils/dateUtils';
import { STORAGE_KEY_PREFIX } from './foodStore';
import { setMemo } from './memoStore';
import { migrateLocalToFirestore as migrateLocalToFirestoreService, restoreFromFirestore } from '../services/foodSyncService';
import { useSyncStore } from './syncStore';
import { useFoodStore } from './foodStore';

const MIGRATION_FLAG_KEY = 'agebump.migration.utcKeysToLocal.v1';
const MEMO_MIGRATION_FLAG_KEY = 'agebump.migration.memosToSecureStore.v1';

interface PersistEnvelope {
  state?: { records?: FoodRecord[] };
  version?: number;
}

/**
 * 과거 버전에서 toISOString() 기반 UTC 날짜 키로 저장된 식사 기록을
 * 각 record의 timestamp(로컬 날짜) 기준 키로 재그룹핑한다.
 *
 * 예: 사용자가 KST 2026-05-13 02:00에 저장 → UTC는 2026-05-12 17:00 → 'food-records-2026-05-12'에 저장됨
 *     → 마이그레이션 후 'food-records-2026-05-13'로 이동
 *
 * 영구 플래그(`agebump.migration.utcKeysToLocal.v1`)를 사용해 단 1회만 실행한다.
 * 실패해도 앱 부팅은 막지 않는다 (조용히 다음 부팅에서 재시도하지 않도록 플래그는 setItem 직전에 마킹).
 */
export async function migrateLegacyUtcKeys(): Promise<void> {
  try {
    const done = await AsyncStorage.getItem(MIGRATION_FLAG_KEY);
    if (done === '1') return;

    const allKeys = await AsyncStorage.getAllKeys();
    const recordKeys = allKeys.filter((k) => k.startsWith(STORAGE_KEY_PREFIX));
    if (recordKeys.length === 0) {
      await AsyncStorage.setItem(MIGRATION_FLAG_KEY, '1');
      return;
    }

    // localDate → { records, envelope } 누적
    const regrouped = new Map<string, { records: FoodRecord[]; envelope: PersistEnvelope }>();

    for (const key of recordKeys) {
      const raw = await AsyncStorage.getItem(key);
      if (!raw) continue;
      let parsed: PersistEnvelope;
      try {
        parsed = JSON.parse(raw) as PersistEnvelope;
      } catch {
        continue;
      }
      const records = parsed.state?.records ?? [];
      for (const record of records) {
        const correctDate = toDateString(record.timestamp);
        const slot = regrouped.get(correctDate) ?? {
          records: [],
          envelope: { state: { records: [] }, version: parsed.version ?? 0 },
        };
        slot.records.push(record);
        regrouped.set(correctDate, slot);
      }
    }

    // 1) 기존 모든 record 키 제거
    await AsyncStorage.multiRemove(recordKeys);

    // 2) 재그룹핑된 데이터 저장 (timestamp 오름차순 정렬 후)
    const writes: [string, string][] = [];
    for (const [date, slot] of regrouped) {
      const sorted = slot.records.slice().sort((a, b) => a.timestamp - b.timestamp);
      const envelope: PersistEnvelope = {
        ...slot.envelope,
        state: { records: sorted },
      };
      writes.push([`${STORAGE_KEY_PREFIX}${date}`, JSON.stringify(envelope)]);
    }
    if (writes.length > 0) {
      await AsyncStorage.multiSet(writes);
    }

    await AsyncStorage.setItem(MIGRATION_FLAG_KEY, '1');
  } catch (err) {
    // 마이그레이션 실패는 앱 사용을 막지 않음 — 플래그를 세팅하지 않아 다음 부팅에서 재시도 가능
    console.warn('[migrations] migrateLegacyUtcKeys failed:', err);
  }
}

/**
 * AsyncStorage에 평문으로 저장된 record.memo를 expo-secure-store(Keychain/Keystore)로 이전한다.
 * record에서는 memo 필드를 제거해 평문 흔적을 없앤다.
 *
 * 영구 플래그(`agebump.migration.memosToSecureStore.v1`)로 1회만 실행.
 * iOS/Android에서만 동작 (memoStore가 web에서 no-op이지만 안전을 위해 환경 분기는 호출 측에서 하지 않음).
 */
export async function migrateMemosToSecureStore(): Promise<void> {
  try {
    const done = await AsyncStorage.getItem(MEMO_MIGRATION_FLAG_KEY);
    if (done === '1') return;

    const allKeys = await AsyncStorage.getAllKeys();
    const recordKeys = allKeys.filter((k) => k.startsWith(STORAGE_KEY_PREFIX));

    for (const key of recordKeys) {
      const raw = await AsyncStorage.getItem(key);
      if (!raw) continue;
      let parsed: PersistEnvelope;
      try {
        parsed = JSON.parse(raw) as PersistEnvelope;
      } catch {
        continue;
      }
      const records = parsed.state?.records ?? [];
      if (records.length === 0) continue;

      let mutated = false;
      const next: FoodRecord[] = [];
      for (const record of records) {
        if (record.memo && record.memo.trim().length > 0) {
          await setMemo(record.id, record.memo);
          const { memo: _drop, ...rest } = record;
          void _drop;
          next.push(rest as FoodRecord);
          mutated = true;
        } else if (record.memo !== undefined) {
          const { memo: _drop, ...rest } = record;
          void _drop;
          next.push(rest as FoodRecord);
          mutated = true;
        } else {
          next.push(record);
        }
      }

      if (mutated) {
        const envelope: PersistEnvelope = {
          ...parsed,
          state: { ...parsed.state, records: next },
        };
        await AsyncStorage.setItem(key, JSON.stringify(envelope));
      }
    }

    await AsyncStorage.setItem(MEMO_MIGRATION_FLAG_KEY, '1');
  } catch (err) {
    console.warn('[migrations] migrateMemosToSecureStore failed:', err);
  }
}

/**
 * 로컬 AsyncStorage의 모든 식사 기록을 Firestore로 1회 마이그레이션한다.
 * syncStore.hasMigrated 플래그로 중복 실행을 방지한다.
 */
export async function migrateLocalToFirestore(userId: string): Promise<void> {
  const syncStore = useSyncStore.getState();
  if (syncStore.hasMigrated) return;
  try {
    await migrateLocalToFirestoreService(userId);
    syncStore.setHasMigrated();
  } catch (err) {
    console.warn('[migrations] migrateLocalToFirestore failed:', err);
  }
}

/**
 * Firestore에서 해당 userId의 식사 기록을 로컬 AsyncStorage로 복원한다.
 * 로컬에 없는 기록만 추가(additive merge)하므로 기존 로컬 데이터는 보존된다.
 * syncStore.restoredUid로 중복 실행을 방지하며, 계정 전환 시 재실행된다.
 */
export async function restoreLocalFromFirestore(userId: string): Promise<void> {
  const syncStore = useSyncStore.getState();
  if (syncStore.restoredUid === userId) return;
  try {
    const remoteRecords = await restoreFromFirestore(userId);
    if (remoteRecords.length === 0) {
      syncStore.setRestoredUid(userId);
      return;
    }

    // 날짜별 그룹핑
    const byDate = new Map<string, FoodRecord[]>();
    for (const record of remoteRecords) {
      const date = toDateString(record.timestamp);
      const bucket = byDate.get(date) ?? [];
      bucket.push(record);
      byDate.set(date, bucket);
    }

    // 날짜별로 로컬 데이터와 additive merge
    for (const [date, serverRecords] of byDate) {
      const key = `${STORAGE_KEY_PREFIX}${date}`;
      const existing = await (async () => {
        try {
          const raw = await AsyncStorage.getItem(key);
          if (!raw) return [] as FoodRecord[];
          const parsed = JSON.parse(raw) as { state?: { records?: FoodRecord[] } };
          return parsed.state?.records ?? [];
        } catch {
          return [] as FoodRecord[];
        }
      })();
      const existingIds = new Set(existing.map((r) => r.id));
      const toAdd = serverRecords.filter((r) => !existingIds.has(r.id));
      if (toAdd.length === 0) continue;
      const merged = [...existing, ...toAdd].sort((a, b) => a.timestamp - b.timestamp);
      await AsyncStorage.setItem(key, JSON.stringify({ state: { records: merged } }));
    }

    syncStore.setRestoredUid(userId);
    // 오늘 날짜가 포함된 경우 인메모리 스토어 재수화
    await useFoodStore.persist.rehydrate();
  } catch (err) {
    console.warn('[migrations] restoreLocalFromFirestore failed:', err);
  }
}
