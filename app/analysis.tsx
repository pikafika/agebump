import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { analyzeFood, analyzeFoodText, GeminiHttpError, GeminiNetworkError } from '../src/api/gemini';
import { GlycemicGauge } from '../src/components/food/GlycemicGauge';
import { NutritionBar } from '../src/components/food/NutritionBar';
import { MontageButton } from '../src/components/montage/MontageButton';
import { MontageCard } from '../src/components/montage/MontageCard';
import { Toast } from '../src/components/Toast';
import {
  COLORS,
  FONT_WEIGHT,
  GLYCEMIC_COLOR,
  RADIUS,
  SPACING,
  SQUIRCLE,
  TYPOGRAPHY,
} from '../src/constants/theme';
import { analyticsService } from '../src/services/analyticsService';
import { useAuthStore } from '../src/store/authStore';
import { fetchRecordsByDate, useFoodStore } from '../src/store/foodStore';
import { getMemo, setMemo as persistMemo } from '../src/store/memoStore';
import { useShallow } from 'zustand/react/shallow';
import { useUserProfileStore } from '../src/store/userProfileStore';
import { type FoodAnalysisResult, type FoodItem, type FoodRecord, type FoodTypeCategory, type MealType } from '../src/types/food';
import { clearPendingBase64, clearPendingImageUri, getPendingBase64, getPendingImageUri } from '../src/store/pendingImageStore';
import { imageToBase64 } from '../src/utils/imageUtils';
import { calculateScore, getScoreLabel } from '../src/utils/scoreCalculator';

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

interface ErrorViewProps { message: string; detail?: string; isNetwork: boolean; onRetry: () => void }
function ErrorView({ message, detail, isNetwork, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.errorWrap}>
      <Text style={styles.errorEmoji}>{isNetwork ? '📡' : '🔍'}</Text>
      <Text style={styles.errorTitle}>{isNetwork ? '연결 실패' : '인식 실패'}</Text>
      <Text style={styles.errorBody}>{message}</Text>
      {detail ? <Text style={styles.errorDetail}>{detail}</Text> : null}
      <MontageButton
        label={isNetwork ? '다시 시도' : '재촬영하기'}
        onPress={onRetry}
        size="medium"
      />
    </View>
  );
}

