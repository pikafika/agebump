import type { FoodTypeCategory, ScoreLabel } from '../types/food';

export type Gender = 'male' | 'female';

export interface PersonalizationProfile {
  age?: number;
  gender?: Gender;
  height?: number;
  weight?: number;
}

function getPersonalizationFactors(profile?: PersonalizationProfile): {
  carbMultiplier: number;
  giMultiplier: number;
  isPersonalized: boolean;
} {
  let carbMultiplier = 1.0;
  let giMultiplier = 1.0;

  if (profile?.height && profile?.weight) {
    const bmi = profile.weight / Math.pow(profile.height / 100, 2);
    if (bmi >= 30) {
      carbMultiplier += 0.30;
      giMultiplier += 0.20;
    } else if (bmi >= 25) {
      carbMultiplier += 0.15;
      giMultiplier += 0.10;
    }
  }

  if (profile?.age) {
    if (profile.age >= 60) {
      carbMultiplier += 0.10;
      giMultiplier += 0.20;
    } else if (profile.age >= 45) {
      carbMultiplier += 0.05;
      giMultiplier += 0.10;
    }
  }

  return {
    carbMultiplier,
    giMultiplier,
    isPersonalized: carbMultiplier !== 1.0 || giMultiplier !== 1.0,
  };
}

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
  userProfile,
}: {
  gi: number;
  carbs: number;
  fiber: number;
  foods: FoodTypeCategory[];
  userProfile?: PersonalizationProfile;
}): { score: number; isPersonalized: boolean } {
  const { carbMultiplier, giMultiplier, isPersonalized } = getPersonalizationFactors(userProfile);

  // 개인화 계수 적용 — 입력값을 보정하여 동일 음식에 더 엄격한 기준 적용
  const adjustedGi = gi * giMultiplier;
  const adjustedCarbs = carbs * carbMultiplier;

  // GI 점수 (35점 만점)
  let giScore: number;
  if (adjustedGi <= 55)       giScore = 35;
  else if (adjustedGi <= 69)  giScore = 35 - ((adjustedGi - 55) / 14) * 20;
  else                        giScore = Math.max(0, 15 - ((adjustedGi - 70) / 30) * 15);

  // 탄수화물 점수 (30점 만점)
  let carbScore: number;
  if (adjustedCarbs <= 20)       carbScore = 30;
  else if (adjustedCarbs <= 40)  carbScore = 30 - ((adjustedCarbs - 20) / 20) * 15;
  else if (adjustedCarbs <= 60)  carbScore = 15 - ((adjustedCarbs - 40) / 20) * 10;
  else                           carbScore = Math.max(0, 5 - ((adjustedCarbs - 60) / 20) * 5);

  // 식이섬유 점수 (20점 만점)
  const fiberScore = Math.min(20, fiber * 4);

  // 조합 보너스 (-15 ~ +15)
  const bonus = getCombinationBonus(foods);

  const score = Math.round(Math.min(100, Math.max(0, giScore + carbScore + fiberScore + bonus)));
  return { score, isPersonalized };
}

export function getScoreLabel(score: number): ScoreLabel {
  if (score >= 80) return { label: '완벽해요!',          color: '#1D9E75' };
  if (score >= 60) return { label: '괜찮아요',            color: '#BA7517' };
  if (score >= 40) return { label: '조금 아쉬워요',       color: '#E07820' };
  return                  { label: '오늘은 봐줄게요 😅', color: '#E24B4A' };
}
