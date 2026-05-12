import { type FoodRecord } from '../types/food';

const MAX_TAGS = 3;

interface NutritionTotals {
  totalCalories: number;
  proteinKcal: number;
  carbsKcal: number;
  fatKcal: number;
  sugarTotal: number;
  avgGi: number;
  foodCount: number;
}

function summarize(record: FoodRecord): NutritionTotals {
  if (record.foods.length === 0) {
    return {
      totalCalories: 0,
      proteinKcal: 0,
      carbsKcal: 0,
      fatKcal: 0,
      sugarTotal: 0,
      avgGi: 0,
      foodCount: 0,
    };
  }

  const totals = record.foods.reduce(
    (acc, f) => ({
      totalCalories: acc.totalCalories + f.calories,
      proteinKcal: acc.proteinKcal + f.protein * 4,
      carbsKcal: acc.carbsKcal + f.carbs * 4,
      fatKcal: acc.fatKcal + f.fat * 9,
      sugarTotal: acc.sugarTotal + f.sugar,
      giSum: acc.giSum + f.gi,
    }),
    { totalCalories: 0, proteinKcal: 0, carbsKcal: 0, fatKcal: 0, sugarTotal: 0, giSum: 0 },
  );

  return {
    totalCalories: totals.totalCalories,
    proteinKcal: totals.proteinKcal,
    carbsKcal: totals.carbsKcal,
    fatKcal: totals.fatKcal,
    sugarTotal: totals.sugarTotal,
    avgGi: totals.giSum / record.foods.length,
    foodCount: record.foods.length,
  };
}

/**
 * 식사 기록의 영양 분포로부터 표시용 태그를 자동 생성한다.
 * 음식이 없거나 영양 정보가 모두 0이면 빈 배열을 반환한다.
 * 최대 3개까지, 우선순위 순으로 반환.
 */
export function nutritionTagsFor(record: FoodRecord): string[] {
  const s = summarize(record);
  if (s.totalCalories <= 0 || s.foodCount === 0) return [];

  const proteinRatio = s.proteinKcal / s.totalCalories;
  const carbsRatio = s.carbsKcal / s.totalCalories;
  const fatRatio = s.fatKcal / s.totalCalories;

  const candidates: string[] = [];

  if (proteinRatio > 0.25) candidates.push('#고단백');
  if (carbsRatio < 0.30) candidates.push('#저탄수화물');
  if (s.avgGi > 0 && s.avgGi <= 55) candidates.push('#저GI');
  if (fatRatio > 0.40) candidates.push('#고지방');
  if (s.sugarTotal < 5) candidates.push('#저당');
  if (s.totalCalories > 700) candidates.push('#든든한');
  if (s.totalCalories < 400) candidates.push('#가벼운');

  return candidates.slice(0, MAX_TAGS);
}
