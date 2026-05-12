import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  GeminiApiKeyError,
  GeminiNetworkError,
  GeminiParseError,
  generateGuide,
} from '../src/api/gemini';
import { MontageButton } from '../src/components/montage/MontageButton';
import { MontageCard } from '../src/components/montage/MontageCard';
import {
  COLORS,
  FONT_WEIGHT,
  GLYCEMIC_COLOR,
  RADIUS,
  SPACING,
  SQUIRCLE,
  TYPOGRAPHY,
} from '../src/constants/theme';
import {
  fetchRecordsByDate,
  persistUpdateRecord,
  useFoodStore,
} from '../src/store/foodStore';
import {
  type AIGuide,
  type FoodRecord,
  type GlycemicLevel,
} from '../src/types/food';

const LEVEL_KO: Record<GlycemicLevel, string> = {
  low: '낮음', moderate: '보통', high: '높음', veryHigh: '매우 높음',
};

const CARDS: { field: keyof AIGuide; icon: string; title: string }[] = [
  { field: 'immediateAction',    icon: '⚡', title: '지금 바로' },
  { field: 'nextMealSuggestion', icon: '🥗', title: '다음 식사' },
  { field: 'dailySummary',       icon: '✨', title: '오늘의 총평' },
];

type Displayed = Record<keyof AIGuide, string>;

function computeGiLevel(avgGi: number): GlycemicLevel {
  if (avgGi <= 55) return 'low';
  if (avgGi <= 69) return 'moderate';
  if (avgGi <= 89) return 'high';
  return 'veryHigh';
}

function summarize(records: FoodRecord[]): { totalCalories: number; giLevel: GlycemicLevel } {
  const foods = records.flatMap((r) => r.foods);
  const totalCalories = foods.reduce((s, f) => s + f.calories, 0);
  const avgGi = foods.length > 0 ? foods.reduce((s, f) => s + f.gi, 0) / foods.length : 0;
  return { totalCalories, giLevel: computeGiLevel(avgGi) };
}

function GuideCard({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <MontageCard style={styles.guideCard}>
      <View style={styles.guideCardHeader}>
        <Text style={styles.guideCardIcon}>{icon}</Text>
        <Text style={styles.guideCardTitle}>{title}</Text>
      </View>
      <Text style={styles.guideCardBody}>{text || ' '}</Text>
    </MontageCard>
  );
}

