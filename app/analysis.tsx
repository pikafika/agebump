import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { analyzeFood, analyzeFoodText, GeminiNetworkError } from '../src/api/gemini';
import { GlycemicGauge } from '../src/components/food/GlycemicGauge';
import { NutritionBar } from '../src/components/food/NutritionBar';
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
import { type FoodAnalysisResult, type FoodItem, type FoodRecord, type MealType } from '../src/types/food';
import { imageToBase64 } from '../src/utils/imageUtils';

function detectMealType(): MealType {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 10) return 'breakfast';
  if (hour >= 10 && hour < 14) return 'lunch';
  if (hour >= 14 && hour < 19) return 'dinner';
  return 'snack';
}

function SkeletonBlock({ height }: { height: number }) {
  return <View style={[styles.skeleton, { height }]} />;
}

function SkeletonView() {
  return (
    <View style={styles.skeletonWrap}>
      <SkeletonBlock height={160} />
      <SkeletonBlock height={88} />
      <SkeletonBlock height={108} />
      <ActivityIndicator color={COLORS.primary.normal as string} style={{ marginTop: SPACING.pt16 }} />
      <Text style={styles.skeletonLabel}>AI가 음식을 분석하고 있어요...</Text>
    </View>
  );
}

interface ErrorViewProps { message: string; isNetwork: boolean; onRetry: () => void }
function ErrorView({ message, isNetwork, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.errorWrap}>
      <Text style={styles.errorEmoji}>{isNetwork ? '📡' : '🔍'}</Text>
      <Text style={styles.errorTitle}>{isNetwork ? '연결 실패' : '인식 실패'}</Text>
      <Text style={styles.errorBody}>{message}</Text>
      <MontageButton
        label={isNetwork ? '다시 시도' : '재촬영하기'}
        onPress={onRetry}
        size="medium"
      />
    </View>
  );
}

const MEAL_OPTIONS: { type: MealType; label: string; icon: string }[] = [
  { type: 'breakfast', label: '아침', icon: '🌅' },
  { type: 'lunch',     label: '점심', icon: '☀️' },
  { type: 'dinner',    label: '저녁', icon: '🌙' },
  { type: 'snack',     label: '간식', icon: '🍎' },
];