function describeError(err: unknown): { isNetwork: boolean; message: string; detail: string } {
  if (err instanceof GeminiHttpError) {
    const isAuth = err.status === 401 || err.status === 403;
    const isRate = err.status === 429;
    const retryHint =
      isRate && err.retryDelaySec
        ? ` 약 ${err.retryDelaySec}초 뒤에 다시 시도해주세요.`
        : ' 잠시 후 다시 시도해주세요.';
    const userMsg = isAuth
      ? 'API 키 권한 문제로 분석에 실패했어요. 설정을 확인해주세요.'
      : isRate
        ? `AI 사용량(무료 티어 일일 한도)을 초과했어요.${retryHint}`
        : (err.status ?? 0) >= 500
          ? 'AI 서버 일시 오류예요. 잠시 후 다시 시도해주세요.'
          : '요청을 처리하지 못했어요. 다른 사진/음식명으로 시도해주세요.';
    return { isNetwork: true, message: userMsg, detail: `HTTP ${err.status} · ${err.apiMessage}` };
  }
  if (err instanceof GeminiNetworkError) {
    return {
      isNetwork: true,
      message: '네트워크 연결을 확인해주세요. Wi-Fi 또는 모바일 데이터가 활성화되어 있어야 해요.',
      detail: err.message,
    };
  }
  return {
    isNetwork: false,
    message: '음식을 인식할 수 없어요. 다시 시도해주세요.',
    detail: err instanceof Error ? err.message : String(err),
  };
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

interface AlternateChipsProps {
  names: string[];
  onPick: (name: string) => void;
}
function AlternateChips({ names, onPick }: AlternateChipsProps) {
  if (names.length === 0) return null;
  return (
    <View style={styles.altWrap}>
      <Text style={styles.altLabel}>이거 아닌가요?</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.altRow}
      >
        {names.map((n) => (
          <TouchableOpacity
            key={n}
            style={styles.altChip}
            onPress={() => onPick(n)}
            activeOpacity={0.7}
          >
            <Text style={styles.altChipLabel}>{n}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function levelFromGi(gi: number): FoodAnalysisResult['overallGiLevel'] {
  if (gi <= 55) return 'low';
  if (gi <= 69) return 'moderate';
  if (gi <= 89) return 'high';
  return 'veryHigh';
}

export function AnalysisScreen() {
  const { imageUri, foodName, recordId, recordDate } = useLocalSearchParams<{
    imageUri?: string;
    foodName?: string;
    recordId?: string;
    recordDate?: string;
  }>();
  const { addRecord, setIsAnalyzing, getRecordById } = useFoodStore();
  const authUser = useAuthStore((s) => s.user);
  const userProfile = useUserProfileStore(useShallow((s) => ({
    age: s.age,
    gender: s.gender,
    height: s.height,
    weight: s.weight,
  })));
  const isViewingSaved = Boolean(recordId);

  const [result, setResult] = useState<FoodAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isNetworkError, setIsNetworkError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [memo, setMemo] = useState('');
  const [mealType, setMealType] = useState<MealType>(detectMealType);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState('');
  // 저장 성공 토스트 — 웹/네이티브 공통 (Alert.alert이 웹에서 no-op이라 별도 피드백 필요)
  const [savedToast, setSavedToast] = useState(false);
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
    },
    [],
  );
  // 웹 카메라 경로: base64(camera.tsx에서 변환 완료) 또는 URI(레거시 폴백)
  type WebSource = { kind: 'base64'; data: string } | { kind: 'uri'; data: string };
  const [webSource] = useState<WebSource | null>(() => {
    if (Platform.OS === 'web' && !imageUri && !foodName && !recordId) {
      const b64 = getPendingBase64();
      if (b64) { clearPendingBase64(); return { kind: 'base64', data: b64 }; }
      const uri = getPendingImageUri();
      if (uri) { clearPendingImageUri(); return { kind: 'uri', data: uri }; }
    }
    return null;
  });

  async function runAnalysis() {
    setIsLoading(true);
    setErrorMessage(null);
    setErrorDetail(null);
    setIsNetworkError(false);
    setIsAnalyzing(true);
    const startMs = Date.now();
    try {
      let res: FoodAnalysisResult;
      if (recordId) {
        let saved = getRecordById(recordId);
        if (!saved && recordDate) {
          const dateRecords = await fetchRecordsByDate(recordDate);
          saved = dateRecords.find((r) => r.id === recordId);
        }
        if (!saved) throw new Error('기록을 찾을 수 없습니다.');
        const totalCalories = saved.foods.reduce((s, f) => s + f.calories, 0);
        const avgGi = saved.foods.length > 0
          ? saved.foods.reduce((s, f) => s + f.gi, 0) / saved.foods.length
          : 0;
        res = {
          foods: saved.foods,
          totalCalories,
          overallGiLevel: levelFromGi(avgGi),
          disclaimer: 'AI 추정값으로 참고용입니다.',
        };
        // 메모는 secure-store에서 비동기 로드. 레거시 record.memo도 보조 fallback.
        const securedMemo = await getMemo(saved.id);
        if (securedMemo) setMemo(securedMemo);
        else if (saved.memo) setMemo(saved.memo);
        setMealType(saved.mealType);
      } else if (imageUri) {
        const base64 = await imageToBase64(decodeURIComponent(imageUri));
        res = await analyzeFood(base64, userProfile);
      } else if (webSource) {
        // base64는 camera.tsx에서 이미 변환 완료 → 직접 사용; URI 폴백만 재변환
        const base64 = webSource.kind === 'base64'
          ? webSource.data
          : await imageToBase64(webSource.data);
        res = await analyzeFood(base64, userProfile);
      } else if (foodName) {
        res = await analyzeFoodText(decodeURIComponent(foodName), userProfile);
      } else {
        throw new Error('이미지 또는 음식명이 필요합니다.');
      }
      if (res.error) {
        setErrorMessage(res.error);
        setIsNetworkError(false);
        if (!recordId) {
          analyticsService.trackFoodAnalyzed(authUser?.uid ?? null, {
            method: imageUri || webSource ? 'image' : 'text',
            success: false,
            duration_ms: Date.now() - startMs,
          });
        }
      } else {
        setResult(res);
        if (!recordId) {
          analyticsService.trackFoodAnalyzed(authUser?.uid ?? null, {
            method: imageUri || webSource ? 'image' : 'text',
            success: true,
            duration_ms: Date.now() - startMs,
          });
        }
      }
    } catch (err) {
      console.error('[analysis] runAnalysis failed:', err);
      const { isNetwork, message, detail } = describeError(err);
      setIsNetworkError(isNetwork);
      setErrorMessage(message);
      setErrorDetail(detail);
      if (!recordId) {
        analyticsService.trackFoodAnalyzed(authUser?.uid ?? null, {
          method: imageUri || webSource ? 'image' : 'text',
          success: false,
          duration_ms: Date.now() - startMs,
        });
        analyticsService.trackApiError(authUser?.uid ?? null, {
          service: 'gemini',
          error_code: err instanceof Error ? err.constructor.name : 'unknown',
        });
      }
    } finally {
      setIsLoading(false);
      setIsAnalyzing(false);
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { runAnalysis(); }, []);

  async function handleNameSubmit(rawName: string) {
    const name = rawName.trim();
    setIsEditingName(false);
    const currentName = result?.foods[0]?.name ?? '';
    if (!name || name === currentName) return;
    setIsLoading(true);
    setErrorMessage(null);
    setErrorDetail(null);
    setIsNetworkError(false);
    setIsAnalyzing(true);
    try {
      const res = await analyzeFoodText(name);
      if (res.error) {
        setErrorMessage(res.error);
        setIsNetworkError(false);
      } else {
        setResult(res);
      }
    } catch (err) {
      console.error('[analysis] handleNameSubmit failed:', err);
      const { isNetwork, message, detail } = describeError(err);
      setIsNetworkError(isNetwork);
      setErrorMessage(message);
      setErrorDetail(detail);
    } finally {
      setIsLoading(false);
      setIsAnalyzing(false);
    }
  }

  async function handleSave() {
    if (!result) return;
    const newId = Date.now().toString();

    const avgGi =
      result.foods.length > 0
        ? result.foods.reduce((s, f) => s + f.gi, 0) / result.foods.length
        : 55;
    const sumCarbs = result.foods.reduce((s, f) => s + f.carbs, 0);
    const fiber = result.fiber_g ?? 0;
    const foodTypes = (result.food_types ?? []) as FoodTypeCategory[];
    const { score, isPersonalized } = calculateScore({ gi: avgGi, carbs: sumCarbs, fiber, foods: foodTypes, userProfile });
    const scoreLabel = getScoreLabel(score);

    const record: FoodRecord = {
      id: newId,
      timestamp: Date.now(),
      mealType,
      foods: result.foods,
      imageUri: imageUri
        ? decodeURIComponent(imageUri)
        : webSource
          ? webSource.kind === 'base64'
            ? `data:image/jpeg;base64,${webSource.data}`
            : webSource.data
          : undefined,
      gi_index: Math.round(avgGi),
      carbs_g: sumCarbs,
      fiber_g: fiber,
      food_types: foodTypes,
      score,
      scoreLabel,
      isPersonalized,
      comment: result.comment,
    };
    addRecord(record);
    analyticsService.trackRecordSaved(authUser?.uid ?? null, {
      meal_type: mealType,
      food_count: result.foods.length,
      has_image: !!(imageUri || webSource),
    });
    // 메모는 별도 secure-store에 저장 (record envelope에는 평문으로 남기지 않음)
    if (memo.trim().length > 0) {
      await persistMemo(newId, memo);
    }
    // 저장 완료 토스트를 잠깐 띄운 뒤 홈으로 이동 (웹·네이티브 동일 동작)
    setSavedToast(true);
    navTimerRef.current = setTimeout(() => router.replace('/(tabs)'), 900);
  }

  // 이미 저장된 기록의 메모 편집 시 blur 시점에 secure-store에 즉시 반영
  function handleMemoBlur(): void {
    if (!isViewingSaved || !recordId) return;
    void persistMemo(recordId, memo);
  }

  const savedRecord = recordId ? getRecordById(recordId) : undefined;
  const decodedUri = (imageUri ? decodeURIComponent(imageUri) : null)
    ?? (webSource
      ? webSource.kind === 'base64'
        ? `data:image/jpeg;base64,${webSource.data}`
        : webSource.data
      : null)
    ?? (savedRecord?.imageUri ?? null);
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
          detail={errorDetail ?? undefined}
          isNetwork={isNetworkError}
          onRetry={isNetworkError ? runAnalysis : () => router.canGoBack() ? router.back() : router.replace('/(tabs)')}
        />
      </SafeAreaView>
    );
  }

  const alternateNames = result?.foods[0]?.alternateNames ?? [];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')} hitSlop={12} style={styles.headerSide}>
          <Text style={styles.headerArrow}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>
          {isViewingSaved ? '식사 상세' : '음식 분석'}
        </Text>
        <View style={styles.headerSide} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >

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
            {isViewingSaved ? (
              <Text style={styles.foodNames} numberOfLines={2}>{foodNames}</Text>
            ) : isEditingName ? (
              <TextInput
                style={styles.foodNameInput}
                value={editedName}
                onChangeText={setEditedName}
                autoFocus
                selectTextOnFocus
                returnKeyType="done"
                onSubmitEditing={() => handleNameSubmit(editedName)}
                onBlur={() => handleNameSubmit(editedName)}
                placeholder="정확한 음식명을 입력하세요"
                placeholderTextColor={COLORS.label.assistive as string}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setEditedName(foodNames);
                  setIsEditingName(true);
                }}
                activeOpacity={0.6}
              >
                <Text style={styles.foodNames} numberOfLines={2}>{foodNames}</Text>
                <Text style={styles.foodNameHint}>탭해서 정정 ✏️</Text>
              </TouchableOpacity>
            )}
            <Text style={styles.calories}>{result?.totalCalories ?? 0} <Text style={styles.caloriesUnit}>kcal</Text></Text>
          </View>
        </MontageCard>

        {/* 대체 후보 — AI 확신도 낮을 때 노출 */}
        <AlternateChips names={alternateNames} onPick={handleNameSubmit} />

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
            onBlur={handleMemoBlur}
            placeholder="오늘 식사에 대해 기록해두세요 (선택)"
            placeholderTextColor={COLORS.label.assistive as string}
            multiline
          />
        </View>

        {/* 저장된 AI 가이드 미리보기 */}
        {isViewingSaved && savedRecord?.aiGuide && (
          <View style={styles.aiGuideSection}>
            <Text style={styles.aiGuideHeader}>🤖 저장된 AI 가이드</Text>
            {([
              { icon: '⚡', title: '지금 바로',    text: savedRecord.aiGuide.immediateAction },
              { icon: '🥗', title: '다음 식사',    text: savedRecord.aiGuide.nextMealSuggestion },
              { icon: '✨', title: '오늘의 총평', text: savedRecord.aiGuide.dailySummary },
            ] as const).map(({ icon, title, text }) => (
              <MontageCard key={title} style={styles.aiGuideCard}>
                <View style={styles.aiGuideCardHead}>
                  <Text style={styles.aiGuideCardIcon}>{icon}</Text>
                  <Text style={styles.aiGuideCardTitle}>{title}</Text>
                </View>
                <Text style={styles.aiGuideCardBody}>{text}</Text>
              </MontageCard>
            ))}
          </View>
        )}

        {/* 액션 */}
        <View style={styles.actions}>
          {!isViewingSaved && (
            <MontageButton label="저장하기" onPress={handleSave} size="large" fullWidth />
          )}
          {isViewingSaved && (
            <MontageButton
              label="목록으로 돌아가기"
              onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')}
              variant="text"
              size="large"
              fullWidth
            />
          )}
        </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Toast visible={savedToast} message="식사 기록이 저장되었습니다" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background.normalAlternative },
  flex1: { flex: 1 },
  scroll: { paddingHorizontal: SPACING.pt20, paddingBottom: SPACING.pt48, gap: SPACING.pt16 },

  skeletonWrap: { flex: 1, padding: SPACING.pt20, gap: SPACING.pt12 },
  skeleton: { borderRadius: RADIUS.large, backgroundColor: COLORS.fill.normal, ...SQUIRCLE },
  skeletonLabel: { ...TYPOGRAPHY.label1, color: COLORS.label.assistive, textAlign: 'center', marginTop: SPACING.pt08 },

  errorWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.pt32, gap: SPACING.pt12 },
  errorEmoji: { fontSize: 52, marginBottom: SPACING.pt08 },
  errorTitle: { ...TYPOGRAPHY.heading2, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.bold },
  errorBody: { ...TYPOGRAPHY.body2, color: COLORS.label.alternative, textAlign: 'center', lineHeight: 22 },
  errorDetail: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.label.assistive,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: SPACING.pt08,
    marginTop: SPACING.pt04,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.pt20,
    paddingTop: SPACING.pt20,
    paddingBottom: SPACING.pt12,
  },
  headerSide: { width: 32, alignItems: 'center' },
  headerArrow: { fontSize: 22, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.medium },
  headerDots:  { fontSize: 22, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.medium },
  headerTitle: { ...TYPOGRAPHY.heading2, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.bold },

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
  foodNameHint: { ...TYPOGRAPHY.caption1, color: COLORS.label.assistive, marginTop: SPACING.pt02 },
  foodNameInput: {
    ...TYPOGRAPHY.heading2,
    color: COLORS.label.normal,
    fontWeight: FONT_WEIGHT.bold,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary.normal,
    paddingVertical: SPACING.pt04,
  },
  calories: { ...TYPOGRAPHY.title2, color: COLORS.primary.normal, fontWeight: FONT_WEIGHT.bold },
  caloriesUnit: { ...TYPOGRAPHY.body1, color: COLORS.label.alternative, fontWeight: FONT_WEIGHT.regular },

  altWrap: { gap: SPACING.pt08 },
  altLabel: { ...TYPOGRAPHY.caption1, color: COLORS.label.alternative, fontWeight: FONT_WEIGHT.medium },
  altRow: { gap: SPACING.pt08, paddingRight: SPACING.pt08 },
  altChip: {
    paddingHorizontal: SPACING.pt16,
    paddingVertical: SPACING.pt08,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.background.elevated,
    borderWidth: 1,
    borderColor: COLORS.line.solidNormal,
    ...SQUIRCLE,
  },
  altChipLabel: { ...TYPOGRAPHY.label1, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.medium },

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

  aiGuideSection: { gap: SPACING.pt08 },
  aiGuideHeader: {
    ...TYPOGRAPHY.label1,
    color: COLORS.label.alternative,
    fontWeight: FONT_WEIGHT.medium,
  },
  aiGuideCard: { gap: SPACING.pt08, padding: SPACING.pt16 },
  aiGuideCardHead: { flexDirection: 'row', alignItems: 'center', gap: SPACING.pt08 },
  aiGuideCardIcon: { fontSize: 18 },
  aiGuideCardTitle: {
    ...TYPOGRAPHY.label1,
    color: COLORS.label.alternative,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  aiGuideCardBody: {
    ...TYPOGRAPHY.body2,
    color: COLORS.label.normal,
    lineHeight: 22,
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
