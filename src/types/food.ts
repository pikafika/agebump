/** 혈당 지수(GI) 수준 */
export type GlycemicLevel = 'low' | 'moderate' | 'high' | 'veryHigh';

/** 식사 유형 */
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

/** 음식 하나의 분석 결과 */
export interface FoodItem {
  /** 음식 이름 */
  name: string;
  /** 칼로리 (kcal) */
  calories: number;
  /** 탄수화물 (g) */
  carbs: number;
  /** 단백질 (g) */
  protein: number;
  /** 지방 (g) */
  fat: number;
  /** 당류 (g) */
  sugar: number;
  /** 혈당 지수 (0–100) */
  gi: number;
  /** GI 수준 분류 */
  giLevel: GlycemicLevel;
  /** 혈당 스파이크 위험도 (0–100) */
  spikeRisk: number;
  /** AI 식별 확신도 (0–1). 낮을수록 사용자 정정 유도가 권장됨 */
  confidence?: number;
  /** 동일/유사 후보 음식명. 잘못 인식된 경우 빠른 정정 UI에 사용 */
  alternateNames?: string[];
}

/** Gemini API 음식 분석 응답 전체 */
export interface FoodAnalysisResult {
  /** 분석된 음식 목록 */
  foods: FoodItem[];
  /** 전체 칼로리 합계 (kcal) */
  totalCalories: number;
  /** 식사 전체의 GI 수준 */
  overallGiLevel: GlycemicLevel;
  /** 법적 면책 고지 문구 */
  disclaimer: string;
  /** API 호출 또는 파싱 실패 시 에러 메시지 */
  error?: string;
}

/** AI 가이드 결과 */
export interface AIGuide {
  /** 식후 즉시 취할 수 있는 행동 권고 */
  immediateAction: string;
  /** 다음 식사 제안 */
  nextMealSuggestion: string;
  /** 오늘 하루 식단 총평 */
  dailySummary: string;
}

/** 저장되는 식사 기록 */
export interface FoodRecord {
  /** 고유 식사 기록 ID */
  id: string;
  /** 기록 생성 시각 (Unix timestamp, ms) */
  timestamp: number;
  /** 식사 유형 */
  mealType: MealType;
  /** 분석된 음식 목록 */
  foods: FoodItem[];
  /** 촬영한 음식 이미지의 로컬 URI */
  imageUri?: string;
  /** AI 가이드 결과 */
  aiGuide?: AIGuide;
  /**
   * @deprecated 메모는 더 이상 record에 저장되지 않고 expo-secure-store에 분리 저장된다.
   * 기존 데이터 호환을 위해 타입에 남겨두지만 신규 코드에서는 사용하지 말 것.
   * memoStore.getMemo(record.id) / setMemo(record.id, text) 사용.
   */
  memo?: string;
}
