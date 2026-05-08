import { ColorValue, DynamicColorIOS, Platform } from 'react-native';
import { type GlycemicLevel } from '../types/food';

const IOS = Platform.OS === 'ios';

function dynamic(light: string, dark: string): ColorValue {
  return IOS ? DynamicColorIOS({ light, dark }) : light;
}

// ─── Atomic Palette ───────────────────────────────────────────────────────────

const P = {
  // Common
  common0:   '#000000',
  common100: '#FFFFFF',

  // Neutral (warm gray)
  neutral10: '#171717',
  neutral99: '#F7F7F7',

  // Cool Neutral (slightly blue-tinted gray)
  coolNeutral5:  '#0F0F10',
  coolNeutral7:  '#141415',
  coolNeutral10: '#171719',
  coolNeutral15: '#1B1C1E',
  coolNeutral17: '#212225',
  coolNeutral22: '#2E2F33',
  coolNeutral23: '#333438',
  coolNeutral25: '#37383C',
  coolNeutral40: '#5A5C63',
  coolNeutral50: '#70737C',
  coolNeutral70: '#989AA2',
  coolNeutral80: '#AEB0B6',
  coolNeutral90: '#C2C4C8',
  coolNeutral96: '#E1E2E4',
  coolNeutral97: '#EAEBEC',
  coolNeutral98: '#F4F4F5',
  coolNeutral99: '#F7F7F8',

  // Blue (primary)
  blue40: '#0054D1',
  blue45: '#0D63F3',
  blue50: '#0066FF',
  blue55: '#1A75FF',
  blue60: '#3385FF',

  // Green (status positive)
  green40: '#009632',
  green50: '#00BF40',
  green60: '#19CC59',

  // Red (status negative)
  red40: '#E52222',
  red50: '#FF4242',
  red60: '#FF6666',

  // Orange (status cautionary)
  orange39: '#D17600',
  orange40: '#D47800',
  orange50: '#FF9200',
  orange60: '#FFA533',
} as const;

// ─── Semantic Colors (Light/Dark Dynamic) ─────────────────────────────────────

export const COLORS = {
  // Primary
  primary: {
    normal:  dynamic(P.blue50,  P.blue60),
    strong:  dynamic(P.blue45,  P.blue55),
    heavy:   dynamic(P.blue40,  P.blue50),
  },

  // Label (Text)
  label: {
    normal:      dynamic(P.coolNeutral10,                    P.coolNeutral99),
    strong:      dynamic(P.common0,                          P.common100),
    neutral:     dynamic('rgba(55,56,60,0.88)',              'rgba(194,196,200,0.88)'),
    alternative: dynamic('rgba(55,56,60,0.61)',              'rgba(174,176,182,0.61)'),
    assistive:   dynamic('rgba(55,56,60,0.28)',              'rgba(174,176,182,0.28)'),
    disable:     dynamic('rgba(55,56,60,0.16)',              'rgba(152,155,162,0.16)'),
  },

  // Background
  background: {
    normal:            dynamic(P.common100,     P.coolNeutral15),
    normalAlternative: dynamic(P.coolNeutral99, P.coolNeutral5),
    elevated:          dynamic(P.common100,     P.coolNeutral17),
  },

  // Line / Border
  line: {
    normal:          dynamic('rgba(112,115,124,0.22)', 'rgba(112,115,124,0.32)'),
    solidNormal:     dynamic(P.coolNeutral96,           P.coolNeutral25),
    solidNeutral:    dynamic(P.coolNeutral97,           P.coolNeutral23),
    solidAlternative:dynamic(P.coolNeutral98,           P.coolNeutral22),
  },

  // Fill (subtle tinted surfaces)
  fill: {
    normal:      dynamic('rgba(112,115,124,0.08)', 'rgba(112,115,124,0.22)'),
    strong:      dynamic('rgba(112,115,124,0.16)', 'rgba(112,115,124,0.28)'),
    alternative: dynamic('rgba(112,115,124,0.05)', 'rgba(112,115,124,0.12)'),
  },

  // Interaction
  interaction: {
    inactive: dynamic(P.coolNeutral70, P.coolNeutral40),
    disable:  dynamic(P.coolNeutral98, P.coolNeutral22),
  },

  // Status
  status: {
    positive:   dynamic(P.green50,   P.green60),
    cautionary: dynamic(P.orange50,  P.orange60),
    negative:   dynamic(P.red50,     P.red60),
  },

  // Inverse (dark surface on light, light surface on dark)
  inverse: {
    background: dynamic(P.coolNeutral15, P.common100),
    label:      dynamic(P.neutral99,     P.neutral10),
    primary:    dynamic(P.blue60,        P.blue50),
  },

  // Static (never changes with dark mode)
  static: {
    white: '#FFFFFF' as const,
    black: '#000000' as const,
  },
} as const;

// ─── Glycemic Level Colors ────────────────────────────────────────────────────

