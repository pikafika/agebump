import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GeminiApiKeyError, GeminiNetworkError, generateGuide } from '../src/api/gemini';
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
import { useFoodStore } from '../src/store/foodStore';
import { type AIGuide, type GlycemicLevel } from '../src/types/food';

const LEVEL_KO: Record<GlycemicLevel, string> = {
  low: '낮음', moderate: '보통', high: '높음', veryHigh: '매우 높음',
};

const CARDS: { field: keyof AIGuide; icon: string; title: string }[] = [
  { field: 'immediateAction',    icon: '⚡', title: '지금 바로' },
  { field: 'nextMealSuggestion', icon: '🥗', title: '다음 식사' },
  { field: 'dailySummary',       icon: '✨', title: '오늘의 총평' },
];

type Displayed = Record<keyof AIGuide, string>;

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
  const { getTodayRecords, getTodayTotalCalories, getTodayGlycemicSummary, updateRecord } = useFoodStore();
  const todayRecords = getTodayRecords();
  const totalCalories = getTodayTotalCalories();
  const giLevel = getTodayGlycemicSummary();

  const [guide, setGuide]       = useState<AIGuide | null>(null);
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

  async function runGuide() {
    setLoading(true);
    setError(null);
    try {
      const g = await generateGuide(todayRecords);
      setGuide(g);
      startTyping(g);
    } catch (err) {
      if (err instanceof GeminiApiKeyError) setError('API 키가 설정되지 않았습니다.');
      else if (err instanceof GeminiNetworkError) setError('네트워크 오류가 발생했습니다.');
      else setError('AI 가이드를 생성할 수 없었습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (todayRecords.length > 0) runGuide();
    else setLoading(false);
    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSaveGuide() {
    if (!guide || todayRecords.length === 0) return;
    const latest = todayRecords[todayRecords.length - 1];
    updateRecord(latest.id, { aiGuide: guide });
    Alert.alert('저장 완료', 'AI 가이드가 저장되었습니다.', [
      { text: '확인', onPress: () => router.back() },
    ]);
  }

  if (!isLoading && todayRecords.length === 0) {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backLabel}>← 돌아가기</Text>
          </TouchableOpacity>
          <Text style={styles.screenTitle}>오늘의 혈당 리포트</Text>
        </View>

        {/* 요약 카드 */}
        <View style={[styles.summaryCard, { backgroundColor: GLYCEMIC_COLOR[giLevel] }]}>
          <Text style={styles.summaryGiLabel}>혈당 영향도</Text>
          <Text style={styles.summaryGiValue}>{LEVEL_KO[giLevel]}</Text>
          <View style={styles.summaryDivider} />
          <Text style={styles.summaryCalLabel}>오늘 총 칼로리</Text>
          <Text style={styles.summaryCalValue}>{totalCalories} kcal</Text>
        </View>

        {/* 로딩 */}
        {isLoading && (
          <MontageCard style={styles.loadingCard}>
            <Text style={styles.loadingText}>🤖 AI가 오늘 식단을 분석하고 있어요...</Text>
          </MontageCard>
        )}

        {/* 에러 */}
        {error && (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{error}</Text>
            <MontageButton label="다시 시도" onPress={runGuide} size="small" />
          </View>
        )}

        {/* AI 가이드 카드 */}
        {CARDS.map(({ field, icon, title }) => (
          <GuideCard key={field} icon={icon} title={title} text={displayed[field]} />
        ))}

        {/* 저장 */}
        {guide && !error && (
          <MontageButton label="기록 저장" onPress={handleSaveGuide} size="large" fullWidth />
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

  guideCard: { gap: SPACING.pt12 },
  guideCardHeader: { flexDirection: 'row', alignItems: 'center', gap: SPACING.pt08 },
  guideCardIcon: { fontSize: 20 },
  guideCardTitle: { ...TYPOGRAPHY.label1, color: COLORS.label.alternative, fontWeight: FONT_WEIGHT.semiBold },
  guideCardBody: { ...TYPOGRAPHY.body2, color: COLORS.label.normal, lineHeight: 22 },

  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.pt12, padding: SPACING.pt32 },
  emptyTitle: { ...TYPOGRAPHY.body1, color: COLORS.label.normal, textAlign: 'center', lineHeight: 24, fontWeight: FONT_WEIGHT.semiBold },
});

export default GuideScreen;
