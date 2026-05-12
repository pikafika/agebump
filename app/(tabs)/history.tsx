import { router } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MontageButton } from '../../src/components/montage/MontageButton';
import { MontageCard } from '../../src/components/montage/MontageCard';
import {
  COLORS,
  FONT_WEIGHT,
  RADIUS,
  SPACING,
  SQUIRCLE,
  TYPOGRAPHY,
} from '../../src/constants/theme';
import {
  fetchMealTypesForDates,
  fetchRecordsByDate,
  persistDeleteRecord,
  useFoodStore,
} from '../../src/store/foodStore';
import { type FoodRecord, type MealType } from '../../src/types/food';
import {
  WEEKDAY_INITIALS_EN,
  addMonthsClamped,
  datesInMonth,
  firstWeekdayOffset,
  formatMonthLabelKO,
  formatTimeAMPM,
  todayString,
  weekContaining,
} from '../../src/utils/dateUtils';
import { nutritionTagsFor } from '../../src/utils/nutritionTags';

const MEAL_ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

const MEAL_LABEL: Record<MealType, string> = {
  breakfast: '아침',
  lunch:     '점심',
  dinner:    '저녁',
  snack:     '간식',
};

const MEAL_EMOJI: Record<MealType, string> = {
  breakfast: '🌅',
  lunch:     '☀️',
  dinner:    '🌙',
  snack:     '🍎',
};

const MEAL_COLORS: Record<MealType, string> = {
  breakfast: '#FBBF24',
  lunch:     '#34D399',
  dinner:    '#818CF8',
  snack:     '#FB7185',
};

const MAX_DOTS = 4;

function totalCalories(record: FoodRecord): number {
  return record.foods.reduce((s, f) => s + f.calories, 0);
}

function representativeFoodLabel(record: FoodRecord): string {
  if (record.foods.length === 0) return '음식 정보 없음';
  const first = record.foods[0].name;
  const extra = record.foods.length - 1;
  return extra > 0 ? `${first} 외 ${extra}건` : first;
}

interface DateCellProps {
  iso: string;
  selected: boolean;
  mealTypes: MealType[];
  onPress: () => void;
}
function DateCell({ iso, selected, mealTypes, onPress }: DateCellProps) {
  const day = Number(iso.split('-')[2]);
  return (
    <Pressable onPress={onPress} style={styles.dateCell} hitSlop={6}>
      <View style={[styles.dateBubble, selected && styles.dateBubbleActive]}>
        <Text style={[styles.dateNumber, selected && styles.dateNumberActive]}>
          {day}
        </Text>
      </View>
      <View style={styles.dotsRow}>
        {mealTypes.slice(0, MAX_DOTS).map((mt) => (
          <View
            key={mt}
            style={[styles.dot, { backgroundColor: MEAL_COLORS[mt] }]}
          />
        ))}
      </View>
    </Pressable>
  );
}

