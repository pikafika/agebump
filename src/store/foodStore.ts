import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { type FoodRecord, type GlycemicLevel, type MealType } from '../types/food';
import { toDateString, todayString } from '../utils/dateUtils';

// 'food-records-YYYY-MM-DD' (로컬 날짜) 형식으로 AsyncStorage에 저장한다.
// 과거에는 toISOString() 기반 UTC 키를 잘못 사용해 KST 자정~09시 기록이
// 다음날 사라지는 버그가 있었음 → migrations.ts의 1회성 마이그레이션으로 복구.
export const STORAGE_KEY_PREFIX = 'food-records-';

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
  /** ID로 기록 단건 조회 */
  getRecordById: (id: string) => FoodRecord | undefined;
  /** AsyncStorage에 저장된 모든 날짜의 기록을 삭제 + 인메모리 비움 */
  clearAllRecords: () => Promise<void>;

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

      getRecordById: (id) => get().records.find((r) => r.id === id),

      clearAllRecords: async () => {
        try {
          const keys = await AsyncStorage.getAllKeys();
          const targets = keys.filter((k) => k.startsWith(STORAGE_KEY_PREFIX));
          if (targets.length > 0) {
            await AsyncStorage.multiRemove(targets);
          }
        } catch {
          // 영속화 삭제 실패는 무시 — 인메모리 상태만이라도 비움
        }
        set({ records: [] });
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

/**
 * AsyncStorage를 스캔해서 기록이 한 건이라도 저장된 날짜들을
 * 'YYYY-MM-DD' 오름차순(과거→최근)으로 반환한다.
 * 빈 결과(저장된 기록 없음)도 정상으로 간주.
 */
export async function fetchAllRecordedDates(): Promise<string[]> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys
      .filter((k) => k.startsWith(STORAGE_KEY_PREFIX))
      .map((k) => k.slice(STORAGE_KEY_PREFIX.length))
      .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d))
      .sort();
  } catch {
    return [];
  }
}

/**
 * 여러 날짜의 식사 기록에서 어떤 식사 유형(MealType)들이 기록되어 있는지만
 * 일괄 조회한다. 캘린더 도트 표시 등 가벼운 메타 정보용.
 */
export async function fetchMealTypesForDates(
  dates: string[],
): Promise<Record<string, MealType[]>> {
  const entries = await Promise.all(
    dates.map(async (date) => {
      const records = await fetchRecordsByDate(date);
      const types = Array.from(new Set(records.map((r) => r.mealType)));
      return [date, types] as const;
    }),
  );
  return Object.fromEntries(entries);
}

/**
 * AsyncStorage에 저장된 특정 날짜의 단일 기록을 부분 업데이트한다.
 * 인메모리 store와 무관하게 동작하므로 과거 기록에도 사용 가능.
 * 해당 날짜 데이터가 없거나 ID 매칭이 안 되면 조용히 무시한다.
 */
export async function persistUpdateRecord(
  id: string,
  timestamp: number,
  updates: Partial<FoodRecord>,
): Promise<void> {
  const dateKey = `${STORAGE_KEY_PREFIX}${toDateString(timestamp)}`;
  try {
    const raw = await AsyncStorage.getItem(dateKey);
    if (!raw) return;
    const parsed = JSON.parse(raw) as { state?: { records?: FoodRecord[] }; version?: number };
    if (!parsed.state?.records) return;
    const next = parsed.state.records.map((r) =>
      r.id === id ? { ...r, ...updates } : r,
    );
    await AsyncStorage.setItem(
      dateKey,
      JSON.stringify({ ...parsed, state: { ...parsed.state, records: next } }),
    );
  } catch {
    // 영속화 실패 무시
  }
}

/**
 * AsyncStorage에 저장된 특정 날짜의 단일 기록을 영구 삭제한다.
 * 인메모리 store와 무관하게 동작하므로 과거 기록에도 사용 가능.
 */
export async function persistDeleteRecord(
  id: string,
  timestamp: number,
): Promise<void> {
  const dateKey = `${STORAGE_KEY_PREFIX}${toDateString(timestamp)}`;
  try {
    const raw = await AsyncStorage.getItem(dateKey);
    if (!raw) return;
    const parsed = JSON.parse(raw) as { state?: { records?: FoodRecord[] }; version?: number };
    if (!parsed.state?.records) return;
    const next = parsed.state.records.filter((r) => r.id !== id);
    if (next.length === 0) {
      await AsyncStorage.removeItem(dateKey);
      return;
    }
    await AsyncStorage.setItem(
      dateKey,
      JSON.stringify({ ...parsed, state: { ...parsed.state, records: next } }),
    );
  } catch {
    // 영속화 실패 무시
  }
}
