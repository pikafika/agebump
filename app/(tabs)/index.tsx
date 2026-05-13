import {
  Camera01Icon,
  Clock01Icon,
  SparklesIcon,
  UserCircleIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react-native';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
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
import { useUserProfileStore } from '../../src/store/userProfileStore';

const APP_NAME = '노화방지턱';
const TICKS_COUNT = 11;
const PILL_HEIGHT = 28;
const CARD_RADIUS = 32;
const CTA_RADIUS = 29; // 32 → 29 (≈10% reduction)

// ── Sine wave SVG ──
const WAVE_HEIGHT = 48;
const WAVE_FILL_DEPTH = 800;
const WAVE_AMP = 18;
const WAVE_FRONT_LEFT = 80;   // waveFront는 카드 좌측에서 이만큼 더 왼쪽에서 시작
const WAVE_BACK_RATIO = 0.3;  // waveBack은 waveWidth의 30% 추가 좌측 이동
const BASE_CYCLE_WIDTH = 164; // 기준 사이클 폭(px) — 화면이 넓어져도 밀도 유지

// waveWidth·cycles를 런타임에 받아 경로 생성
function buildWavePath(totalHeight: number, waveWidth: number, cycles: number): string {
  const mid = WAVE_HEIGHT / 2;
  const cycle = waveWidth / cycles;
  const cp = cycle / 4;
  let d = `M 0 ${mid}`;
  for (let i = 0; i < cycles; i++) {
    const x0 = i * cycle;
    const x1 = x0 + cycle / 2;
    const x2 = x0 + cycle;
    d += ` C ${x0 + cp} ${mid - WAVE_AMP}, ${x1 - cp} ${mid - WAVE_AMP}, ${x1} ${mid}`;
    d += ` C ${x1 + cp} ${mid + WAVE_AMP}, ${x2 - cp} ${mid + WAVE_AMP}, ${x2} ${mid}`;
  }
  d += ` L ${waveWidth} ${totalHeight} L 0 ${totalHeight} Z`;
  return d;
}

interface WaveSvgProps {
  fill: string;
  stroke?: string;
  full?: boolean;
  waveWidth: number;
  pathFull: string;
  pathBand: string;
}
function WaveSvg({ fill, stroke, full = false, waveWidth, pathFull, pathBand }: WaveSvgProps) {
  const h = full ? WAVE_FILL_DEPTH : WAVE_HEIGHT;
  const d = full ? pathFull : pathBand;
  return (
    <Svg width={waveWidth} height={h} pointerEvents="none">
      <Path
        d={d}
        fill={fill}
        stroke={stroke}
        strokeWidth={stroke ? 1.5 : 0}
      />
    </Svg>
  );
}

// ── 상태별 컬러 테마 ───────────────────────────────────────────────────────────
// ratio = totalCalories / dailyCalorieGoal 을 4단계로 분류해 카드/wave/텍스트 색을
// 동시에 변경. 사용자에게 오늘의 진행 상태를 한눈에 보여주는 목적.
type CalorieState = 'start' | 'progress' | 'near' | 'over';

interface CalorieTheme {
  cardBg: string;
  cardBorder: string;
  halo1: string;
  halo2: string;
  waveBackFill: string;
  waveFrontFill: string;
  waveFrontStroke: string;
  text: string;
  textSoft: string;
  badgeDot: string;
}

function getCalorieState(ratio: number): CalorieState {
  if (ratio < 0.30) return 'start';
  if (ratio < 0.80) return 'progress';
  if (ratio < 1.05) return 'near';
  return 'over';
}

const THEME_BY_STATE: Record<CalorieState, CalorieTheme> = {
  start: {
    cardBg:          '#EEF4FA',
    cardBorder:      'rgba(80,130,180,0.20)',
    halo1:           'rgba(200,220,255,0.55)',
    halo2:           'rgba(180,210,255,0.55)',
    waveBackFill:    'rgba(120,170,230,0.12)',
    waveFrontFill:   'rgba(90,150,210,0.18)',
    waveFrontStroke: 'rgba(60,120,180,0.55)',
    text:            '#0F2B4A',
    textSoft:        'rgba(15,43,74,0.65)',
    badgeDot:        '#46B4E6',
  },
  progress: {
    cardBg:          '#F0F8F1',
    cardBorder:      'rgba(70,180,110,0.20)',
    halo1:           'rgba(255,236,179,0.55)',
    halo2:           'rgba(178,232,196,0.55)',
    waveBackFill:    'rgba(140,210,160,0.12)',
    waveFrontFill:   'rgba(102,180,130,0.18)',
    waveFrontStroke: 'rgba(70,150,100,0.55)',
    text:            '#0F3F1A',
    textSoft:        'rgba(15,63,26,0.65)',
    badgeDot:        '#46B46E',
  },
  near: {
    cardBg:          '#FFF7E0',
    cardBorder:      'rgba(220,150,40,0.25)',
    halo1:           'rgba(255,220,150,0.55)',
    halo2:           'rgba(255,200,120,0.55)',
    waveBackFill:    'rgba(245,190,80,0.14)',
    waveFrontFill:   'rgba(230,165,50,0.22)',
    waveFrontStroke: 'rgba(200,130,30,0.6)',
    text:            '#5C3A0A',
    textSoft:        'rgba(92,58,10,0.65)',
    badgeDot:        '#E8A030',
  },
  over: {
    cardBg:          '#FFEEEC',
    cardBorder:      'rgba(220,90,90,0.25)',
    halo1:           'rgba(255,180,160,0.55)',
    halo2:           'rgba(245,150,150,0.55)',
    waveBackFill:    'rgba(240,140,140,0.14)',
    waveFrontFill:   'rgba(220,110,110,0.22)',
    waveFrontStroke: 'rgba(190,80,80,0.6)',
    text:            '#5A1A1A',
    textSoft:        'rgba(90,26,26,0.65)',
    badgeDot:        '#E06060',
  },
};

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
  theme: CalorieTheme;
}

