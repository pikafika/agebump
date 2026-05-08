import { Circle, G, Svg, Text as SvgText } from 'react-native-svg';
import { StyleSheet, Text, View } from 'react-native';
import { GLYCEMIC_COLOR } from '../../constants/theme';
import { type GlycemicLevel, type MealType } from '../../types/food';

const SIZE = 200;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 76;
const STROKE = 20;
const C = 2 * Math.PI * R;
const SEG_GAP = 26;

const PILL_W = 34;
const PILL_H = 18;

const MEAL_COLORS: Record<MealType, string> = {
  breakfast: '#FBBF24',
  lunch:     '#34D399',
  dinner:    '#818CF8',
  snack:     '#FB7185',
};

const MEAL_KO: Record<MealType, string> = {
  breakfast: '아침',
  lunch:     '점심',
  dinner:    '저녁',
  snack:     '간식',
};

const GI_KO: Record<GlycemicLevel, string> = {
  low:      '낮음',
  moderate: '보통',
  high:     '높음',
  veryHigh: '매우 높음',
};

const MEAL_ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

export type MealCalories = Record<MealType, number>;

interface Props {
  consumed: number;
  target: number;
  giLevel: GlycemicLevel;
  mealCalories: MealCalories;
}

export function CalorieDonut({ consumed, target, giLevel, mealCalories }: Props) {
  const progress = consumed > 0 ? Math.min(consumed / target, 1) : 0;
  const filledArc = C * progress;
  const activeMeals = MEAL_ORDER.filter((m) => mealCalories[m] > 0);
  const gapTotal = activeMeals.length > 1 ? SEG_GAP * activeMeals.length : 0;
  const drawableArc = Math.max(filledArc - gapTotal, 0);

  let cursor = 0;
  const segments = activeMeals.map((type) => {
    const len = (mealCalories[type] / consumed) * drawableArc;
    const startRotDeg = (cursor / C) * 360 - 90;
    cursor += len + (activeMeals.length > 1 ? SEG_GAP : 0);
    const midAngleDeg = startRotDeg + (len / C) * 180;
    const midAngleRad = (midAngleDeg * Math.PI) / 180;
    const spanDeg = (len / C) * 360;
    return { type, len, startRotDeg, midAngleRad, spanDeg };
  });

  const giColor = GLYCEMIC_COLOR[giLevel] as string;
  const remaining = Math.max(target - consumed, 0);

  return (
    <View style={styles.container}>
      {/* ── Donut + floating meal labels ── */}
      <View style={styles.donutWrap}>
        <Svg width={SIZE} height={SIZE} style={StyleSheet.absoluteFill}>
          {/* Background track */}
          <Circle
            cx={CX} cy={CY} r={R}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={STROKE}
            fill="none"
          />
          {/* Meal arcs */}
          {segments.map(({ type, len, startRotDeg }) => (
            <G key={type} transform={`rotate(${startRotDeg} ${CX} ${CY})`}>
              <Circle
                cx={CX} cy={CY} r={R}
                stroke={MEAL_COLORS[type]}
                strokeWidth={STROKE}
                fill="none"
                strokeDasharray={`${len} ${C - len}`}
                strokeLinecap="round"
              />
            </G>
          ))}
          {/* Center text */}
          <SvgText
            x={CX} y={CY - 8}
            textAnchor="middle"
            fill="#fff"
            fontSize={28}
            fontWeight="700"
          >
            {consumed > 0 ? consumed.toLocaleString() : '0'}
          </SvgText>
          <SvgText
            x={CX} y={CY + 10}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            fontSize={11}
          >
            kcal 섭취
          </SvgText>
          <SvgText
            x={CX} y={CY + 24}
            textAnchor="middle"
            fill="rgba(255,255,255,0.38)"
            fontSize={9.5}
          >
            / {target.toLocaleString()} kcal
          </SvgText>
        </Svg>

        {/* Meal label pills — positioned on each arc segment */}
        {segments.map(({ type, midAngleRad, spanDeg }) => {
          if (spanDeg < 20) return null;
          const lx = CX + R * Math.cos(midAngleRad);
          const ly = CY + R * Math.sin(midAngleRad);
          return (
            <View
              key={type}
              style={[
                styles.pill,
                {
                  backgroundColor: MEAL_COLORS[type],
                  left: lx - PILL_W / 2,
                  top: ly - PILL_H / 2,
                },
              ]}
            >
              <Text style={styles.pillText}>{MEAL_KO[type]}</Text>
            </View>
          );
        })}
      </View>

      {/* ── GI badge + remaining ── */}
      <View style={styles.infoRow}>
        <View style={[styles.giBadge, { backgroundColor: giColor }]}>
          <Text style={styles.giBadgeText}>혈당 {GI_KO[giLevel]}</Text>
        </View>
        <Text style={styles.remainingText}>
          {remaining > 0
            ? `${remaining.toLocaleString()} kcal 남음`
            : consumed > 0
              ? '🎯 목표 달성'
              : '오늘 첫 식사를 기록해보세요'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 12,
  },
  donutWrap: {
    width: SIZE,
    height: SIZE,
  },
  pill: {
    position: 'absolute',
    width: PILL_W,
    height: PILL_H,
    borderRadius: PILL_H / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 3,
    elevation: 3,
  },
  pillText: {
    fontSize: 9,
    color: '#fff',
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  giBadge: {
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 20,
  },
  giBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '700',
  },
  remainingText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '500',
  },
});