interface RecordCardProps {
  record: FoodRecord;
  onPress: () => void;
  onLongPress?: () => void;
  isEditMode?: boolean;
  onDelete?: () => void;
}
function RecordCard({ record, onPress, onLongPress, isEditMode, onDelete }: RecordCardProps) {
  const cals = totalCalories(record);
  const mealColor = MEAL_COLORS[record.mealType];
  const tags = nutritionTagsFor(record);
  const description = representativeFoodLabel(record);

  return (
    <Pressable
      onPress={isEditMode ? undefined : onPress}
      onLongPress={isEditMode ? undefined : onLongPress}
      delayLongPress={400}
      style={({ pressed }) => [
        styles.cardPress,
        !isEditMode && pressed && styles.cardPressed,
      ]}
    >
      <MontageCard style={styles.recordCard}>
        <View style={styles.cardLeft}>
          <Text style={styles.mealTitle}>{MEAL_LABEL[record.mealType]} 식사</Text>
          <Text style={styles.timeText}>{formatTimeAMPM(record.timestamp)}</Text>
          <View style={styles.calorieRow}>
            <Text style={[styles.calorieValue, { color: mealColor }]}>
              {cals.toLocaleString('ko-KR')}
            </Text>
            <Text style={[styles.calorieUnit, { color: mealColor }]}> kcal</Text>
          </View>
          <Text style={styles.foodDesc} numberOfLines={2}>{description}</Text>
          {tags.length > 0 && (
            <View style={styles.tagsRow}>
              {tags.map((t) => (
                <View
                  key={t}
                  style={[styles.tag, { backgroundColor: mealColor + '22' }]}
                >
                  <Text style={[styles.tagText, { color: mealColor }]}>{t}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.cardRight}>
          <View style={[styles.avatar, { backgroundColor: mealColor + '33' }]}>
            <Text style={styles.avatarEmoji}>{MEAL_EMOJI[record.mealType]}</Text>
          </View>
          {record.imageUri ? (
            <Image source={{ uri: record.imageUri }} style={styles.thumb} resizeMode="cover" />
          ) : (
            <View style={[styles.thumb, styles.thumbPlaceholder]}>
              <Text style={{ fontSize: 28 }}>🍽️</Text>
            </View>
          )}
        </View>
        {isEditMode && (
          <Pressable
            style={styles.deleteBadge}
            onPress={onDelete}
            hitSlop={10}
            accessibilityLabel="기록 삭제"
          >
            <Text style={styles.deleteBadgeText}>×</Text>
          </Pressable>
        )}
      </MontageCard>
    </Pressable>
  );
}

export function HistoryScreen() {
  const today = todayString();
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [pastRecords, setPastRecords] = useState<FoodRecord[]>([]);
  const [isLoadingPast, setIsLoadingPast] = useState(false);
  const [calendarMealTypes, setCalendarMealTypes] = useState<Record<string, MealType[]>>({});
  const [isMonthExpanded, setIsMonthExpanded] = useState(false);
  const [viewMonthAnchor, setViewMonthAnchor] = useState<string>(today);
  const [isEditMode, setIsEditMode] = useState(false);

  const todayRecords = useFoodStore((s) => s.records);
  const deleteRecord = useFoodStore((s) => s.deleteRecord);

  const isToday = selectedDate === today;

  // 캘린더에 표시되는 날짜 집합 — 접힘: 선택 주, 펼침: 보고 있는 달
  const weekDates = useMemo(() => weekContaining(selectedDate), [selectedDate]);
  const monthDates = useMemo(() => datesInMonth(viewMonthAnchor), [viewMonthAnchor]);
  const monthOffset = useMemo(() => firstWeekdayOffset(viewMonthAnchor), [viewMonthAnchor]);
  const monthLabelDate = isMonthExpanded ? viewMonthAnchor : selectedDate;
  const monthLabel = useMemo(
    () => formatMonthLabelKO(monthLabelDate),
    [monthLabelDate],
  );

  // 도트 데이터: 현재 보고 있는 범위에 맞춰 일괄 로드
  useEffect(() => {
    const targets = isMonthExpanded ? monthDates : weekDates;
    let cancelled = false;
    fetchMealTypesForDates(targets).then((map) => {
      if (!cancelled) setCalendarMealTypes((prev) => ({ ...prev, ...map }));
    });
    return () => { cancelled = true; };
  }, [isMonthExpanded, monthDates, weekDates]);

  // 펼침 모드 진입 시 보고 있는 달을 선택 날짜의 달로 동기화
  useEffect(() => {
    if (isMonthExpanded) setViewMonthAnchor(selectedDate);
  }, [isMonthExpanded, selectedDate]);

  // 오늘 기록 변동 시 도트 갱신
  useEffect(() => {
    if (!isToday) return;
    setCalendarMealTypes((prev) => ({ ...prev }));
  }, [todayRecords.length, isToday]);

  function handleSelectDate(iso: string): void {
    setSelectedDate(iso);
    setIsMonthExpanded(false);
  }
  function handleShiftMonth(delta: number): void {
    setViewMonthAnchor((cur) => addMonthsClamped(cur, delta));
  }
  function handleJumpToThisWeek(): void {
    setSelectedDate(today);
    setViewMonthAnchor(today);
    setIsMonthExpanded(false);
  }

  // 선택한 날짜의 기록 로드 (오늘이 아닐 때)
  useEffect(() => {
    if (isToday) {
      setPastRecords([]);
      return;
    }
    let cancelled = false;
    setIsLoadingPast(true);
    fetchRecordsByDate(selectedDate)
      .then((records) => { if (!cancelled) setPastRecords(records); })
      .finally(() => { if (!cancelled) setIsLoadingPast(false); });
    return () => { cancelled = true; };
  }, [selectedDate, isToday]);

  // 날짜를 바꾸면 수정 모드는 자동 종료
  useEffect(() => {
    setIsEditMode(false);
  }, [selectedDate]);

  const records = isToday ? todayRecords : pastRecords;

  const orderedRecords = MEAL_ORDER.flatMap((mealType) =>
    records
      .filter((r) => r.mealType === mealType)
      .sort((a, b) => a.timestamp - b.timestamp),
  );

  const handleDelete = useCallback(
    (id: string) => {
      Alert.alert(
        '기록 삭제',
        '이 식사 기록을 삭제할까요? 되돌릴 수 없습니다.',
        [
          { text: '취소', style: 'cancel' },
          { text: '삭제', style: 'destructive', onPress: () => deleteRecord(id) },
        ],
      );
    },
    [deleteRecord],
  );

  // 수정 모드 삭제: 오늘이면 store에서 삭제, 과거면 AsyncStorage에서 직접 삭제
  const handleDeleteInEditMode = useCallback(
    (record: FoodRecord) => {
      Alert.alert(
        '기록 삭제',
        '이 식사 기록을 삭제할까요? 되돌릴 수 없습니다.',
        [
          { text: '취소', style: 'cancel' },
          {
            text: '삭제',
            style: 'destructive',
            onPress: () => {
              if (isToday) {
                deleteRecord(record.id);
              } else {
                setPastRecords((prev) => prev.filter((r) => r.id !== record.id));
                persistDeleteRecord(record.id, record.timestamp);
              }
            },
          },
        ],
      );
    },
    [deleteRecord, isToday],
  );

  const canEnterEditMode = orderedRecords.length > 0;
  const trailingButton = isEditMode ? (
    <Pressable hitSlop={12} style={styles.headerSide} onPress={() => setIsEditMode(false)}>
      <Text style={styles.headerDone}>완료</Text>
    </Pressable>
  ) : (
    <Pressable
      hitSlop={12}
      style={styles.headerSide}
      onPress={() => canEnterEditMode && setIsEditMode(true)}
      disabled={!canEnterEditMode}
    >
      <Text style={[styles.headerDots, !canEnterEditMode && styles.headerDotsDisabled]}>⋮</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable
          onPress={() => (isEditMode ? setIsEditMode(false) : router.back())}
          hitSlop={12}
          style={styles.headerSide}
        >
          <Text style={styles.headerArrow}>←</Text>
        </Pressable>
        <Text style={styles.title}>{isEditMode ? '기록 편집' : '식단 일기'}</Text>
        {trailingButton}
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.calendarWrap}>
          <Pressable
            style={styles.calendarHeader}
            onPress={() => setIsMonthExpanded((v) => !v)}
            hitSlop={8}
          >
            <Text style={styles.calendarChevron}>{isMonthExpanded ? '⌃' : '⌄'}</Text>
            <Text style={styles.calendarMonth}>{monthLabel}</Text>
          </Pressable>

          <View style={styles.weekdayHeaderRow}>
            {WEEKDAY_INITIALS_EN.map((w, i) => (
              <Text key={`${w}-${i}`} style={styles.weekdayHeader}>{w}</Text>
            ))}
          </View>

          {!isMonthExpanded ? (
            <View style={styles.weekStrip}>
              {weekDates.map((iso) => (
                <DateCell
                  key={iso}
                  iso={iso}
                  selected={iso === selectedDate}
                  mealTypes={calendarMealTypes[iso] ?? []}
                  onPress={() => handleSelectDate(iso)}
                />
              ))}
            </View>
          ) : (
            <>
              <View style={styles.monthGrid}>
                {Array.from({ length: monthOffset }).map((_, i) => (
                  <View key={`pad-${i}`} style={styles.gridCell} />
                ))}
                {monthDates.map((iso) => (
                  <View key={iso} style={styles.gridCell}>
                    <DateCell
                      iso={iso}
                      selected={iso === selectedDate}
                      mealTypes={calendarMealTypes[iso] ?? []}
                      onPress={() => handleSelectDate(iso)}
                    />
                  </View>
                ))}
              </View>
              <View style={styles.monthNav}>
                <Pressable
                  onPress={() => handleShiftMonth(-1)}
                  hitSlop={8}
                  style={styles.monthNavBtn}
                >
                  <Text style={styles.monthNavText}>← 이전 월</Text>
                </Pressable>
                <Pressable
                  onPress={handleJumpToThisWeek}
                  hitSlop={8}
                  style={styles.monthNavBtn}
                >
                  <Text style={[styles.monthNavText, styles.monthNavPrimary]}>이번 주로</Text>
                </Pressable>
                <Pressable
                  onPress={() => handleShiftMonth(1)}
                  hitSlop={8}
                  style={styles.monthNavBtn}
                >
                  <Text style={styles.monthNavText}>다음 월 →</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>

        {isLoadingPast && (
          <View style={styles.skeletonWrap}>
            {[0, 1, 2].map((i) => (
              <View key={i} style={styles.skeleton} />
            ))}
          </View>
        )}

        {!isLoadingPast && orderedRecords.length === 0 && (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyTitle}>이날 기록이 없어요</Text>
            <Text style={styles.emptyBody}>
              {isToday
                ? '아래 버튼으로 첫 식사를 기록해 보세요.'
                : '이 날짜에는 저장된 식사 기록이 없어요.'}
            </Text>
            {isToday && (
              <View style={styles.emptyAction}>
                <MontageButton
                  label="+ 식사 추가하기"
                  onPress={() => router.push('/camera')}
                  size="medium"
                />
              </View>
            )}
          </View>
        )}

        {!isLoadingPast && orderedRecords.map((record) => (
          <RecordCard
            key={record.id}
            record={record}
            isEditMode={isEditMode}
            onPress={() => router.push(`/analysis?recordId=${record.id}`)}
            onLongPress={isToday && !isEditMode ? () => handleDelete(record.id) : undefined}
            onDelete={() => handleDeleteInEditMode(record)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background.normalAlternative },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.pt20,
    paddingTop: SPACING.pt08,
    paddingBottom: SPACING.pt12,
  },
  headerSide: { width: 48, alignItems: 'center' },
  headerArrow: { fontSize: 22, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.medium },
  headerDots:  { fontSize: 22, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.medium },
  headerDotsDisabled: { opacity: 0.3 },
  headerDone: {
    ...TYPOGRAPHY.label1,
    color: COLORS.primary.normal,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  title: { ...TYPOGRAPHY.heading2, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.bold },

  calendarWrap: {
    paddingVertical: SPACING.pt08,
    marginBottom: SPACING.pt04,
    gap: SPACING.pt08,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingVertical: 4,
  },
  calendarChevron: {
    ...TYPOGRAPHY.label1,
    color: COLORS.label.alternative,
    fontWeight: FONT_WEIGHT.semiBold,
    lineHeight: 16,
  },
  calendarMonth: {
    ...TYPOGRAPHY.label1,
    color: COLORS.label.normal,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  weekdayHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  weekdayHeader: {
    flex: 1,
    textAlign: 'center',
    ...TYPOGRAPHY.caption1,
    color: COLORS.label.assistive,
    fontWeight: FONT_WEIGHT.medium,
  },
  weekStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 2,
  },
  gridCell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    paddingVertical: 4,
  },
  monthNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.pt08,
    paddingHorizontal: 4,
  },
  monthNavBtn: { paddingVertical: 4, paddingHorizontal: 6 },
  monthNavText: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.label.alternative,
    fontWeight: FONT_WEIGHT.medium,
  },
  monthNavPrimary: { color: COLORS.primary.normal, fontWeight: FONT_WEIGHT.semiBold },
  dateCell: {
    width: 36,
    alignItems: 'center',
    gap: 4,
  },
  dateBubble: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateBubbleActive: { backgroundColor: COLORS.primary.normal },
  dateNumber: {
    ...TYPOGRAPHY.body2,
    color: COLORS.label.normal,
    fontWeight: FONT_WEIGHT.semiBold,
  },
  dateNumberActive: { color: '#fff' },
  dotsRow: {
    flexDirection: 'row',
    gap: 3,
    height: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { width: 4, height: 4, borderRadius: 2 },

  scroll: {
    paddingHorizontal: SPACING.pt20,
    paddingBottom: SPACING.pt48,
    gap: SPACING.pt12,
  },

  cardPress: { borderRadius: RADIUS.extraLarge },
  cardPressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
  recordCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.pt12,
    padding: SPACING.pt16,
    position: 'relative',
  },
  deleteBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.status.negative,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 20,
  },
  deleteBadgeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 22,
    marginTop: -1,
  },
  cardLeft: { flex: 1, gap: 4 },
  mealTitle: {
    ...TYPOGRAPHY.headline2,
    color: COLORS.label.normal,
    fontWeight: FONT_WEIGHT.bold,
  },
  timeText: { ...TYPOGRAPHY.caption1, color: COLORS.label.assistive },
  calorieRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  calorieValue: { fontSize: 28, fontWeight: '800' },
  calorieUnit:  { fontSize: 14, fontWeight: '700' },
  foodDesc: {
    ...TYPOGRAPHY.body2,
    color: COLORS.label.alternative,
    marginTop: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: SPACING.pt08,
  },
  tag: {
    paddingHorizontal: SPACING.pt08,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
  },
  tagText: {
    ...TYPOGRAPHY.caption1,
    fontWeight: FONT_WEIGHT.semiBold,
  },

  cardRight: {
    alignItems: 'flex-end',
    gap: SPACING.pt08,
  },
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 16 },
  thumb: {
    width: 88, height: 88,
    borderRadius: RADIUS.large,
    ...SQUIRCLE,
  },
  thumbPlaceholder: {
    backgroundColor: COLORS.fill.normal,
    alignItems: 'center', justifyContent: 'center',
  },

  skeletonWrap: { gap: SPACING.pt08, marginTop: SPACING.pt08 },
  skeleton: {
    height: 140,
    borderRadius: RADIUS.extraLarge,
    backgroundColor: COLORS.fill.normal,
    ...SQUIRCLE,
  },

  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.pt56,
    gap: SPACING.pt08,
  },
  emptyEmoji: { fontSize: 56, marginBottom: SPACING.pt08 },
  emptyTitle: {
    ...TYPOGRAPHY.heading2,
    color: COLORS.label.normal,
    fontWeight: FONT_WEIGHT.bold,
  },
  emptyBody: {
    ...TYPOGRAPHY.body2,
    color: COLORS.label.alternative,
    textAlign: 'center',
    paddingHorizontal: SPACING.pt32,
  },
  emptyAction: { marginTop: SPACING.pt16 },
});

export default HistoryScreen;
