import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { upsertProfile } from '../services/profileSyncService';
import { useAuthStore } from './authStore';

const STORAGE_KEY = 'user-profile';

export const DAILY_CALORIE_GOAL_MIN = 1000;
export const DAILY_CALORIE_GOAL_MAX = 5000;
export const DAILY_CALORIE_GOAL_DEFAULT = 2000;

export const AGE_MIN = 1;
export const AGE_MAX = 120;
export const HEIGHT_MIN = 50;
export const HEIGHT_MAX = 250;
export const WEIGHT_MIN = 10;
export const WEIGHT_MAX = 300;

interface UserProfileState {
  /** 사용자 닉네임 (선택, 빈 문자열이면 미설정) */
  nickname: string;
  /** 일일 칼로리 목표 (kcal). 홈 게이지의 max로 사용 */
  dailyCalorieGoal: number;
  /** 나이 (선택) */
  age?: number;
  /** 성별 (선택) */
  gender?: 'male' | 'female';
  /** 키 cm (선택) */
  height?: number;
  /** 몸무게 kg (선택) */
  weight?: number;

  setNickname: (value: string) => void;
  setDailyCalorieGoal: (value: number) => void;
  setAge: (value: number | undefined) => void;
  setGender: (value: 'male' | 'female' | undefined) => void;
  setHeight: (value: number | undefined) => void;
  setWeight: (value: number | undefined) => void;
  reset: () => void;
}

function syncProfile(partial: Partial<UserProfileState>) {
  const userId = useAuthStore.getState().user?.uid;
  if (!userId) return;
  const s = useUserProfileStore.getState();
  upsertProfile(userId, {
    nickname: s.nickname,
    dailyCalorieGoal: s.dailyCalorieGoal,
    age: s.age,
    gender: s.gender,
    height: s.height,
    weight: s.weight,
    ...partial,
  }).catch(() => {});
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      nickname: '',
      dailyCalorieGoal: DAILY_CALORIE_GOAL_DEFAULT,
      age: undefined,
      gender: undefined,
      height: undefined,
      weight: undefined,

      setNickname: (value) => {
        const trimmed = value.trim();
        set({ nickname: trimmed });
        syncProfile({ nickname: trimmed });
      },
      setDailyCalorieGoal: (value) => {
        const clamped = Math.min(
          Math.max(Math.round(value), DAILY_CALORIE_GOAL_MIN),
          DAILY_CALORIE_GOAL_MAX,
        );
        set({ dailyCalorieGoal: clamped });
        syncProfile({ dailyCalorieGoal: clamped });
      },
      setAge: (value) => {
        const validated =
          value === undefined ? undefined : Math.min(Math.max(Math.round(value), AGE_MIN), AGE_MAX);
        set({ age: validated });
        syncProfile({ age: validated });
      },
      setGender: (value) => {
        set({ gender: value });
        syncProfile({ gender: value });
      },
      setHeight: (value) => {
        const validated =
          value === undefined
            ? undefined
            : Math.min(Math.max(Math.round(value), HEIGHT_MIN), HEIGHT_MAX);
        set({ height: validated });
        syncProfile({ height: validated });
      },
      setWeight: (value) => {
        const validated =
          value === undefined
            ? undefined
            : Math.min(Math.max(Math.round(value * 10) / 10, WEIGHT_MIN), WEIGHT_MAX);
        set({ weight: validated });
        syncProfile({ weight: validated });
      },
      reset: () =>
        set({
          nickname: '',
          dailyCalorieGoal: DAILY_CALORIE_GOAL_DEFAULT,
          age: undefined,
          gender: undefined,
          height: undefined,
          weight: undefined,
        }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
