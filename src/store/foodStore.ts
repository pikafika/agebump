import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type FoodRecord, type GlycemicLevel } from '../types/food';

const STORAGE_KEY_PREFIX = 'food-records-';

function toDateString(timestamp: number): string {
  return new Date(timestamp).toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

/** 평균 GI 값을 GlycemicLevel로 변환 */
function giToLevel(avgGi: number): GlycemicLevel {
  if (avgGi <= 55) return 'low';
  if (avgGi <= 69) return 'moderate';
  if (avgGi <= 89) return 'high';
  return 'veryHigh';
}

interface FoodState {
  /** 현재 세션에 로드된 식사 기록 (오늘 날짜 기준으로 persist) */
  records: FoodRecord[];
  /** Gemini AI 분석 진행 중 여부 */
  isAnalyzing: boolean;

  /** 새 식사 기록 추가 */
  addRecord: (record: FoodRecord) => void;
  /** 기존 식사 기록 일부 수정 */
  updateRecord: (id: string, updates: Partial<FoodRecord>) => void;
  /** 식사 기록 삭제 */
  deleteRecord: (id: string) => void;
  /** 특정 날짜(YYYY-MM-DD)의 기록 반환 — 인메모리 검색 */
  getRecordsByDate: (date: string) => FoodRecord[];
  /** 오늘 기록 반환 */
  getTodayRecords: () => FoodRecord[];
  /** 오늘 총 칼로리 합계 */
  getTodayTotalCalories: () => number;
  /** 오늘 전체 식사의 혈당 영향도 요약 */
  getTodayGlycemicSummary: () => GlycemicLevel;

  setIsAnalyzing: (value: boolean) => void;
}

/**
 * 날짜별 AsyncStorage 키를 사용하는 커스텀 스토리지.
 * Zustand persist는 단일 키를 가정하므로, 오늘 날짜 키로 읽고 쓴다.
 */
const dateKeyedStorage = createJSONStorage(() => ({
  getItem: (_key: string) =>
    AsyncStorage.getItem(`${STORAGE_KEY_PREFIX}${todayString()}`),
  setItem: (_key: string, value: string) =>
    AsyncStorage.setItem(`${STORAGE_KEY_PREFIX}${todayString()}`, value),
  removeItem: (_key: string) =>
    AsyncStorage.removeItem(`${STORAGE_KEY_PREFIX}${todayString()}`),
}));

export const useFoodStore = create<FoodState>()(
  persist(
    (set, get) => ({
      records: [],
      isAnalyzing: false,

      addRecord: (record) =>
        set((state) => ({ records: [...state.records, record] })),

      updateRecord: (id, updates) =>
        set((state) => ({
          records: state.records.map((r) =>
            r.id === id ? { ...r, ...updates } : r,
          ),
        })),

      deleteRecord: (id) =>
        set((state) => ({
          records: state.records.filter((r) => r.id !== id),
        })),

      getRecordsByDate: (date) =>
        get().records.filter((r) => toDateString(r.timestamp) === date),

      getTodayRecords: () => get().getRecordsByDate(todayString()),

      getTodayTotalCalories: () =>
        get()
          .getTodayRecords()
          .reduce(
            (sum, record) =>
              sum + record.foods.reduce((s, f) => s + f.calories, 0),
            0,
          ),

      getTodayGlycemicSummary: () => {
        const allFoods = get()
          .getTodayRecords()
          .flatMap((r) => r.foods);

        if (allFoods.length === 0) return 'low';

        const avgGi =
          allFoods.reduce((sum, f) => sum + f.gi, 0) / allFoods.length;

        return giToLevel(avgGi);
      },

      setIsAnalyzing: (value) => set({ isAnalyzing: value }),
    }),
    {
      name: 'food-store',
      storage: dateKeyedStorage,
      // 오늘 날짜가 바뀌면 이전 날짜 기록은 포함하지 않도록 records만 persist
      partialize: (state) => ({ records: state.records }),
    },
  ),
);

/**
 * AsyncStorage에서 특정 날짜의 식사 기록을 직접 조회한다.
 * 인메모리 store에 없는 과거 날짜 데이터를 불러올 때 사용한다.
 */
export async function fetchRecordsByDate(date: string): Promise<FoodRecord[]> {
  try {
    const raw = await AsyncStorage.getItem(`${STORAGE_KEY_PREFIX}${date}`);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { state?: { records?: FoodRecord[] } };
    return parsed.state?.records ?? [];
  } catch {
    return [];
  }
}
