import type { FoodTypeCategory, ScoreLabel } from '../types/food';

export function getCombinationBonus(foods: FoodTypeCategory[]): number {
  const hasVeg       = foods.includes('vegetable');
  const hasProtein   = foods.includes('protein');
  const hasCarb      = foods.includes('carb');
  const hasFermented = foods.includes('fermented');

  let bonus = 0;
  if (hasVeg && hasProtein)               bonus += 15;
  if (hasFermented)                        bonus += 5;
  if (hasCarb && !hasVeg && !hasProtein)   bonus -= 10;

  return Math.min(15, Math.max(-15, bonus));
}

export function calculateScore({
  gi,
  carbs,
  fiber,
  foods,
}: {
  gi: number;
  carbs: number;
  fiber: number;
  foods: FoodTypeCategory[];
}): number {
  // GI 점수 (35점 만점)
  let giScore: number;
  if (gi <= 55)       giScore = 35;
  else if (gi <= 69)  giScore = 35 - ((gi - 55) / 14) * 20;
  else                giScore = Math.max(0, 15 - ((gi - 70) / 30) * 15);

  // 탄수화물 점수 (30점 만점)
  let carbScore: number;
  if (carbs <= 20)       carbScore = 30;
  else if (carbs <= 40)  carbScore = 30 - ((carbs - 20) / 20) * 15;
  else if (carbs <= 60)  carbScore = 15 - ((carbs - 40) / 20) * 10;
  else                   carbScore = Math.max(0, 5 - ((carbs - 60) / 20) * 5);

  // 식이섬유 점수 (20점 만점)
  const fiberScore = Math.min(20, fiber * 4);

  // 조합 보너스 (-15 ~ +15)
  const bonus = getCombinationBonus(foods);

  return Math.round(Math.min(100, Math.max(0, giScore + carbScore + fiberScore + bonus)));
}

export function getScoreLabel(score: number): ScoreLabel {
  if (score >= 80) return { label: '완벽해요!',          color: '#1D9E75' };
  if (score >= 60) return { label: '괜찮아요',            color: '#BA7517' };
  if (score >= 40) return { label: '조금 아쉬워요',       color: '#E07820' };
  return                  { label: '오늘은 봐줄게요 😅', color: '#E24B4A' };
}