export const GLYCEMIC_COLOR: Record<GlycemicLevel, ColorValue> = {
  low:      COLORS.status.positive,
  moderate: COLORS.status.cautionary,
  high:     dynamic(P.orange50, P.orange60),
  veryHigh: COLORS.status.negative,
};

// ─── Typography (Montage / Pretendard scale) ──────────────────────────────────

export const TYPOGRAPHY = {
  display1:  { fontSize: 56, lineHeight: 72, letterSpacing: 56  * -0.0319 },
  display2:  { fontSize: 40, lineHeight: 52, letterSpacing: 40  * -0.0282 },
  display3:  { fontSize: 36, lineHeight: 48, letterSpacing: 36  * -0.0270 },
  title1:    { fontSize: 32, lineHeight: 44, letterSpacing: 32  * -0.0253 },
  title2:    { fontSize: 28, lineHeight: 38, letterSpacing: 28  * -0.0236 },
  title3:    { fontSize: 24, lineHeight: 32, letterSpacing: 24  * -0.0230 },
  heading1:  { fontSize: 22, lineHeight: 30, letterSpacing: 22  * -0.0194 },
  heading2:  { fontSize: 20, lineHeight: 28, letterSpacing: 20  * -0.0120 },
  headline1: { fontSize: 18, lineHeight: 26, letterSpacing: 18  * -0.0020 },
  headline2: { fontSize: 17, lineHeight: 24, letterSpacing: 0   },
  body1:     { fontSize: 16, lineHeight: 24, letterSpacing: 16  *  0.0057 },
  body2:     { fontSize: 15, lineHeight: 22, letterSpacing: 15  *  0.0096 },
  label1:    { fontSize: 14, lineHeight: 20, letterSpacing: 14  *  0.0145 },
  label2:    { fontSize: 13, lineHeight: 18, letterSpacing: 13  *  0.0194 },
  caption1:  { fontSize: 12, lineHeight: 16, letterSpacing: 12  *  0.0252 },
  caption2:  { fontSize: 11, lineHeight: 14, letterSpacing: 11  *  0.0311 },
} as const;

// Convenience size aliases (backward compat)
export const FONT_SIZE = {
  xs:   TYPOGRAPHY.caption1.fontSize,   // 12
  sm:   TYPOGRAPHY.label2.fontSize,     // 13 (was 15, keeping close)
  md:   TYPOGRAPHY.body1.fontSize,      // 16
  lg:   TYPOGRAPHY.headline2.fontSize,  // 17
  xl:   TYPOGRAPHY.heading1.fontSize,   // 22
  xxl:  TYPOGRAPHY.title2.fontSize,     // 28
  hero: TYPOGRAPHY.display2.fontSize,   // 40
} as const;

export const FONT_WEIGHT = {
  regular:  '400' as const,
  medium:   '500' as const,
  semiBold: '600' as const,
  bold:     '700' as const,
} as const;

// Baskin Robbins 체 (배스킨라빈스체) — playful Korean display font
// Web: loaded via @font-face in app/_layout.tsx
export const FONT_FAMILY = {
  brand:        'BRBA_B',  // Bold display
  brandRegular: 'BRRA_R',  // Regular weight
} as const;

// ─── Spacing (Montage 4pt grid, pt01–pt80) ───────────────────────────────────

export const SPACING = {
  // Montage canonical names
  pt01: 1,  pt02: 2,  pt04: 4,  pt08: 8,  pt12: 12,
  pt16: 16, pt20: 20, pt24: 24, pt28: 28, pt32: 32,
  pt36: 36, pt40: 40, pt48: 48, pt56: 56, pt64: 64,
  pt72: 72, pt80: 80,
  // convenience aliases
  xs:     4,
  sm:     8,
  md:     12,
  lg:     16,
  inset:  20,
  xl:     24,
  xxl:    32,
  xxxl:   48,
  section:56,
  screen: 64,
} as const;

// ─── Corner Radius (Montage Button spec + card tokens) ────────────────────────

export const RADIUS = {
  // Montage Button radii
  small:      8,
  medium:     10,
  large:      12,
  extraLarge: 16,
  pill:       99,
  full:       9999,
  // backward-compat aliases
  xs: 4,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
} as const;

export const SQUIRCLE = IOS ? { borderCurve: 'continuous' as const } : {};

// ─── Shadow (Montage elevation levels) ───────────────────────────────────────

export const SHADOW = {
  xsmall: {
    shadowColor: '#171719',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  small: {
    shadowColor: '#171719',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  medium: {
    shadowColor: '#171719',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  large: {
    shadowColor: '#171719',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 10,
  },
  // backward-compat aliases
  get level1() { return this.xsmall; },
  get level2() { return this.small; },
  get level3() { return this.medium; },
  get sm() { return this.xsmall; },
  get md() { return this.small; },
  get lg() { return this.medium; },
} as const;
