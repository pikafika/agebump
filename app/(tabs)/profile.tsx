import AsyncStorage from '@react-native-async-storage/async-storage';
import { ArrowRight01Icon, Edit02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MontageCard } from '../../src/components/montage/MontageCard';
import {
  COLORS,
  FONT_WEIGHT,
  RADIUS,
  SPACING,
  SQUIRCLE,
  TYPOGRAPHY,
} from '../../src/constants/theme';
import { analyticsService } from '../../src/services/analyticsService';
import { useAuthStore } from '../../src/store/authStore';
import { useFoodStore } from '../../src/store/foodStore';
import {
  AGE_MAX,
  AGE_MIN,
  DAILY_CALORIE_GOAL_MAX,
  DAILY_CALORIE_GOAL_MIN,
  HEIGHT_MAX,
  HEIGHT_MIN,
  WEIGHT_MAX,
  WEIGHT_MIN,
  useUserProfileStore,
} from '../../src/store/userProfileStore';
import { ONBOARDING_KEY } from '../onboarding';

const APP_VERSION = '1.0.0';

interface RowProps {
  label: string;
  value?: string;
  onPress?: () => void;
  trailing?: 'chevron' | 'edit' | 'none';
  destructive?: boolean;
}
function Row({ label, value, onPress, trailing = 'chevron', destructive = false }: RowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={({ pressed }) => [styles.row, pressed && onPress && styles.rowPressed]}
    >
      <Text style={[styles.rowLabel, destructive && styles.rowLabelDestructive]}>{label}</Text>
      <View style={styles.rowRight}>
        {value !== undefined && (
          <Text style={styles.rowValue} numberOfLines={1}>{value}</Text>
        )}
        {trailing === 'chevron' && (
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={18}
            color={COLORS.label.assistive as string}
            strokeWidth={1.8}
          />
        )}
        {trailing === 'edit' && (
          <HugeiconsIcon
            icon={Edit02Icon}
            size={18}
            color={COLORS.label.assistive as string}
            strokeWidth={1.8}
          />
        )}
      </View>
    </Pressable>
  );
}

interface SectionProps { title: string; children: React.ReactNode }
function Section({ title, children }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <MontageCard style={styles.sectionCard} noPadding>
        {children}
      </MontageCard>
    </View>
  );
}

