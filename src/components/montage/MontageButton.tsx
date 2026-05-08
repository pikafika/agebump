import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONT_WEIGHT, RADIUS, SPACING, SQUIRCLE, TYPOGRAPHY } from '../../constants/theme';

type Variant = 'solid' | 'outlined' | 'text';
type Size = 'small' | 'medium' | 'large';
type Color = 'primary' | 'assistive';

interface MontageButtonProps {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  color?: Color;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

const HEIGHT: Record<Size, number> = { small: 38, medium: 46, large: 54 };
const CORNER: Record<Size, number> = { small: RADIUS.small, medium: RADIUS.medium, large: RADIUS.large };
const TYPO: Record<Size, { fontSize: number; lineHeight: number; letterSpacing: number }> = {
  small:  TYPOGRAPHY.label1,
  medium: TYPOGRAPHY.body2,
  large:  TYPOGRAPHY.body1,
};
const H_PAD: Record<Size, number> = { small: SPACING.pt12, medium: SPACING.pt16, large: SPACING.pt20 };

export function MontageButton({
  label,
  onPress,
  variant = 'solid',
  color = 'primary',
  size = 'large',
  loading = false,
  disabled = false,
  fullWidth = false,
}: MontageButtonProps) {
  const isDisabled = disabled || loading;

  const containerStyle = [
    styles.base,
    {
      height: HEIGHT[size],
      borderRadius: CORNER[size],
      paddingHorizontal: H_PAD[size],
      alignSelf: fullWidth ? ('stretch' as const) : ('flex-start' as const),
    },
    SQUIRCLE,
    variant === 'solid' && (color === 'primary' ? styles.solidPrimary : styles.solidAssistive),
    variant === 'outlined' && (color === 'primary' ? styles.outlinedPrimary : styles.outlinedAssistive),
    variant === 'text' && styles.textVariant,
    isDisabled && styles.disabled,
  ];

  const labelColor =
    isDisabled
      ? COLORS.label.disable
      : variant === 'solid' && color === 'primary'
        ? COLORS.static.white
        : variant === 'solid' && color === 'assistive'
          ? COLORS.label.normal
          : color === 'primary'
            ? COLORS.primary.normal
            : COLORS.label.normal;

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'solid' && color === 'primary' ? '#FFFFFF' : COLORS.primary.normal as string}
        />
      ) : (
        <Text
          style={[
            styles.label,
            TYPO[size],
            { color: labelColor },
          ]}
          numberOfLines={1}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
  },
  solidPrimary: {
    backgroundColor: COLORS.primary.normal,
  },
  solidAssistive: {
    backgroundColor: COLORS.fill.strong,
  },
  outlinedPrimary: {
    borderWidth: 1,
    borderColor: COLORS.primary.normal,
    backgroundColor: 'transparent',
  },
  outlinedAssistive: {
    borderWidth: 1,
    borderColor: COLORS.line.solidNormal,
    backgroundColor: 'transparent',
  },
  textVariant: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontWeight: FONT_WEIGHT.semiBold,
  },
});
