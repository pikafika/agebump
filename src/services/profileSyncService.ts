import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface ProfileData {
  nickname: string;
  dailyCalorieGoal: number;
  age?: number;
  gender?: 'male' | 'female';
  height?: number;
  weight?: number;
}

export async function upsertProfile(userId: string, profile: ProfileData): Promise<void> {
  const ref = doc(db, 'user_profiles', userId);
  await setDoc(ref, { ...profile, updatedAt: serverTimestamp() }, { merge: true });
}

export async function fetchRemoteProfile(userId: string): Promise<ProfileData | null> {
  const ref = doc(db, 'user_profiles', userId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    nickname: data.nickname ?? '',
    dailyCalorieGoal: data.dailyCalorieGoal ?? 2000,
    age: typeof data.age === 'number' ? data.age : undefined,
    gender: data.gender === 'male' || data.gender === 'female' ? data.gender : undefined,
    height: typeof data.height === 'number' ? data.height : undefined,
    weight: typeof data.weight === 'number' ? data.weight : undefined,
  };
}