export function ProfileScreen() {
  const nickname = useUserProfileStore((s) => s.nickname);
  const dailyCalorieGoal = useUserProfileStore((s) => s.dailyCalorieGoal);
  const age = useUserProfileStore((s) => s.age);
  const gender = useUserProfileStore((s) => s.gender);
  const height = useUserProfileStore((s) => s.height);
  const weight = useUserProfileStore((s) => s.weight);
  const setNickname = useUserProfileStore((s) => s.setNickname);
  const setDailyCalorieGoal = useUserProfileStore((s) => s.setDailyCalorieGoal);
  const setAge = useUserProfileStore((s) => s.setAge);
  const setGender = useUserProfileStore((s) => s.setGender);
  const setHeight = useUserProfileStore((s) => s.setHeight);
  const setWeight = useUserProfileStore((s) => s.setWeight);

  const { user, isLinking, linkError, linkWithGoogle, unlinkGoogle, clearLinkError } = useAuthStore();
  const isLinked = !!user && !user.isAnonymous;
  const linkedEmail = isLinked
    ? (user.providerData.find((p) => p.providerId === 'google.com')?.email ?? user.email ?? '')
    : '';

  const clearAllRecords = useFoodStore((s) => s.clearAllRecords);
  const todayRecordsLength = useFoodStore((s) => s.records.length);

  // linkError가 설정될 때 Alert으로 표시 (에러가 깜빡 사라지는 것 방지)
  useEffect(() => {
    if (linkError) {
      Alert.alert('구글 연결 실패', linkError, [{ text: '확인', onPress: clearLinkError }]);
    }
  }, [linkError, clearLinkError]);

  const [editingNickname, setEditingNickname] = useState(false);
  const [nicknameDraft, setNicknameDraft] = useState('');
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalDraft, setGoalDraft] = useState('');
  const [editingAge, setEditingAge] = useState(false);
  const [ageDraft, setAgeDraft] = useState('');
  const [editingGender, setEditingGender] = useState(false);
  const [editingHeight, setEditingHeight] = useState(false);
  const [heightDraft, setHeightDraft] = useState('');
  const [editingWeight, setEditingWeight] = useState(false);
  const [weightDraft, setWeightDraft] = useState('');

  function startEditNickname() {
    setNicknameDraft(nickname);
    setEditingNickname(true);
  }
  function submitNickname() {
    setNickname(nicknameDraft);
    setEditingNickname(false);
  }

  function startEditGoal() {
    setGoalDraft(String(dailyCalorieGoal));
    setEditingGoal(true);
  }
  function submitGoal() {
    const parsed = parseInt(goalDraft.replace(/[^0-9]/g, ''), 10);
    if (Number.isFinite(parsed) && parsed > 0) {
      setDailyCalorieGoal(parsed);
    }
    setEditingGoal(false);
  }

  function startEditAge() {
    setAgeDraft(age !== undefined ? String(age) : '');
    setEditingAge(true);
  }
  function submitAge() {
    const parsed = parseInt(ageDraft.replace(/[^0-9]/g, ''), 10);
    setAge(Number.isFinite(parsed) && parsed >= AGE_MIN && parsed <= AGE_MAX ? parsed : undefined);
    setEditingAge(false);
  }

  function startEditHeight() {
    setHeightDraft(height !== undefined ? String(height) : '');
    setEditingHeight(true);
  }
  function submitHeight() {
    const parsed = parseInt(heightDraft.replace(/[^0-9]/g, ''), 10);
    setHeight(Number.isFinite(parsed) && parsed >= HEIGHT_MIN && parsed <= HEIGHT_MAX ? parsed : undefined);
    setEditingHeight(false);
  }

  function startEditWeight() {
    setWeightDraft(weight !== undefined ? String(weight) : '');
    setEditingWeight(true);
  }
  function submitWeight() {
    const parsed = parseFloat(weightDraft.replace(/[^0-9.]/g, ''));
    setWeight(Number.isFinite(parsed) && parsed >= WEIGHT_MIN && parsed <= WEIGHT_MAX ? parsed : undefined);
    setEditingWeight(false);
  }


  function confirmClearToday() {
    if (todayRecordsLength === 0) {
      Alert.alert('초기화할 기록이 없어요', '오늘 저장된 기록이 없습니다.');
      return;
    }
    Alert.alert(
      '오늘 기록 초기화',
      `오늘 저장된 ${todayRecordsLength}개 기록을 모두 삭제할까요? 되돌릴 수 없습니다.`,
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            // 오늘만 비우려면 deleteRecord 반복도 가능하나, foodStore.records는 오늘분만 영속화되므로 clearAllRecords로 동일 효과
            // 단 다른 날짜 키도 함께 비우는 것을 피하려면 records만 set 필요 → 명시적 분기
            useFoodStore.setState({ records: [] });
          },
        },
      ],
    );
  }

  function confirmClearAll() {
    Alert.alert(
      '모든 기록 초기화',
      '저장된 모든 날짜의 식사 기록이 삭제됩니다. 되돌릴 수 없습니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '전체 삭제',
          style: 'destructive',
          onPress: () => {
            void clearAllRecords();
          },
        },
      ],
    );
  }

  function confirmUnlinkGoogle() {
    Alert.alert(
      '구글 연결 해제',
      '연결을 해제하면 기기 간 동기화가 중단됩니다. 기존 기록은 이 기기에 유지됩니다. 계속할까요?',
      [
        { text: '취소', style: 'cancel' },
        { text: '연결 해제', style: 'destructive', onPress: unlinkGoogle },
      ],
    );
  }

  function confirmRestartOnboarding() {
    Alert.alert(
      '온보딩 다시 보기',
      '시작 화면으로 이동합니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '이동',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(ONBOARDING_KEY);
            } catch {
              // ignore — 라우팅은 진행
            }
            router.replace('/onboarding');
          },
        },
      ],
    );
  }

  function showDisclaimer() {
    Alert.alert(
      '면책 고지',
      '본 앱이 제공하는 영양 분석, 혈당 지수, AI 가이드는 모두 추정값이며 의학적 진단이나 치료를 대체할 수 없습니다. 건강 관련 의사 결정은 반드시 전문의와 상의하세요.',
    );
  }

  function showPrivacy() {
    Alert.alert(
      '개인정보 처리방침',
      '식사 기록과 프로필 정보는 단말 내부 및 Firebase 클라우드에 안전하게 저장됩니다. 구글 계정을 연결하면 다른 기기에서도 데이터에 접근할 수 있습니다. AI 분석을 위해 음식 사진은 Google Gemini API로 전송되고, 응답 후 저장되지 않습니다.',
    );
  }

  function handleLinkGoogle() {
    if (isLinked) return;
    analyticsService.trackAccountLinkStarted(user?.uid ?? null);
    linkWithGoogle();
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')} hitSlop={12} style={styles.headerSide}>
          <Text style={styles.headerArrow}>←</Text>
        </Pressable>
        <Text style={styles.title}>계정</Text>
        <Pressable hitSlop={12} style={styles.headerSide} onPress={() => {}}>
          <Text style={styles.headerDots}>⋮</Text>
        </Pressable>
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
          {/* ── 내 정보 ── */}
          <Section title="내 정보">
            {editingNickname ? (
              <View style={styles.rowEdit}>
                <Text style={styles.rowLabel}>닉네임</Text>
                <TextInput
                  style={styles.input}
                  value={nicknameDraft}
                  onChangeText={setNicknameDraft}
                  placeholder="이름을 입력하세요"
                  placeholderTextColor={COLORS.label.assistive as string}
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={submitNickname}
                  onBlur={submitNickname}
                  maxLength={20}
                />
              </View>
            ) : (
              <Row
                label="닉네임"
                value={nickname || '미설정'}
                onPress={startEditNickname}
                trailing="edit"
              />
            )}
            <View style={styles.divider} />
            {editingGoal ? (
              <View style={styles.rowEdit}>
                <Text style={styles.rowLabel}>일일 칼로리 목표 (kcal)</Text>
                <TextInput
                  style={styles.input}
                  value={goalDraft}
                  onChangeText={setGoalDraft}
                  placeholder={`${DAILY_CALORIE_GOAL_MIN}–${DAILY_CALORIE_GOAL_MAX}`}
                  placeholderTextColor={COLORS.label.assistive as string}
                  keyboardType="number-pad"
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={submitGoal}
                  onBlur={submitGoal}
                  maxLength={5}
                />
              </View>
            ) : (
              <Row
                label="일일 칼로리 목표"
                value={`${dailyCalorieGoal.toLocaleString('ko-KR')} kcal`}
                onPress={startEditGoal}
                trailing="edit"
              />
            )}
            <View style={styles.divider} />
            {editingAge ? (
              <View style={styles.rowEdit}>
                <Text style={styles.rowLabel}>나이 (세)</Text>
                <TextInput
                  style={styles.input}
                  value={ageDraft}
                  onChangeText={setAgeDraft}
                  placeholder={`${AGE_MIN}–${AGE_MAX}`}
                  placeholderTextColor={COLORS.label.assistive as string}
                  keyboardType="number-pad"
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={submitAge}
                  onBlur={submitAge}
                  maxLength={3}
                />
              </View>
            ) : (
              <Row
                label="나이"
                value={age !== undefined ? `${age}세` : '미설정'}
                onPress={startEditAge}
                trailing="edit"
              />
            )}
            <View style={styles.divider} />
            {editingGender ? (
              <View style={styles.rowEdit}>
                <Text style={styles.rowLabel}>성별</Text>
                <View style={styles.genderRow}>
                  {(['male', 'female', undefined] as const).map((g) => {
                    const label = g === 'male' ? '남성' : g === 'female' ? '여성' : '미설정';
                    const active = gender === g;
                    return (
                      <Pressable
                        key={label}
                        style={[styles.genderChip, active && styles.genderChipActive]}
                        onPress={() => { setGender(g); setEditingGender(false); }}
                      >
                        <Text style={[styles.genderChipText, active && styles.genderChipTextActive]}>
                          {label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            ) : (
              <Row
                label="성별"
                value={gender === 'male' ? '남성' : gender === 'female' ? '여성' : '미설정'}
                onPress={() => setEditingGender(true)}
                trailing="chevron"
              />
            )}
            <View style={styles.divider} />
            {editingHeight ? (
              <View style={styles.rowEdit}>
                <Text style={styles.rowLabel}>키 (cm)</Text>
                <TextInput
                  style={styles.input}
                  value={heightDraft}
                  onChangeText={setHeightDraft}
                  placeholder={`${HEIGHT_MIN}–${HEIGHT_MAX}`}
                  placeholderTextColor={COLORS.label.assistive as string}
                  keyboardType="number-pad"
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={submitHeight}
                  onBlur={submitHeight}
                  maxLength={3}
                />
              </View>
            ) : (
              <Row
                label="키"
                value={height !== undefined ? `${height} cm` : '미설정'}
                onPress={startEditHeight}
                trailing="edit"
              />
            )}
            <View style={styles.divider} />
            {editingWeight ? (
              <View style={styles.rowEdit}>
                <Text style={styles.rowLabel}>몸무게 (kg)</Text>
                <TextInput
                  style={styles.input}
                  value={weightDraft}
                  onChangeText={setWeightDraft}
                  placeholder={`${WEIGHT_MIN}–${WEIGHT_MAX}`}
                  placeholderTextColor={COLORS.label.assistive as string}
                  keyboardType="decimal-pad"
                  autoFocus
                  returnKeyType="done"
                  onSubmitEditing={submitWeight}
                  onBlur={submitWeight}
                  maxLength={5}
                />
              </View>
            ) : (
              <Row
                label="몸무게"
                value={weight !== undefined ? `${weight} kg` : '미설정'}
                onPress={startEditWeight}
                trailing="edit"
              />
            )}
          </Section>

          {/* ── 계정 연결 ── */}
          <Section title="계정 연결">
            {isLinking ? (
              <View style={styles.row}>
                <Text style={styles.rowLabel}>{isLinked ? '연결 해제 중...' : '구글로 연결 중...'}</Text>
                <ActivityIndicator size="small" color={COLORS.primary.normal as string} />
              </View>
            ) : isLinked ? (
              <>
                <Row
                  label="구글 계정"
                  value={linkedEmail}
                  trailing="none"
                />
                <View style={styles.divider} />
                <Row
                  label="구글 연결 해제"
                  onPress={confirmUnlinkGoogle}
                  trailing="chevron"
                  destructive
                />
              </>
            ) : (
              <Row
                label="구글로 연결하기"
                value="연결 시 기기 간 동기화"
                onPress={handleLinkGoogle}
                trailing="chevron"
              />
            )}
            {linkError ? (
              <>
                <View style={styles.divider} />
                <View style={styles.row}>
                  <Text style={[styles.rowLabel, { color: COLORS.status.negative as string, flex: 1 }]} numberOfLines={2}>
                    {linkError}
                  </Text>
                  <Pressable onPress={clearLinkError} hitSlop={8}>
                    <Text style={{ color: COLORS.label.assistive as string, fontSize: 12 }}>닫기</Text>
                  </Pressable>
                </View>
              </>
            ) : null}
          </Section>

          {/* ── 설정 ── */}
          <Section title="설정">
            <Row
              label="오늘 기록 초기화"
              onPress={confirmClearToday}
              trailing="chevron"
            />
            <View style={styles.divider} />
            <Row
              label="모든 기록 초기화"
              onPress={confirmClearAll}
              trailing="chevron"
              destructive
            />
            <View style={styles.divider} />
            <Row
              label="온보딩 다시 보기"
              onPress={confirmRestartOnboarding}
              trailing="chevron"
            />
          </Section>

          {/* ── 정보 ── */}
          <Section title="정보">
            <Row
              label="앱 버전"
              value={APP_VERSION}
              trailing="none"
            />
            <View style={styles.divider} />
            <Row
              label="면책 고지"
              onPress={showDisclaimer}
              trailing="chevron"
            />
            <View style={styles.divider} />
            <Row
              label="개인정보 처리방침"
              onPress={showPrivacy}
              trailing="chevron"
            />
          </Section>

          <Text style={styles.footnote}>저속노화 노화방지턱 · 건강한 한 끼를 위한 작은 동반자</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background.normalAlternative },
  flex1: { flex: 1 },

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
  title: { ...TYPOGRAPHY.heading2, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.bold },

  scroll: {
    paddingHorizontal: SPACING.pt20,
    paddingBottom: SPACING.pt48,
    gap: SPACING.pt24,
  },

  section: { gap: SPACING.pt08 },
  sectionTitle: {
    ...TYPOGRAPHY.label1,
    color: COLORS.label.alternative,
    fontWeight: FONT_WEIGHT.semiBold,
    paddingHorizontal: SPACING.pt04,
  },
  sectionCard: { overflow: 'hidden' },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.pt16,
    paddingVertical: SPACING.pt16,
    minHeight: 56,
  },
  rowPressed: { backgroundColor: COLORS.fill.normal as string, opacity: 0.95 },
  rowLabel: { ...TYPOGRAPHY.body2, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.medium },
  rowLabelDestructive: { color: COLORS.status.negative as string },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: SPACING.pt08, flexShrink: 1 },
  rowValue: {
    ...TYPOGRAPHY.body2,
    color: COLORS.label.alternative,
    maxWidth: 180,
  },

  rowEdit: {
    paddingHorizontal: SPACING.pt16,
    paddingVertical: SPACING.pt12,
    gap: SPACING.pt08,
  },
  input: {
    ...TYPOGRAPHY.body2,
    color: COLORS.label.normal,
    backgroundColor: COLORS.fill.normal,
    borderRadius: RADIUS.medium,
    paddingHorizontal: SPACING.pt12,
    paddingVertical: SPACING.pt08,
    ...SQUIRCLE,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.line.solidNormal,
    marginLeft: SPACING.pt16,
  },

  footnote: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.label.assistive,
    textAlign: 'center',
    marginTop: SPACING.pt08,
  },

  genderRow: {
    flexDirection: 'row',
    gap: SPACING.pt08,
  },
  genderChip: {
    flex: 1,
    paddingVertical: SPACING.pt08,
    borderRadius: RADIUS.medium,
    backgroundColor: COLORS.fill.normal,
    alignItems: 'center',
  },
  genderChipActive: {
    backgroundColor: COLORS.primary.normal,
  },
  genderChipText: {
    ...TYPOGRAPHY.body2,
    color: COLORS.label.alternative,
    fontWeight: FONT_WEIGHT.medium,
  },
  genderChipTextActive: {
    color: '#fff',
    fontWeight: FONT_WEIGHT.semiBold,
  },
});

export default ProfileScreen;
