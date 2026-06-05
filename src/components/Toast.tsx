import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import {
  COLORS,
  FONT_WEIGHT,
  RADIUS,
  SHADOW,
  SPACING,
  SQUIRCLE,
  TYPOGRAPHY,
} from '../constants/theme';

type ToastVariant = 'success' | 'error';

interface ToastProps {
  visible: boolean;
  message: string;
  variant?: ToastVariant;
}

/**
 * 화면 하단에 잠깐 떠오르는 확인용 토스트.
 *
 * react-native-web의 Alert.alert은 완전한 no-op이라 웹에서 저장/오류 피드백이
 * 전혀 표시되지 않는다. 이 컴포넌트는 웹·네이티브 모두 동일하게 동작하는
 * 비차단(non-blocking) 피드백 수단으로 그 공백을 메운다.
 *
 * 표시/숨김은 호출 측에서 `visible` prop으로 제어한다 (자동 타이머 없음).
 */
export function Toast({ visible, message, variant = 'success' }: ToastProps) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: visible ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [visible, anim]);

  const translateY = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0],
  });

  const accent =
    variant === 'success' ? COLORS.status.positive : COLORS.status.negative;
  const icon = variant === 'success' ? '✓' : '!';

  return (
    <Animated.View
      pointerEvents="none"
      accessibilityLiveRegion="polite"
      style={[styles.wrap, { opacity: anim, transform: [{ translateY }] }]}
    >
      <View style={styles.toast}>
        <View style={[styles.iconBadge, { backgroundColor: accent as string }]}>
          <Text style={styles.iconText}>{icon}</Text>
        </View>
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: SPACING.pt20,
    right: SPACING.pt20,
    bottom: SPACING.pt32,
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.pt12,
    backgroundColor: COLORS.background.elevated,
    borderRadius: RADIUS.pill,
    paddingVertical: SPACING.pt12,
    paddingHorizontal: SPACING.pt16,
    borderWidth: 1,
    borderColor: COLORS.line.solidNormal,
    ...SQUIRCLE,
    ...SHADOW.small,
  },
  iconBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: COLORS.static.white as string,
    fontSize: 13,
    fontWeight: FONT_WEIGHT.bold,
    lineHeight: 16,
  },
  message: {
    ...TYPOGRAPHY.body2,
    color: COLORS.label.normal,
    fontWeight: FONT_WEIGHT.medium,
    flexShrink: 1,
  },
});

export default Toast;
