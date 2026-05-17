import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_FAMILY, FONT_WEIGHT, RADIUS, SHADOW, SPACING, SQUIRCLE, TYPOGRAPHY } from '../constants/theme';
import { type FoodRecord, type PostMealFeeling } from '../types/food';
import { useFoodStore } from '../store/foodStore';

interface PostMealCheckCardProps {
  record: FoodRecord;
  onRespond: () => void;
}

function getRepresentativeFoodName(record: FoodRecord): string {
  if (record.foods.length === 0) return '드신 음식';
  if (record.foods.length === 1) return record.foods[0].name;
  return `${record.foods[0].name} 외 ${record.foods.length - 1}가지`;
}

function getElapsedLabel(timestamp: number): string {
  const minutes = Math.round((Date.now() - timestamp) / 60000);
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  const rem = minutes % 60;
  return rem > 0 ? `${hours}시간 ${rem}분 전` : `${hours}시간 전`;
}

export function PostMealCheckCard({ record, onRespond }: PostMealCheckCardProps) {
  const updateRecord = useFoodStore((s) => s.updateRecord);
  const foodName = getRepresentativeFoodName(record);
  const elapsedLabel = getElapsedLabel(record.timestamp);

  function handleRespond(feeling: PostMealFeeling) {
    updateRecord(record.id, { postMealFeeling: feeling });
    onRespond();
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.elapsed}>{elapsedLabel}</Text>
        <Pressable
          onPress={() => handleRespond('skipped')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={styles.skipText}>건너뛰기</Text>
        </Pressable>
      </View>

      <Text style={styles.question}>
        <Text style={styles.foodName}>{foodName}</Text>
        {' 드신 후,\n컨디션이 어땠나요?'}
      </Text>

      <View style={styles.buttonRow}>
        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnDrowsy, pressed && styles.pressed]}
          onPress={() => handleRespond('drowsy')}
          accessibilityRole="button"
          accessibilityLabel="졸렸어요"
        >
          <Text style={styles.btnEmoji}>😴</Text>
          <Text style={styles.btnLabel}>졸렸어요</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [styles.btn, styles.btnFine, pressed && styles.pressed]}
          onPress={() => handleRespond('fine')}
          accessibilityRole="button"
          accessibilityLabel="괜찮았어요"
        >
          <Text style={styles.btnEmoji}>😊</Text>
          <Text style={styles.btnLabel}>괜찮았어요</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background.normal as string,
    borderRadius: RADIUS.extraLarge,
    borderWidth: 1,
    borderColor: 'rgba(120,170,230,0.22)',
    paddingHorizontal: SPACING.pt20,
    paddingTop: SPACING.pt16,
    paddingBottom: SPACING.pt20,
    gap: SPACING.pt12,
    ...SQUIRCLE,
    ...SHADOW.small,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  elapsed: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.label.alternative as string,
    fontWeight: FONT_WEIGHT.medium,
  },
  skipText: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.label.alternative as string,
    fontWeight: FONT_WEIGHT.medium,
  },
  question: {
    ...TYPOGRAPHY.body2,
    color: COLORS.label.normal as string,
    fontWeight: FONT_WEIGHT.medium,
    lineHeight: 22,
  },
  foodName: {
    fontFamily: FONT_FAMILY.brand,
    color: COLORS.primary.normal as string,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.pt08,
    marginTop: SPACING.pt04,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.pt08,
    paddingVertical: SPACING.pt12,
    borderRadius: RADIUS.large,
    borderWidth: 1,
    ...SQUIRCLE,
  },
  btnDrowsy: {
    backgroundColor: 'rgba(90,140,210,0.08)',
    borderColor: 'rgba(90,140,210,0.22)',
  },
  btnFine: {
    backgroundColor: 'rgba(70,180,110,0.08)',
    borderColor: 'rgba(70,180,110,0.22)',
  },
  pressed: {
    opacity: 0.6,
  },
  btnEmoji: {
    fontSize: 18,
  },
  btnLabel: {
    ...TYPOGRAPHY.label1,
    color: COLORS.label.normal as string,
    fontWeight: FONT_WEIGHT.bold,
  },
});
