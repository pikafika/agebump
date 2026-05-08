import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONT_WEIGHT, RADIUS, SPACING, TYPOGRAPHY } from '../../constants/theme';

type BadgeVariant = 'solid' | 'fill';
type BadgeColor = 'primary' | 'positive' | 'cautionary' | 'negative' | 'neutral';

interface MontageBadgeProps {
  label: string;
  variant?: BadgeVariant;
  color?: BadgeColor;
}

const BG: Record<BadgeColor, Record<BadgeVariant, object>> = {
  primary:    { solid: { backgroundColor: COLORS.primary.normal },    fill: { backgroundColor: COLORS.fill.normal } },
  positive:   { solid: { backgroundColor: COLORS.status.positive },   fill: { backgroundColor: COLORS.fill.normal } },
  cautionary: { solid: { backgroundColor: COLORS.status.cautionary }, fill: { backgroundColor: COLORS.fill.normal } },
  negative:   { solid: { backgroundColor: COLORS.status.negative },   fill: { backgroundColor: COLORS.fill.normal } },
  neutral:    { solid: { backgroundColor: COLORS.fill.strong },       fill: { backgroundColor: COLORS.fill.alternative } },
};

const TEXT_COLOR: Record<BadgeColor, Record<BadgeVariant, object>> = {
  primary:    { solid: { color: COLORS.static.white },  fill: { color: COLORS.primary.normal } },
  positive:   { solid: { color: COLORS.static.white },  fill: { color: COLORS.status.positive } },
  cautionary: { solid: { color: COLORS.static.white },  fill: { color: COLORS.status.cautionary } },
  negative:   { solid: { color: COLORS.static.white },  fill: { color: COLORS.status.negative } },
  neutral:    { solid: { color: COLORS.label.normal },  fill: { color: COLORS.label.alternative } },
};

export function MontageBadge({ label, variant = 'fill', color = 'neutral' }: MontageBadgeProps) {
  return (
    <View style={[styles.badge, BG[color][variant]]}>
      <Text style={[styles.label, TEXT_COLOR[color][variant]]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.pt08,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
  },
  label: {
    ...TYPOGRAPHY.caption1,
    fontWeight: FONT_WEIGHT.semiBold,
  },
});