export function GuideScreen() {
  const { recordId, ts, regenerate } = useLocalSearchParams<{
    recordId?: string;
    ts?: string;
    regenerate?: string;
  }>();
  const shouldRegenerate = regenerate === '1';
  const { getRecordById, getTodayRecords, updateRecord } = useFoodStore();

  const [contextRecords, setContextRecords] = useState<FoodRecord[] | null>(null);
  const [contextError, setContextError] = useState<string | null>(null);
  const [guide, setGuide]       = useState<AIGuide | null>(null);
  const [hasCachedGuide, setHasCachedGuide] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [error, setError]       = useState<string | null>(null);
  const [displayed, setDisplayed] = useState<Displayed>({
    immediateAction: '', nextMealSuggestion: '', dailySummary: '',
  });
  const timersRef = useRef<number[]>([]);

  function clearTimers() { timersRef.current.forEach(clearTimeout); timersRef.current = []; }

  function startTyping(g: AIGuide) {
    clearTimers();
    setDisplayed({ immediateAction: '', nextMealSuggestion: '', dailySummary: '' });
    CARDS.forEach(({ field }, cardIdx) => {
      const text = g[field];
      let charIdx = 0;
      const tick = () => {
        charIdx++;
        setDisplayed((prev) => ({ ...prev, [field]: text.slice(0, charIdx) }));
        if (charIdx < text.length) {
          const id = setTimeout(tick, 15) as unknown as number;
          timersRef.current.push(id);
        }
      };
      const id = setTimeout(tick, cardIdx * 400) as unknown as number;
      timersRef.current.push(id);
    });
  }

  // 1) 컨텍스트 기록 결정 (recordId 우선, 없으면 오늘 전체)
  useEffect(() => {
    let cancelled = false;
    async function resolveContext() {
      if (recordId) {
        const inMemory = getRecordById(recordId);
        if (inMemory) {
          if (!cancelled) setContextRecords([inMemory]);
          return;
        }
        if (ts) {
          const dateRecords = await fetchRecordsByDate(
            new Date(Number(ts)).toISOString().slice(0, 10),
          );
          const found = dateRecords.find((r) => r.id === recordId);
          if (!cancelled) {
            if (found) setContextRecords([found]);
            else setContextError('해당 기록을 찾을 수 없습니다.');
          }
          return;
        }
        if (!cancelled) setContextError('해당 기록을 찾을 수 없습니다.');
        return;
      }
      if (!cancelled) setContextRecords(getTodayRecords());
    }
    resolveContext();
    return () => { cancelled = true; clearTimers(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recordId, ts]);

  // 2) 컨텍스트 결정되면 가이드 호출 (단건 컨텍스트에 저장된 가이드 있으면 재사용)
  useEffect(() => {
    if (contextRecords === null) return;
    if (contextRecords.length === 0) {
      setLoading(false);
      return;
    }
    const cached = !shouldRegenerate && recordId && contextRecords.length === 1
      ? contextRecords[0].aiGuide
      : undefined;
    if (cached) {
      setHasCachedGuide(true);
      setGuide(cached);
      startTyping(cached);
      setLoading(false);
      return;
    }
    setHasCachedGuide(false);
    runGuide(contextRecords);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextRecords]);

  async function runGuide(records: FoodRecord[]) {
    setLoading(true);
    setError(null);
    setHasCachedGuide(false);
    try {
      const g = await generateGuide(records);
      setGuide(g);
      startTyping(g);
    } catch (err) {
      console.warn('[guide] generateGuide failed:', err);
      if (err instanceof GeminiApiKeyError) {
        setError('API 키가 설정되지 않았습니다. .env의 EXPO_PUBLIC_GEMINI_API_KEY를 확인해주세요.');
      } else if (err instanceof GeminiNetworkError) {
        const detail = err.status ? ` (status ${err.status})` : '';
        setError(`네트워크 오류가 발생했습니다${detail}. 잠시 후 다시 시도해주세요.`);
      } else if (err instanceof GeminiParseError) {
        setError('AI 응답을 해석하지 못했어요. 다시 시도해주세요.');
      } else {
        setError('AI 가이드를 생성할 수 없었습니다. 잠시 후 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveGuide() {
    if (!guide) return;

    if (recordId) {
      const inMemory = getRecordById(recordId);
      if (inMemory) updateRecord(recordId, { aiGuide: guide });
      if (ts) {
        await persistUpdateRecord(recordId, Number(ts), { aiGuide: guide });
      }
    } else if (contextRecords && contextRecords.length > 0) {
      const latest = contextRecords[contextRecords.length - 1];
      updateRecord(latest.id, { aiGuide: guide });
    }

    Alert.alert('저장 완료', 'AI 가이드가 저장되었습니다.', [
      { text: '확인', onPress: () => router.back() },
    ]);
  }

  const summary = summarize(contextRecords ?? []);
  const showEmpty = contextRecords !== null && contextRecords.length === 0 && !contextError;

  if (contextError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyWrap}>
          <Text style={{ fontSize: 52, marginBottom: SPACING.pt08 }}>🔍</Text>
          <Text style={styles.emptyTitle}>{contextError}</Text>
          <MontageButton label="돌아가기" onPress={() => router.back()} size="medium" />
        </View>
      </SafeAreaView>
    );
  }

  if (showEmpty) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyWrap}>
          <Text style={{ fontSize: 52, marginBottom: SPACING.pt08 }}>🍽️</Text>
          <Text style={styles.emptyTitle}>오늘 먹은 음식을 먼저 기록해주세요</Text>
          <MontageButton label="음식 기록하기" onPress={() => router.push('/camera')} size="medium" />
        </View>
      </SafeAreaView>
    );
  }

  const screenTitle = recordId ? 'AI 가이드' : '오늘의 혈당 리포트';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backLabel}>← 돌아가기</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>{screenTitle}</Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: GLYCEMIC_COLOR[summary.giLevel] }]}>
          <Text style={styles.summaryGiLabel}>혈당 영향도</Text>
          <Text style={styles.summaryGiValue}>{LEVEL_KO[summary.giLevel]}</Text>
          <View style={styles.summaryDivider} />
          <Text style={styles.summaryCalLabel}>
            {recordId ? '이 식사 칼로리' : '오늘 총 칼로리'}
          </Text>
          <Text style={styles.summaryCalValue}>{summary.totalCalories} kcal</Text>
        </View>

        {isLoading && (
          <MontageCard style={styles.loadingCard}>
            <Text style={styles.loadingText}>🤖 AI가 식단을 분석하고 있어요...</Text>
          </MontageCard>
        )}

        {error && (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
            <MontageButton
              label="다시 시도"
              onPress={() => contextRecords && runGuide(contextRecords)}
              size="small"
            />
          </View>
        )}

        {CARDS.map(({ field, icon, title }) => (
          <GuideCard key={field} icon={icon} title={title} text={displayed[field]} />
        ))}

        {guide && !error && (
          <View style={styles.actionsCol}>
            {recordId && (
              <MontageButton
                label="🔄 다시 생성"
                onPress={() => contextRecords && runGuide(contextRecords)}
                variant="outlined"
                size="medium"
                fullWidth
              />
            )}
            <MontageButton
              label={hasCachedGuide ? '저장됨' : '기록 저장'}
              onPress={handleSaveGuide}
              size="large"
              fullWidth
              disabled={hasCachedGuide}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background.normalAlternative },
  scroll: { paddingHorizontal: SPACING.pt20, paddingBottom: SPACING.pt48, gap: SPACING.pt16 },

  header: { paddingTop: SPACING.pt08, gap: SPACING.pt08 },
  backLabel: { ...TYPOGRAPHY.label1, color: COLORS.primary.normal, fontWeight: FONT_WEIGHT.medium },
  screenTitle: { ...TYPOGRAPHY.title3, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.bold },

  summaryCard: {
    borderRadius: RADIUS.extraLarge,
    padding: SPACING.pt24,
    gap: 2,
    ...SQUIRCLE,
  },
  summaryGiLabel: { ...TYPOGRAPHY.label2, color: 'rgba(255,255,255,0.8)', fontWeight: FONT_WEIGHT.medium },
  summaryGiValue: { ...TYPOGRAPHY.title1, color: COLORS.static.white, fontWeight: FONT_WEIGHT.bold },
  summaryDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.3)', marginVertical: SPACING.pt12 },
  summaryCalLabel: { ...TYPOGRAPHY.label2, color: 'rgba(255,255,255,0.8)', fontWeight: FONT_WEIGHT.medium },
  summaryCalValue: { ...TYPOGRAPHY.heading1, color: COLORS.static.white, fontWeight: FONT_WEIGHT.bold },

  loadingCard: { alignItems: 'center', paddingVertical: SPACING.pt24 },
  loadingText: { ...TYPOGRAPHY.body2, color: COLORS.label.alternative },

  errorCard: {
    backgroundColor: 'rgba(255,66,66,0.08)',
    borderRadius: RADIUS.large,
    padding: SPACING.pt16,
    gap: SPACING.pt12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.status.negative,
    ...SQUIRCLE,
  },
  errorText: { ...TYPOGRAPHY.body2, color: COLORS.label.normal },

  actionsCol: { gap: SPACING.pt08 },
  guideCard: { gap: SPACING.pt12 },
  guideCardHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.pt08 },
  guideCardIcon: { fontSize: 20 },
  guideCardTitle: { ...TYPOGRAPHY.label1, color: COLORS.label.alternative, fontWeight: FONT_WEIGHT.semiBold },
  guideCardBody: { ...TYPOGRAPHY.body2, color: COLORS.label.normal, lineHeight: 22 },

  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.pt12, padding: SPACING.pt32 },
  emptyTitle: { ...TYPOGRAPHY.body1, color: COLORS.label.normal, textAlign: 'center', lineHeight: 24, fontWeight: FONT_WEIGHT.semiBold },
});

export default GuideScreen;
