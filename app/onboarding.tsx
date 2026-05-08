import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONT_WEIGHT, GLYCEMIC_COLOR, RADIUS, SPACING, SQUIRCLE, TYPOGRAPHY } from '../src/constants/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const ONBOARDING_KEY = 'onboarding_complete';

interface Slide {
  id: string;
  emoji: string;
  bgColor: string | object;
  title: string;
  description: string;
  hasDisclaimer: boolean;
}

const SLIDES: Slide[] = [
  {
    id: '1',
    emoji: '📸',
    bgColor: COLORS.status.positive,
    title: '사진 한 장으로\n혈당 영향을 알아봐요',
    description: '먹기 전에 찍으면 AI가 혈당 스파이크 위험을 알려드려요',
    hasDisclaimer: false,
  },
  {
    id: '2',
    emoji: '🤖',
    bgColor: COLORS.status.cautionary,
    title: 'AI가 다음 식사를\n코칭해줘요',
    description: '오늘 먹은 것을 분석해서 저속노화 식단을 제안해요',
    hasDisclaimer: false,
  },
  {
    id: '3',
    emoji: '🌿',
    bgColor: GLYCEMIC_COLOR.low,
    title: '저속노화, 오늘부터\n시작해요',
    description: '',
    hasDisclaimer: true,
  },
];

interface SlideItemProps {
  slide: Slide;
  isLast: boolean;
  onNext: () => void;
  onFinish: () => void;
}

function SlideItem({ slide, isLast, onNext, onFinish }: SlideItemProps) {
  return (
    <View style={styles.slide}>
      <View style={[styles.illustration, { backgroundColor: slide.bgColor as string }]}>
        <Text style={styles.illustrationEmoji}>{slide.emoji}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{slide.title}</Text>

        {slide.description ? (
          <Text style={styles.description}>{slide.description}</Text>
        ) : null}

        {slide.hasDisclaimer && (
          <View style={styles.disclaimerBox}>
            <Text style={styles.disclaimerText}>
              {'⚠️ 이 앱은 의료기기가 아닙니다. 제공되는 정보는 AI 추정값으로 참고용이며, 의료적 진단·치료를 대체하지 않습니다. 건강 관련 결정은 반드시 전문 의료인과 상담하세요.'}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, isLast && styles.buttonPrimary]}
          onPress={isLast ? onFinish : onNext}
          activeOpacity={0.85}
        >
          <Text style={[styles.buttonText, isLast && styles.buttonTextPrimary]}>
            {isLast ? '동의하고 시작하기' : '다음 →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(null);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const first = viewableItems[0];
      if (first?.index != null) setCurrentIndex(first.index);
    },
    [],
  );

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 60 }).current;

  function handleNext() {
    const next = currentIndex + 1;
    flatListRef.current?.scrollToIndex({ index: next, animated: true });
  }

  async function handleFinish() {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    router.replace('/(tabs)');
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList<Slide>
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <SlideItem
            slide={item}
            isLast={index === SLIDES.length - 1}
            onNext={handleNext}
            onFinish={handleFinish}
          />
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset: SCREEN_WIDTH * index,
          index,
        })}
      />

      <View style={styles.dots}>
        {SLIDES.map((slide, i) => (
          <View
            key={slide.id}
            style={[styles.dot, i === currentIndex && styles.dotActive]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background.normalAlternative },

  slide: { width: SCREEN_WIDTH, flex: 1 },

  illustration: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationEmoji: { fontSize: 96 },

  content: {
    flex: 0.55,
    padding: SPACING.pt24,
    gap: SPACING.pt16,
    justifyContent: 'center',
  },
  title: {
    ...TYPOGRAPHY.title3,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.label.normal,
    lineHeight: 36,
  },
  description: {
    ...TYPOGRAPHY.body2,
    color: COLORS.label.alternative,
    lineHeight: 24,
  },

  disclaimerBox: {
    backgroundColor: 'rgba(255,146,0,0.08)',
    borderRadius: RADIUS.large,
    padding: SPACING.pt12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.status.cautionary,
    ...SQUIRCLE,
  },
  disclaimerText: {
    ...TYPOGRAPHY.label2,
    color: COLORS.label.normal,
    lineHeight: 20,
  },

  button: {
    backgroundColor: COLORS.fill.normal,
    borderRadius: RADIUS.large,
    padding: SPACING.pt16,
    alignItems: 'center',
    marginTop: SPACING.pt08,
    ...SQUIRCLE,
  },
  buttonPrimary: { backgroundColor: COLORS.primary.normal },
  buttonText: {
    ...TYPOGRAPHY.body2,
    fontWeight: FONT_WEIGHT.bold,
    color: COLORS.label.normal,
  },
  buttonTextPrimary: { color: '#FFFFFF' },

  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: SPACING.pt24,
    gap: SPACING.pt08,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.line.solidNormal,
  },
  dotActive: {
    width: 24,
    backgroundColor: COLORS.primary.normal,
  },
});

export default OnboardingScreen;
