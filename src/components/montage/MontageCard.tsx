import { StyleSheet, View, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SHADOW, SPACING, SQUIRCLE } from '../../constants/theme';

interface MontageCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
  noPadding?: boolean;
}

export function MontageCard({ children, style, elevated = true, noPadding = false }: MontageCardProps) {
  return (
    <View
      style={[
        styles.card,
        elevated && SHADOW.small,
        noPadding && styles.noPadding,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background.elevated,
    borderRadius: RADIUS.extraLarge,
    padding: SPACING.pt20,
    ...SQUIRCLE,
  },
  noPadding: {
    padding: 0,
  },
});
