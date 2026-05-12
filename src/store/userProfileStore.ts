import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const STORAGE_KEY = 'user-profile';

export const DAILY_CALORIE_GOAL_MIN = 1000;
export const DAILY_CALORIE_GOAL_MAX = 5000;
export const DAILY_CALORIE_GOAL_DEFAULT = 2000;

interface UserProfileState {
  /** 사용자 닉네임 (선택, 빈 문자열이면 미설정) */
  nickname: string;
  /** 일일 칼로리 목표 (kcal). 홈 게이지의 max로 사용 */
  dailyCalorieGoal: number;

  setNickname: (value: string) => void;
  setDailyCalorieGoal: (value: number) => void;
  reset: () => void;
}

export const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      nickname: '',
      dailyCalorieGoal: DAILY_CALORIE_GOAL_DEFAULT,

      setNickname: (value) => set({ nickname: value.trim() }),
      setDailyCalorieGoal: (value) => {
        const clamped = Math.min(
          Math.max(Math.round(value), DAILY_CALORIE_GOAL_MIN),
          DAILY_CALORIE_GOAL_MAX,
        );
        set({ dailyCalorieGoal: clamped });
      },
      reset: () =>
        set({ nickname: '', dailyCalorieGoal: DAILY_CALORIE_GOAL_DEFAULT }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
