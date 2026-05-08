import {
  Camera01Icon,
  Clock01Icon,
  SparklesIcon,
  UserCircleIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react-native';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  COLORS,
  FONT_FAMILY,
  FONT_WEIGHT,
  RADIUS,
  SHADOW,
  SPACING,
  SQUIRCLE,
  TYPOGRAPHY,
} from '../../src/constants/theme';
import { useFoodStore } from '../../src/store/foodStore';

const TARGET_CALORIES = 2000;
const APP_NAME = '노화방지턱';
const TICKS_COUNT = 11;
const PILL_HEIGHT = 28;
const CARD_RADIUS = 32;
const CTA_RADIUS = 29; // 32 → 29 (≈10% reduction)

// Soft pastel mint palette for the gauge card
const CARD_BG_EMPTY = '#F0F8F1';
const CARD_BG_FILL = '#B8E6C1';
const CARD_BORDER = 'rgba(70,180,110,0.20)';
const CARD_HALO_1 = 'rgba(255,236,179,0.55)'; // warm yellow blob
const CARD_HALO_2 = 'rgba(178,232,196,0.55)'; // mint blob

function dateLabel(): string {
  const d = new Date();
  return d.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' }) + ' 섭취 칼로리';
}

interface HeaderIconButtonProps {
  icon: IconSvgElement;
  onPress: () => void;
  accessibilityLabel: string;
}

function HeaderIconButton({ icon, onPress, accessibilityLabel }: HeaderIconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      style={({ pressed }) => [styles.headerIconBtn, pressed && styles.pressed]}
    >
      <HugeiconsIcon
        icon={icon}
        size={24}
        color={COLORS.label.normal as string}
        strokeWidth={1.6}
      />
    </Pressable>
  );
}

interface GaugeCardProps {
  ratio: number;
  percent: number;
}

function GaugeCard({ ratio, percent }: GaugeCardProps) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: Math.min(Math.max(ratio, 0), 1),
      duration: 1400,
      delay: 120,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [ratio, progress]);

  const fillHeight = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Pill bottom is offset so it stays inside the card (clamp 6%~94%)
  const pillBottom = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['6%', '94%'],
  });

  return (
    <View style={styles.gaugeCard} pointerEvents="none">
      {/* Soft decorative blobs (under fill) */}
      <View style={[styles.blob, styles.blobYellow]} />
      <View style={[styles.blob, styles.blobMint]} />

      {/* Animated fill clip */}
      <View style={styles.gaugeClip}>
        <Animated.View style={[styles.gaugeFill, { height: fillHeight }]} />
      </View>

      {/* Sparkle decorations */}
      <View style={[styles.sparkle, styles.sparkleTopLeft]}>
        <HugeiconsIcon icon={SparklesIcon} size={20} color="#FFD66B" strokeWidth={1.8} />
      </View>
      <View style={[styles.sparkle, styles.sparkleBottomLeft]}>
        <HugeiconsIcon icon={SparklesIcon} size={16} color="#FFD66B" strokeWidth={1.8} />
      </View>

      {/* Right scale column */}
      <View style={styles.scaleColumn}>
        {Array.from({ length: TICKS_COUNT }).map((_, i) => (
          <View
            key={i}
            style={[styles.tick, (i === 0 || i === TICKS_COUNT - 1) && styles.tickEdge]}
          />
        ))}
      </View>

      {/* 0% label OUTSIDE clipping concerns — centered next to bottom tick */}
      <View style={styles.scaleZeroLabel}>
        <Text style={styles.scaleZeroText}>0%</Text>
      </View>

      {/* Animated percent pill */}
      <Animated.View
        style={[styles.pill, { bottom: pillBottom, marginBottom: -PILL_HEIGHT / 2 }]}
      >
        <Text style={styles.pillText}>{percent}%</Text>
      </Animated.View>
    </View>
  );
}

