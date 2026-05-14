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
      </View>

      {/* ③ AI 코멘트 */}
      {hasScore && latestComment ? (
        <Text style={styles.comment} numberOfLines={1}>
          💡 {latestComment}
        </Text>
      ) : null}

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
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
    width: '100%',
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
    fontSize: 12,
    color: '#888',
  },
  countText: {
    fontSize: 11,
    color: '#aaa',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 4,
  },
  scoreNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  scoreLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  comment: {
    fontSize: 11,
    color: '#0F6E56',
    marginBottom: 6,
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
    fontSize: 9,
    color: '#999',
    marginBottom: 2,
  },
  barTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  barFill: {
    height: 4,
    borderRadius: 2,
  },
  barScore: {
    fontSize: 9,
    color: '#999',
    marginTop: 2,
  },
});
