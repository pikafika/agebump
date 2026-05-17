import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { type AIGuide, type FoodItem, type FoodRecord, type FoodTypeCategory, type MealType, type PostMealFeeling, type ScoreLabel } from '../types/food';
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
    postMealFeeling: record.postMealFeeling ?? null,
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

/**
 * Firestore에서 userId에 속한 모든 식사 기록을 가져온다.
 * 다른 기기에서 저장한 데이터를 로컬로 복원할 때 사용한다.
 */
export async function restoreFromFirestore(userId: string): Promise<FoodRecord[]> {
  const q = query(
    collection(db, 'food_records'),
    where('userId', '==', userId),
  );
  const snap = await getDocs(q);

  return snap.docs
    .map((d) => {
      const data = d.data();
      const id = d.id.slice(userId.length + 1);
      if (!id || typeof data['timestampMs'] !== 'number') return null;
      const record: FoodRecord = {
        id,
        timestamp: data['timestampMs'] as number,
        mealType: data['mealType'] as MealType,
        foods: (data['foods'] ?? []) as FoodItem[],
      };
      if (data['giIndex'] != null) record.gi_index = data['giIndex'] as number;
      if (data['carbsG'] != null) record.carbs_g = data['carbsG'] as number;
      if (data['fiberG'] != null) record.fiber_g = data['fiberG'] as number;
      if (data['foodTypes'] != null) record.food_types = data['foodTypes'] as FoodTypeCategory[];
      if (data['score'] != null) record.score = data['score'] as number;
      if (data['scoreLabel'] != null) record.scoreLabel = data['scoreLabel'] as ScoreLabel;
      if (data['comment'] != null) record.comment = data['comment'] as string;
      if (data['aiGuide'] != null) record.aiGuide = data['aiGuide'] as AIGuide;
      if (data['postMealFeeling'] != null) record.postMealFeeling = data['postMealFeeling'] as PostMealFeeling;
      return record;
    })
    .filter((r): r is FoodRecord => r !== null);
}
