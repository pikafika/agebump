import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { type FoodRecord } from '../types/food';
import { useFoodStore } from '../store/foodStore';
import { getScoreLabel } from '../utils/scoreCalculator';

type MealSlot = 'breakfast' | 'lunch' | 'dinner';

const MEAL_LABELS: Record<MealSlot, string> = {
  breakfast: '아침',
  lunch: '점심',
  dinner: '저녁',
};

const MEAL_SLOTS: MealSlot[] = ['breakfast', 'lunch', 'dinner'];

function getMealSlot(record: FoodRecord): MealSlot | null {
  if (record.mealType === 'breakfast') return 'breakfast';
  if (record.mealType === 'lunch') return 'lunch';
  if (record.mealType === 'dinner') return 'dinner';
  if (record.mealType === 'snack') return null;
  const hour = new Date(record.timestamp).getHours();
  if (hour >= 6 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 16) return 'lunch';
  if (hour >= 16 && hour < 22) return 'dinner';
  return null;
}

function getNextMealSuggestion(recordedSlots: MealSlot[], avgScore: number | null): string {
  const nextSlot = MEAL_SLOTS.find((s) => !recordedSlots.includes(s));

  if (!nextSlot) {
    if (avgScore === null) return '내일도 건강하게 드세요!';
    if (avgScore >= 80) return '오늘 하루 완벽했어요!';
    if (avgScore >= 60) return '내일은 채소를 더 챙겨요';
    return '내일은 저GI 식단 도전해요';
  }

  if (avgScore === null) {
    const defaults: Record<MealSlot, string> = {
      breakfast: '아침은 달걀+채소로 시작해요',
      lunch: '점심엔 단백질 꼭 챙겨요',
      dinner: '저녁은 채소 위주로 드세요',
    };
    return defaults[nextSlot];
  }

  if (nextSlot === 'breakfast') {
    if (avgScore >= 80) return '다음 아침도 단백질 챙겨요';
    if (avgScore >= 60) return '아침엔 달걀+채소 추천해요';
    return '아침은 저GI로 시작해요';
  }

  if (nextSlot === 'lunch') {
    if (avgScore >= 80) return '점심도 채소 듬뿍 넣어요';
    if (avgScore >= 60) return '점심엔 현미밥 어떠세요?';
    return '점심엔 단백질 꼭 챙겨요';
  }

  if (avgScore >= 80) return '저녁도 가볍게 마무리해요';
  if (avgScore >= 60) return '저녁엔 탄수화물 줄여봐요';
  return '저녁은 채소 위주로 드세요';
}

function scoreColor(score: number): string {
  if (score >= 80) return '#1D9E75';
  if (score >= 60) return '#BA7517';
  if (score >= 40) return '#E07820';
  return '#E24B4A';
}