interface MealTypePickerProps {
  value: MealType;
  onChange: (t: MealType) => void;
}
function MealTypePicker({ value, onChange }: MealTypePickerProps) {
  return (
    <View style={styles.pickerWrap}>
      <View style={styles.pickerHeader}>
        <Text style={styles.pickerTitle}>식사 유형</Text>
        <Text style={styles.pickerHint}>현재 시간 기준으로 자동 추천됩니다</Text>
      </View>
      <View style={styles.pickerRow}>
        {MEAL_OPTIONS.map(({ type, label, icon }) => {
          const active = value === type;
          return (
            <TouchableOpacity
              key={type}
              style={[styles.mealChip, active && styles.mealChipActive]}
              onPress={() => onChange(type)}
              activeOpacity={0.7}
            >
              <Text style={styles.mealChipIcon}>{icon}</Text>
              <Text style={[styles.mealChipLabel, active && styles.mealChipLabelActive]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export function AnalysisScreen() {
  const { imageUri, foodName } = useLocalSearchParams<{ imageUri?: string; foodName?: string }>();
  const { addRecord, setIsAnalyzing } = useFoodStore();

  const [result, setResult] = useState<FoodAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [memo, setMemo] = useState('');
  const [mealType, setMealType] = useState<MealType>(detectMealType);

  async function runAnalysis() {
    setIsLoading(true);
    setErrorMessage(null);
    setIsNetworkError(false);
    setIsAnalyzing(true);
    try {
      let res: FoodAnalysisResult;
      if (imageUri) {
        const base64 = await imageToBase64(decodeURIComponent(imageUri));
        res = await analyzeFood(base64);
      } else if (foodName) {
        res = await analyzeFoodText(decodeURIComponent(foodName));
      } else {
        throw new Error('이미지 또는 음식명이 필요합니다.');
      }
      if (res.error) setErrorMessage(res.error);
      else setResult(res);
    } catch (err) {
      setIsNetworkError(err instanceof GeminiNetworkError);
      setErrorMessage(
        err instanceof GeminiNetworkError
          ? '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.'
          : '음식을 인식할 수 없어요. 다시 시도해주세요.',
      );
    } finally {
      setIsLoading(false);
      setIsAnalyzing(false);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { runAnalysis(); }, []);

  function handleSave() {
    if (!result) return;
    const record: FoodRecord = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      mealType,
      foods: result.foods,
      imageUri: imageUri ? decodeURIComponent(imageUri) : undefined,
      memo: memo.trim() || undefined,
    };
    addRecord(record);
    Alert.alert('저장 완료', '식사 기록이 저장되었습니다.', [
      { text: '확인', onPress: () => router.replace('/(tabs)') },
    ]);
  }

  const decodedUri = imageUri ? decodeURIComponent(imageUri) : null;
  const allFoods: FoodItem[] = result?.foods ?? [];
  const totalCarbs   = allFoods.reduce((s, f) => s + f.carbs, 0);
  const totalProtein = allFoods.reduce((s, f) => s + f.protein, 0);
  const totalFat     = allFoods.reduce((s, f) => s + f.fat, 0);
  const maxSpikeRisk = allFoods.reduce((m, f) => Math.max(m, f.spikeRisk), 0);
  const foodNames    = allFoods.map((f) => f.name).join(', ');

  if (isLoading) {
    return <SafeAreaView style={styles.container}><SkeletonView /></SafeAreaView>;
  }

  if (errorMessage) {
    return (
      <SafeAreaView style={styles.container}>
        <ErrorView
          message={errorMessage}
          isNetwork={isNetworkError}
          onRetry={isNetworkError ? runAnalysis : () => router.back()}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* 뒤로가기 */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backLabel}>← 돌아가기</Text>
        </TouchableOpacity>

        {/* 음식 헤더 */}
        <MontageCard style={styles.heroCard} elevated={false}>
          {decodedUri ? (
            <Image source={{ uri: decodedUri }} style={styles.thumbnail} resizeMode="cover" />
          ) : (
            <View style={styles.thumbnailPlaceholder}>
              <Text style={{ fontSize: 48 }}>🍽️</Text>
            </View>
          )}
          <View style={styles.heroInfo}>
            <Text style={styles.foodNames} numberOfLines={2}>{foodNames}</Text>
            <Text style={styles.calories}>{result?.totalCalories ?? 0} <Text style={styles.caloriesUnit}>kcal</Text></Text>
          </View>
        </MontageCard>

        {/* 혈당 스파이크 경고 */}
        {maxSpikeRisk > 60 && (
          <View style={styles.spikeBanner}>
            <Text style={styles.spikeBannerText}>⚡ 혈당 스파이크 위험이 있어요</Text>
          </View>
        )}

        {/* 영양 차트 */}
        <NutritionBar carbs={totalCarbs} protein={totalProtein} fat={totalFat} />
        {result && (
          <GlycemicGauge giLevel={result.overallGiLevel} gi={result.foods[0]?.gi ?? 0} />
        )}

        {/* 면책 */}
        <Text style={styles.disclaimer}>
          {result?.disclaimer ?? 'AI 추정값으로 참고용입니다. 전문의 상담을 권장합니다.'}
        </Text>

        {/* 식사 유형 선택 */}
        <MealTypePicker value={mealType} onChange={setMealType} />

        {/* 메모 */}
        <View style={styles.memoWrap}>
          <Text style={styles.memoLabel}>메모</Text>
          <TextInput
            style={styles.memoInput}
            value={memo}
            onChangeText={setMemo}
            placeholder="오늘 식사에 대해 기록해두세요 (선택)"
            placeholderTextColor={COLORS.label.assistive as string}
            multiline
          />
        </View>

        {/* 액션 */}
        <View style={styles.actions}>
          <MontageButton label="저장하기" onPress={handleSave} size="large" fullWidth />
          <MontageButton
            label="🤖 AI 가이드 받기"
            onPress={() => router.push('/guide')}
            variant="outlined"
            size="large"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background.normalAlternative },
  scroll: { paddingHorizontal: SPACING.pt20, paddingBottom: SPACING.pt48, gap: SPACING.pt16 },

  skeletonWrap: { flex: 1, padding: SPACING.pt20, gap: SPACING.pt12 },
  skeleton: { borderRadius: RADIUS.large, backgroundColor: COLORS.fill.normal, ...SQUIRCLE },
  skeletonLabel: { ...TYPOGRAPHY.label1, color: COLORS.label.assistive, textAlign: 'center', marginTop: SPACING.pt08 },

  errorWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.pt32, gap: SPACING.pt12 },
  errorEmoji: { fontSize: 52, marginBottom: SPACING.pt08 },
  errorTitle: { ...TYPOGRAPHY.heading2, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.bold },
  errorBody: { ...TYPOGRAPHY.body2, color: COLORS.label.alternative, textAlign: 'center', lineHeight: 22 },

  backBtn: { paddingTop: SPACING.pt08 },
  backLabel: { ...TYPOGRAPHY.label1, color: COLORS.primary.normal, fontWeight: FONT_WEIGHT.medium },

  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.pt16,
    backgroundColor: COLORS.background.elevated,
    borderRadius: RADIUS.extraLarge,
    padding: SPACING.pt16,
    ...SQUIRCLE,
  },
  thumbnail: { width: 88, height: 88, borderRadius: RADIUS.large, ...SQUIRCLE },
  thumbnailPlaceholder: {
    width: 88, height: 88, borderRadius: RADIUS.large,
    backgroundColor: COLORS.fill.normal,
    alignItems: 'center', justifyContent: 'center',
    ...SQUIRCLE,
  },
  heroInfo: { flex: 1, gap: SPACING.pt04 },
  foodNames: { ...TYPOGRAPHY.heading2, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.bold },
  calories: { ...TYPOGRAPHY.title2, color: COLORS.primary.normal, fontWeight: FONT_WEIGHT.bold },
  caloriesUnit: { ...TYPOGRAPHY.body1, color: COLORS.label.alternative, fontWeight: FONT_WEIGHT.regular },

  spikeBanner: {
    backgroundColor: 'rgba(255,66,66,0.08)',
    borderRadius: RADIUS.medium,
    padding: SPACING.pt12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.status.negative,
    ...SQUIRCLE,
  },
  spikeBannerText: { ...TYPOGRAPHY.label1, color: COLORS.status.negative, fontWeight: FONT_WEIGHT.semiBold },

  disclaimer: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.label.assistive,
    textAlign: 'center',
    paddingHorizontal: SPACING.pt08,
  },

  memoWrap: { gap: SPACING.pt08 },
  memoLabel: { ...TYPOGRAPHY.label1, color: COLORS.label.alternative, fontWeight: FONT_WEIGHT.medium },
  memoInput: {
    backgroundColor: COLORS.background.elevated,
    borderRadius: RADIUS.large,
    padding: SPACING.pt16,
    ...TYPOGRAPHY.body2,
    color: COLORS.label.normal,
    borderWidth: 1,
    borderColor: COLORS.line.solidNormal,
    minHeight: 80,
    ...SQUIRCLE,
  },

  actions: { gap: SPACING.pt08, paddingTop: SPACING.pt08 },

  pickerWrap: { gap: SPACING.pt12 },
  pickerHeader: { gap: SPACING.pt04 },
  pickerTitle: { ...TYPOGRAPHY.label1, color: COLORS.label.alternative, fontWeight: FONT_WEIGHT.medium },
  pickerHint: { ...TYPOGRAPHY.caption1, color: COLORS.label.assistive },
  pickerRow: { flexDirection: 'row', gap: SPACING.pt08 },
  mealChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.pt12,
    borderRadius: RADIUS.large,
    backgroundColor: COLORS.fill.normal,
    gap: SPACING.pt04,
    ...SQUIRCLE,
  },
  mealChipActive: {
    backgroundColor: COLORS.primary.normal,
  },
  mealChipIcon: { fontSize: 20 },
  mealChipLabel: { ...TYPOGRAPHY.caption1, color: COLORS.label.alternative, fontWeight: FONT_WEIGHT.medium },
  mealChipLabelActive: { color: '#fff', fontWeight: FONT_WEIGHT.semiBold },
});

export default AnalysisScreen;
