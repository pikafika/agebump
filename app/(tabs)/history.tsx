import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
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
  useFoodStore,
} from '../../src/store/foodStore';
import { type FoodRecord, type MealType } from '../../src/types/food';
import {
  WEEKDAY_INITIALS_EN,
  formatTimeAMPM,
  thisWeekDates,
  todayString,
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
  weekdayInitial: string;
  selected: boolean;
  mealTypes: MealType[];
  onPress: () => void;
}
function DateCell({ iso, weekdayInitial, selected, mealTypes, onPress }: DateCellProps) {
  const day = Number(iso.split('-')[2]);
  return (
    <Pressable onPress={onPress} style={styles.dateCell} hitSlop={6}>
      <Text style={styles.dateWeekday}>{weekdayInitial}</Text>
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
}
function RecordCard({ record, onPress, onLongPress }: RecordCardProps) {
  const cals = totalCalories(record);
  const mealColor = MEAL_COLORS[record.mealType];
  const tags = nutritionTagsFor(record);
  const description = representativeFoodLabel(record);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={400}
      style={({ pressed }) => [styles.cardPress, pressed && styles.cardPressed]}
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
      </MontageCard>
    </Pressable>
  );
}

export function HistoryScreen() {
  const weekDates = thisWeekDates();
  const [selectedDate, setSelectedDate] = useState<string>(todayString());
  const [pastRecords, setPastRecords] = useState<FoodRecord[]>([]);
  const [isLoadingPast, setIsLoadingPast] = useState(false);
  const [weekMealTypes, setWeekMealTypes] = useState<Record<string, MealType[]>>({});

  const todayRecords = useFoodStore((s) => s.records);
  const deleteRecord = useFoodStore((s) => s.deleteRecord);

  const isToday = selectedDate === todayString();

  // 주간 캘린더 도트 데이터
  useEffect(() => {
    let cancelled = false;
    fetchMealTypesForDates(weekDates).then((map) => {
      if (!cancelled) setWeekMealTypes(map);
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayRecords.length]);

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

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.headerSide}>
          <Text style={styles.headerArrow}>←</Text>
        </Pressable>
        <Text style={styles.title}>식단 일기</Text>
        <Pressable hitSlop={12} style={styles.headerSide} onPress={() => {}}>
          <Text style={styles.headerDots}>⋮</Text>
        </Pressable>
      </View>

      <View style={styles.calendarRow}>
        {weekDates.map((iso, idx) => (
          <DateCell
            key={iso}
            iso={iso}
            weekdayInitial={WEEKDAY_INITIALS_EN[idx]}
            selected={iso === selectedDate}
            mealTypes={weekMealTypes[iso] ?? []}
            onPress={() => setSelectedDate(iso)}
          />
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
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
            onPress={() => router.push(`/analysis?recordId=${record.id}`)}
            onLongPress={isToday ? () => handleDelete(record.id) : undefined}
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
  headerSide: { width: 32, alignItems: 'center' },
  headerArrow: { fontSize: 22, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.medium },
  headerDots:  { fontSize: 22, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.medium },
  title: { ...TYPOGRAPHY.heading2, color: COLORS.label.normal, fontWeight: FONT_WEIGHT.bold },

  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: SPACING.pt16,
    paddingVertical: SPACING.pt12,
  },
  dateCell: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  dateWeekday: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.label.alternative,
    fontWeight: FONT_WEIGHT.medium,
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