export function BloodSugarScoreBlock() {
  const getTodayRecords = useFoodStore((s) => s.getTodayRecords);
  const [records, setRecords] = useState<FoodRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      setRecords(getTodayRecords());
      setIsLoading(false);
    }, [getTodayRecords]),
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="small" color="#1D9E75" />
      </View>
    );
  }

  const scoredRecords = records.filter((r) => r.score !== undefined && r.score !== null);

  // 기존 레코드가 있는데 score 필드가 하나도 없으면 블록 비표시
  if (records.length > 0 && scoredRecords.length === 0) return null;

  const scoredCount = scoredRecords.length;
  const avgScore =
    scoredCount > 0
      ? Math.round(scoredRecords.reduce((s, r) => s + (r.score ?? 0), 0) / scoredCount)
      : null;
  const hasScore = avgScore !== null;

  // 상단 카운터: 3끼 중 M끼 기록 (아침/점심/저녁 슬롯 기준)
  const recordedSlots = MEAL_SLOTS.filter((slot) =>
    records.some((r) => getMealSlot(r) === slot),
  );

  // 가장 최근 코멘트
  const latestComment = [...scoredRecords]
    .sort((a, b) => b.timestamp - a.timestamp)
    .find((r) => r.comment)?.comment ?? null;

  const nextMealSuggestion = getNextMealSuggestion(recordedSlots, avgScore);

  // 끼니별 평균 점수
  const mealAvg = Object.fromEntries(
    MEAL_SLOTS.map((slot) => {
      const slotScores = scoredRecords
        .filter((r) => getMealSlot(r) === slot)
        .map((r) => r.score ?? 0);
      const avg =
        slotScores.length > 0
          ? Math.round(slotScores.reduce((a, b) => a + b, 0) / slotScores.length)
          : null;
      return [slot, avg];
    }),
  ) as Record<MealSlot, number | null>;

  return (
    <View style={styles.container}>
      {/* ① 상단 라벨 행 */}
      <View style={styles.labelRow}>
        <Text style={styles.titleText}>혈당 친화 점수</Text>
        <Text style={styles.countText}>
          오늘 3끼 중 {recordedSlots.length}끼 기록
        </Text>
      </View>

      {/* ② 점수 + 라벨 행 */}
      <View style={styles.scoreRow}>
        <Text style={[styles.scoreNumber, { color: hasScore ? scoreColor(avgScore!) : '#ccc' }]}>
          {hasScore ? avgScore : '--'}
        </Text>
        {hasScore && (
          <Text style={[styles.scoreLabel, { color: scoreColor(avgScore!) }]}>
            {getScoreLabel(avgScore!).label}
          </Text>
        )}
        {hasScore && scoredRecords.some((r) => r.isPersonalized) && (
          <Text style={styles.personalizedBadge}>★ 내 신체 기준</Text>
        )}
      </View>

      {/* ③ AI 코멘트 */}
      {hasScore && latestComment ? (
        <View style={styles.commentBox}>
          <Text style={styles.commentIcon}>💡</Text>
          <Text style={styles.comment}>{latestComment}</Text>
        </View>
      ) : null}

      {/* ⑤ 다음 끼니 제안 */}
      <View style={styles.nextMealBox}>
        <Text style={styles.nextMealIcon}>🍽</Text>
        <Text style={styles.nextMealSuggestion}>{nextMealSuggestion}</Text>
      </View>

      {/* ④ 끼니별 점수 바 */}
      {hasScore ? (
        <View style={styles.barsRow}>
          {MEAL_SLOTS.map((slot) => {
            const s = mealAvg[slot];
            return (
              <View key={slot} style={styles.barItem}>
                <Text style={styles.barMealLabel}>{MEAL_LABELS[slot]}</Text>
                <View style={styles.barTrack}>
                  {s !== null && (
                    <View
                      style={[
                        styles.barFill,
                        { width: `${s}%` as `${number}%`, backgroundColor: scoreColor(s) },
                      ]}
                    />
                  )}
                </View>
                <Text style={styles.barScore}>{s !== null ? s : '-'}</Text>
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(29,158,117,0.18)',
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    width: '100%',
    shadowColor: '#0F3F1A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 3,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  titleText: {
    fontSize: 13,
    color: '#888',
  },
  countText: {
    fontSize: 12,
    color: '#aaa',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 4,
  },
  scoreNumber: {
    fontSize: 38,
    fontWeight: 'bold',
    lineHeight: 42,
  },
  scoreLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  commentBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(29,158,117,0.08)',
    borderRadius: 8,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 6,
    gap: 6,
  },
  commentIcon: {
    fontSize: 13,
    lineHeight: 18,
  },
  comment: {
    flex: 1,
    fontSize: 12.5,
    color: '#0F6E56',
    lineHeight: 18,
    fontWeight: '500',
  },
  nextMealBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 4,
    marginBottom: 6,
  },
  nextMealIcon: {
    fontSize: 12,
    lineHeight: 17,
  },
  nextMealSuggestion: {
    flex: 1,
    fontSize: 12,
    color: '#555',
    lineHeight: 17,
  },
  barsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  barItem: {
    flex: 1,
    alignItems: 'stretch',
    gap: 2,
  },
  barMealLabel: {
    fontSize: 10,
    color: '#999',
    marginBottom: 2,
  },
  barTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  barFill: {
    height: 5,
    borderRadius: 3,
  },
  barScore: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  personalizedBadge: {
    fontSize: 10,
    color: '#1D9E75',
    fontWeight: '600',
    marginLeft: 4,
    alignSelf: 'flex-end',
    marginBottom: 4,
  },
});