function GaugeCard({ ratio, percent, theme }: GaugeCardProps) {
  const { width: screenWidth } = useWindowDimensions();
  // 카드 가로 = 화면 가로 - 양쪽 마진(SPACING.pt20 × 2)
  const cardWidth = screenWidth - SPACING.pt20 * 2;
  // waveBack이 30% 좌측 이동해도 우측 끝까지 채우려면 이 공식이 필요
  const waveWidth = Math.ceil((cardWidth + WAVE_FRONT_LEFT) / (1 - WAVE_BACK_RATIO)) + 20;
  const waveBackLeft = -(WAVE_FRONT_LEFT + Math.round(waveWidth * WAVE_BACK_RATIO));
  const waveCycles = Math.max(5, Math.ceil(waveWidth / BASE_CYCLE_WIDTH));
  const pathFull = useMemo(
    () => buildWavePath(WAVE_FILL_DEPTH, waveWidth, waveCycles),
    [waveWidth, waveCycles],
  );
  const pathBand = useMemo(
    () => buildWavePath(WAVE_HEIGHT, waveWidth, waveCycles),
    [waveWidth, waveCycles],
  );

  const progress = useRef(new Animated.Value(0)).current;
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: Math.min(Math.max(ratio, 0), 1),
      duration: 1600,
      delay: 120,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [ratio, progress]);

  useEffect(() => {
    const loop1 = Animated.loop(
      Animated.sequence([
        Animated.timing(wave1, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
        Animated.timing(wave1, {
          toValue: 0,
          duration: 1100,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
      ]),
    );
    const loop2 = Animated.loop(
      Animated.sequence([
        Animated.timing(wave2, {
          toValue: 1,
          duration: 1900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
        Animated.timing(wave2, {
          toValue: 0,
          duration: 1900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: false,
        }),
      ]),
    );
    loop1.start();
    loop2.start();
    return () => {
      loop1.stop();
      loop2.stop();
    };
  }, [wave1, wave2]);

  const fillHeight = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  // Pill bottom is offset so it stays inside the card (clamp 6%~94%)
  const pillBottom = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['6%', '94%'],
  });

  // 두 wave가 반대 방향·다른 속도·다른 진폭으로 출렁 → 교차 효과 극대화
  const wave1Y = wave1.interpolate({ inputRange: [0, 1], outputRange: [-22, 22] });
  const wave2Y = wave2.interpolate({ inputRange: [0, 1], outputRange: [20, -20] });

  return (
    <View
      style={[
        styles.gaugeCard,
        { backgroundColor: theme.cardBg, borderColor: theme.cardBorder },
      ]}
      pointerEvents="none"
    >
      {/* Soft decorative blobs (under fill) */}
      <View style={[styles.blob, styles.blobYellow, { backgroundColor: theme.halo1 }]} />
      <View style={[styles.blob, styles.blobMint,   { backgroundColor: theme.halo2 }]} />

      {/* Animated fill clip */}
      <View style={styles.gaugeClip}>
        <Animated.View
          style={[styles.gaugeFill, { height: fillHeight }]}
        >
          {/* wave 두 겹 — sin 표면 + 그 아래로 풀 채움. 어긋난 페이즈로 위·아래 출렁 */}
          <Animated.View
            style={[
              styles.wave,
              styles.waveBack,
              { width: waveWidth, left: waveBackLeft, transform: [{ translateY: wave2Y }] },
            ]}
          >
            <WaveSvg fill={theme.waveBackFill} full waveWidth={waveWidth} pathFull={pathFull} pathBand={pathBand} />
          </Animated.View>
          <Animated.View
            style={[
              styles.wave,
              styles.waveFront,
              { width: waveWidth, left: -WAVE_FRONT_LEFT, transform: [{ translateY: wave1Y }] },
            ]}
          >
            <WaveSvg fill={theme.waveFrontFill} stroke={theme.waveFrontStroke} full waveWidth={waveWidth} pathFull={pathFull} pathBand={pathBand} />
          </Animated.View>
        </Animated.View>
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
  const { width: screenWidth } = useWindowDimensions();
  const { getTodayTotalCalories } = useFoodStore();
  const dailyCalorieGoal = useUserProfileStore((s) => s.dailyCalorieGoal);
  const totalCalories = getTodayTotalCalories();
  const remaining = Math.max(dailyCalorieGoal - totalCalories, 0);
  const ratio = dailyCalorieGoal > 0 ? totalCalories / dailyCalorieGoal : 0;
  const percent = Math.min(Math.round(ratio * 100), 999);
  const theme = THEME_BY_STATE[getCalorieState(ratio)];

  // 최종 수치 기준으로 폰트 크기 결정 → 애니메이션 중에도 레이아웃 안정
  // 가용 폭 = 화면 - hero 좌우 마진(pt20×2) - heroContent 패딩(left pt32 + right pt56) - kcal 텍스트+갭 추정치
  const numberAreaWidth = screenWidth - SPACING.pt20 * 2 - SPACING.pt32 - SPACING.pt56 - 70;
  const calStr = totalCalories.toLocaleString('ko-KR');
  const calorieFs = Math.min(128, Math.max(36, Math.floor(numberAreaWidth / (calStr.length * 0.55))));

  // 칼로리 카운트업: 0 → totalCalories (게이지 차오름과 싱크)
  const calAnim = useRef(new Animated.Value(0)).current;
  const [displayCal, setDisplayCal] = useState(0);
  useEffect(() => {
    const id = calAnim.addListener(({ value }) => setDisplayCal(Math.round(value)));
    calAnim.setValue(0);
    Animated.timing(calAnim, {
      toValue: totalCalories,
      duration: 1600,
      delay: 120,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
    return () => calAnim.removeListener(id);
  }, [totalCalories, calAnim]);

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
        <GaugeCard ratio={ratio} percent={percent} theme={theme} />

        <View style={styles.heroContent}>
          {/* Date label as a pill */}
          <View style={styles.dateBadge}>
            <View style={[styles.dateBadgeDot, { backgroundColor: theme.badgeDot }]} />
            <Text style={styles.dateBadgeText}>{dateLabel()}</Text>
          </View>

          <View style={styles.calorieBlock}>
            <Text
              style={[styles.calorieNumber, { color: theme.text, fontSize: calorieFs, lineHeight: calorieFs + 4 }]}
              numberOfLines={1}
            >
              {displayCal.toLocaleString('ko-KR')}
            </Text>
            <Text style={[styles.calorieUnit, { color: theme.textSoft }]}>kcal</Text>
          </View>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text
                style={[styles.metaValue, { color: theme.text }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.6}
              >
                {dailyCalorieGoal.toLocaleString('ko-KR')}
              </Text>
              <Text style={[styles.metaLabel, { color: theme.textSoft }]}>목표</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Text
                style={[styles.metaValue, { color: theme.text }]}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.6}
              >
                {remaining.toLocaleString('ko-KR')}
              </Text>
              <Text style={[styles.metaLabel, { color: theme.textSoft }]}>남은 칼로리</Text>
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
  // backgroundColor / borderColor 는 상태별 테마로 인라인 적용
  gaugeCard: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: CARD_RADIUS,
    borderWidth: 1,
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
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  wave: {
    position: 'absolute',
    height: WAVE_FILL_DEPTH,
    // width·left는 GaugeCard에서 인라인으로 동적 적용
  },
  waveBack: {
    top: -WAVE_HEIGHT / 2 - 4,
    // left는 GaugeCard에서 인라인으로 동적 적용
  },
  waveFront: {
    top: -WAVE_HEIGHT / 2 - 12,
    // left는 GaugeCard에서 인라인으로 동적 적용
  },
  blob: {
    position: 'absolute',
    borderRadius: 9999,
  },
  // blob 배경색은 상태별 테마로 인라인 적용
  blobYellow: {
    width: 220,
    height: 220,
    top: -60,
    left: -50,
    opacity: 0.7,
  },
  blobMint: {
    width: 260,
    height: 260,
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
    width: '100%',
  },
  calorieNumber: {
    fontFamily: FONT_FAMILY.brand,
    letterSpacing: -3,
    flexShrink: 1,
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
