import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Timestamp,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { FoodRecord } from '../types/food';
import { STORAGE_KEY_PREFIX } from '../store/foodStore';

/** FoodRecord → Firestore 도큐먼트 변환 (imageUri 제외) */
function toFirestoreDoc(userId: string, record: FoodRecord) {
  return {
    userId,
    timestampMs: record.timestamp,
    mealType: record.mealType,
    foods: record.foods,
    // imageUri는 로컬 경로/data URL이므로 서버에 저장하지 않음
    giIndex: record.gi_index ?? null,
    carbsG: record.carbs_g ?? null,
    fiberG: record.fiber_g ?? null,
    foodTypes: record.food_types ?? [],
    score: record.score ?? null,
    scoreLabel: record.scoreLabel ?? null,
    comment: record.comment ?? null,
    aiGuide: record.aiGuide ?? null,
    updatedAt: serverTimestamp(),
  };
}

export async function upsertRecord(userId: string, record: FoodRecord): Promise<void> {
  const ref = doc(db, 'food_records', `${userId}_${record.id}`);
  await setDoc(ref, toFirestoreDoc(userId, record), { merge: true });
}

export async function deleteRemoteRecord(userId: string, id: string): Promise<void> {
  const ref = doc(db, 'food_records', `${userId}_${id}`);
  await deleteDoc(ref);
}

/**
 * AsyncStorage에 저장된 모든 식사 기록을 Firestore로 1회 마이그레이션한다.
 * 500건씩 배치 write로 처리 (Firestore 배치 제한).
 */
export async function migrateLocalToFirestore(userId: string): Promise<void> {
  const keys = await AsyncStorage.getAllKeys();
  const foodKeys = keys.filter((k) => k.startsWith(STORAGE_KEY_PREFIX));

  const allRecords: FoodRecord[] = [];
  for (const key of foodKeys) {
    try {
      const raw = await AsyncStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw) as { state?: { records?: FoodRecord[] } };
      const records = parsed.state?.records ?? [];
      allRecords.push(...records);
    } catch {
      // 개별 키 파싱 실패는 건너뜀
    }
  }

  if (allRecords.length === 0) return;

  const BATCH_SIZE = 400;
  for (let i = 0; i < allRecords.length; i += BATCH_SIZE) {
    const batch = writeBatch(db);
    const chunk = allRecords.slice(i, i + BATCH_SIZE);
    for (const record of chunk) {
      const ref = doc(db, 'food_records', `${userId}_${record.id}`);
      batch.set(ref, {
        ...toFirestoreDoc(userId, record),
        createdAt: Timestamp.fromMillis(record.timestamp),
      }, { merge: true });
    }
    await batch.commit();
  }
}