export function HomeScreen() {
  const { getTodayTotalCalories } = useFoodStore();
  const totalCalories = getTodayTotalCalories();
  const remaining = Math.max(TARGET_CALORIES - totalCalories, 0);
  const ratio = totalCalories / TARGET_CALORIES;
  const percent = Math.min(Math.round(ratio * 100), 999);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* ── Top Bar ── */}
      <View style={styles.topBar}>
        <Text style={styles.appName}>{APP_NAME}</Text>
        <View style={styles.topBarActions}>
          <HeaderIconButton
            icon={Clock01Icon}
            onPress={() => router.push('/history')}
            accessibilityLabel="히스토리"
          />
          <HeaderIconButton
            icon={UserCircleIcon}
            onPress={() => router.push('/profile')}
            accessibilityLabel="계정"
          />
        </View>
      </View>

      {/* ── Hero with Gauge Card Background ── */}
      <View style={styles.hero}>
        <GaugeCard ratio={ratio} percent={percent} />

        <View style={styles.heroContent}>
          {/* Date label as a pill */}
          <View style={styles.dateBadge}>
            <View style={styles.dateBadgeDot} />
            <Text style={styles.dateBadgeText}>{dateLabel()}</Text>
          </View>

          <View style={styles.calorieBlock}>
            <Text style={styles.calorieNumber} numberOfLines={1} adjustsFontSizeToFit>
              {totalCalories.toLocaleString('ko-KR')}
            </Text>
            <Text style={styles.calorieUnit}>kcal</Text>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaValue}>{TARGET_CALORIES.toLocaleString('ko-KR')}</Text>
              <Text style={styles.metaLabel}>목표</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Text style={styles.metaValue}>{remaining.toLocaleString('ko-KR')}</Text>
              <Text style={styles.metaLabel}>남은 칼로리</Text>
            </View>
          </View>
        </View>
      </View>

      {/* ── Primary CTA ── */}
      <View style={styles.ctaWrap}>
        <Pressable
          onPress={() => router.push('/camera')}
          accessibilityRole="button"
          accessibilityLabel="식단 찍기"
          style={({ pressed }) => [styles.ctaShadow, pressed && styles.ctaPressed]}
        >
          <View style={styles.ctaButton}>
            <HugeiconsIcon
              icon={Camera01Icon}
              size={22}
              color={COLORS.static.white}
              strokeWidth={1.8}
            />
            <Text style={styles.ctaTitle}>식단 찍기</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.normalAlternative,
  },

  // ── Top Bar ──
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.pt20,
    paddingTop: SPACING.pt12,
    paddingBottom: SPACING.pt08,
  },
  appName: {
    fontFamily: FONT_FAMILY.brand,
    fontSize: 26,
    color: COLORS.label.normal,
    letterSpacing: -0.5,
    // small visual lift via padding so the descender of 노/방 doesn't crop
    paddingVertical: 2,
  },
  topBarActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.pt04,
  },
  headerIconBtn: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },

  // ── Hero ──
  hero: {
    flex: 1,
    marginHorizontal: SPACING.pt20,
    marginTop: SPACING.pt08,
    marginBottom: SPACING.pt16,
  },
  heroContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.pt20,
    paddingRight: SPACING.pt56, // reserve space for right scale + pill
    paddingLeft: SPACING.pt32,  // align with sparkle decorations on left
  },

  // ── Gauge Card ──
  gaugeCard: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: CARD_RADIUS,
    backgroundColor: CARD_BG_EMPTY,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    overflow: 'hidden',
    ...SQUIRCLE,
  },
  gaugeClip: {
    ...StyleSheet.absoluteFillObject,
  },
  gaugeFill: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: CARD_BG_FILL,
    opacity: 0.55,
  },
  blob: {
    position: 'absolute',
    borderRadius: 9999,
  },
  blobYellow: {
    width: 220,
    height: 220,
    backgroundColor: CARD_HALO_1,
    top: -60,
    left: -50,
    opacity: 0.7,
  },
  blobMint: {
    width: 260,
    height: 260,
    backgroundColor: CARD_HALO_2,
    bottom: -90,
    right: -80,
    opacity: 0.6,
  },
  sparkle: {
    position: 'absolute',
  },
  sparkleTopLeft: {
    top: 20,
    left: 22,
  },
  sparkleBottomLeft: {
    bottom: 60,
    left: 38,
  },

  // ── Right scale column ──
  scaleColumn: {
    position: 'absolute',
    right: 18,
    top: 24,
    bottom: 36, // leave room for "0%" label below ticks
    width: 18,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  tick: {
    width: 12,
    height: 2,
    backgroundColor: 'rgba(40,90,55,0.55)',
    borderRadius: 1,
  },
  tickEdge: {
    width: 18,
    height: 2.5,
    backgroundColor: 'rgba(40,90,55,0.85)',
  },
  scaleZeroLabel: {
    position: 'absolute',
    right: 16,
    bottom: 14,
    width: 22,
    alignItems: 'center',
  },
  scaleZeroText: {
    fontSize: 11,
    color: 'rgba(40,90,55,0.85)',
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: 0.2,
  },
  pill: {
    position: 'absolute',
    right: 22,
    height: PILL_HEIGHT,
    paddingHorizontal: 12,
    minWidth: 56,
    borderRadius: PILL_HEIGHT / 2,
    backgroundColor: '#1B2A1F',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 5,
    ...SQUIRCLE,
  },
  pillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: 0.2,
  },

  // ── Hero Content ──
  dateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.pt08,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: RADIUS.pill,
    paddingVertical: 6,
    paddingHorizontal: SPACING.pt12,
    marginBottom: SPACING.pt16,
    borderWidth: 1,
    borderColor: 'rgba(70,180,110,0.18)',
    shadowColor: '#0F3F1A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    ...SQUIRCLE,
  },
  dateBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#46B46E',
  },
  dateBadgeText: {
    ...TYPOGRAPHY.label1,
    color: '#1B2A1F',
    fontWeight: FONT_WEIGHT.bold,
    letterSpacing: 0.1,
  },
  calorieBlock: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: SPACING.pt08,
    marginBottom: SPACING.pt28,
  },
  calorieNumber: {
    fontFamily: FONT_FAMILY.brand,
    fontSize: 128,
    lineHeight: 132,
    color: '#0F3F1A',
    letterSpacing: -3,
  },
  calorieUnit: {
    fontFamily: FONT_FAMILY.brand,
    fontSize: 26,
    color: 'rgba(15,63,26,0.65)',
    letterSpacing: -0.5,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: RADIUS.large,
    paddingVertical: SPACING.pt12,
    paddingHorizontal: SPACING.pt24, // 16 → 24 (≈+50%) → wider per +20% spec floor
    minWidth: 280, // ensures the card itself is ~20% wider than prior layout
    ...SQUIRCLE,
    ...SHADOW.xsmall,
  },
  metaItem: {
    paddingHorizontal: SPACING.pt16,
    alignItems: 'center',
    gap: 2,
  },
  metaValue: {
    ...TYPOGRAPHY.headline2,
    color: '#0F3F1A',
    fontWeight: FONT_WEIGHT.bold,
  },
  metaLabel: {
    ...TYPOGRAPHY.caption1,
    color: 'rgba(15,63,26,0.6)',
    fontWeight: FONT_WEIGHT.medium,
  },
  metaDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(15,63,26,0.12)',
    marginHorizontal: SPACING.pt04,
  },

  // ── CTA ──
  ctaWrap: {
    paddingHorizontal: SPACING.pt20,
    paddingBottom: SPACING.pt24,
  },
  ctaShadow: {
    width: '100%',
    borderRadius: CTA_RADIUS,
    shadowColor: COLORS.primary.normal as string,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.32,
    shadowRadius: 28,
    elevation: 14,
    ...SQUIRCLE,
  },
  ctaPressed: {
    transform: [{ scale: 0.98 }],
    shadowOpacity: 0.22,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary.normal as string,
    borderRadius: CTA_RADIUS,
    paddingVertical: SPACING.pt20,
    paddingHorizontal: SPACING.pt24,
    gap: SPACING.pt08,
    overflow: 'hidden',
    ...SQUIRCLE,
  },
  ctaTitle: {
    fontFamily: FONT_FAMILY.brand,
    fontSize: 20,
    color: COLORS.static.white,
    letterSpacing: -0.3,
  },
});

export default HomeScreen;
