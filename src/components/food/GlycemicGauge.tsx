import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_WEIGHT, GLYCEMIC_COLOR, RADIUS, SPACING, SQUIRCLE, TYPOGRAPHY } from '../../constants/theme';
import { type GlycemicLevel } from '../../types/food';

interface GlycemicGaugeProps {
  giLevel: GlycemicLevel;
  gi: number;
}

const LEVELS: GlycemicLevel[] = ['low', 'moderate', 'high', 'veryHigh'];

const LEVEL_LABELS: Record<GlycemicLevel, string> = {
  low: '낮음',
  moderate: '보통',
  high: '높음',
  veryHigh: '매우높음',
};

export function GlycemicGauge({ giLevel, gi }: GlycemicGaugeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>혈당 영향도</Text>
        <Text style={[styles.badge, { backgroundColor: GLYCEMIC_COLOR[giLevel] }]}>
          {LEVEL_LABELS[giLevel]}
        </Text>
      </View>

      <View style={styles.gauge}>
        {LEVELS.map((level, idx) => (
          <View
            key={level}
            style={[
              styles.segment,
              {
                backgroundColor: GLYCEMIC_COLOR[level],
                opacity: giLevel === level ? 1 : 0.25,
              },
              idx === 0 && styles.segmentFirst,
              idx === LEVELS.length - 1 && styles.segmentLast,
            ]}
          />
        ))}
      </View>

      <View style={styles.labelRow}>
        {LEVELS.map((level) => (
          <Text
            key={level}
            style={[
              styles.segmentLabel,
              giLevel === level && { color: GLYCEMIC_COLOR[level], fontWeight: FONT_WEIGHT.bold },
            ]}
          >
            {LEVEL_LABELS[level]}
          </Text>
        ))}
      </View>

      <Text style={styles.giValue}>GI 지수 {gi}</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...TYPOGRAPHY.label2,
    fontWeight: FONT_WEIGHT.semiBold,
    color: COLORS.label.alternative,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badge: {
    ...TYPOGRAPHY.caption1,
    fontWeight: FONT_WEIGHT.bold,
    color: '#FFFFFF',
    paddingHorizontal: SPACING.pt08,
    paddingVertical: 2,
    borderRadius: RADIUS.pill,
    overflow: 'hidden',
  },
  gauge: {
    flexDirection: 'row',
    height: 12,
    gap: 3,
  },
  segment: {
    flex: 1,
    borderRadius: 2,
  },
  segmentFirst: {
    borderTopLeftRadius: RADIUS.pill,
    borderBottomLeftRadius: RADIUS.pill,
  },
  segmentLast: {
    borderTopRightRadius: RADIUS.pill,
    borderBottomRightRadius: RADIUS.pill,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  segmentLabel: {
    ...TYPOGRAPHY.caption1,
    color: COLORS.label.alternative,
    flex: 1,
    textAlign: 'center',
  },
  giValue: {
    ...TYPOGRAPHY.label2,
    color: COLORS.label.alternative,
    textAlign: 'right',
  },
});
