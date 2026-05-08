import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_WEIGHT, GLYCEMIC_COLOR, RADIUS, SPACING, SQUIRCLE, TYPOGRAPHY } from '../../constants/theme';

interface NutritionBarProps {
  carbs: number;
  protein: number;
  fat: number;
}

const NUTRIENTS = [
  { key: 'carbs', label: '탄수화물', color: GLYCEMIC_COLOR.moderate, unit: 'g' },
  { key: 'protein', label: '단백질', color: COLORS.status.positive, unit: 'g' },
  { key: 'fat', label: '지방', color: COLORS.status.cautionary, unit: 'g' },
] as const;

export function NutritionBar({ carbs, protein, fat }: NutritionBarProps) {
  const values: Record<string, number> = { carbs, protein, fat };
  const total = carbs + protein + fat || 1;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>영양 구성</Text>
      {NUTRIENTS.map(({ key, label, color }) => {
        const value = values[key] ?? 0;
        const pct = Math.min((value / total) * 100, 100);
        return (
          <View key={key} style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${pct}%`, backgroundColor: color }]} />
            </View>
            <Text style={styles.value}>{value}g</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background.elevated,
    borderRadius: RADIUS.large,
    padding: SPACING.pt16,
    gap: SPACING.pt12,
    ...SQUIRCLE,
  },
  title: {
    ...TYPOGRAPHY.label2,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.label.alternative,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.pt08,
  },
  label: {
    width: 60,
    ...TYPOGRAPHY.label2,
    color: COLORS.label.normal,
    fontWeight: FONT_WEIGHT.medium,
  },
  track: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.line.solidNormal,
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: RADIUS.pill,
  },
  value: {
    width: 36,
    ...TYPOGRAPHY.label2,
    color: COLORS.label.normal,
    textAlign: 'right',
    fontWeight: FONT_WEIGHT.medium,
  },
});
