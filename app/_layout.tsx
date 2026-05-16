import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from '../src/constants/theme';
import { analyticsService } from '../src/services/analyticsService';
import { useAuthStore } from '../src/store/authStore';
import {
  migrateLegacyUtcKeys,
  migrateLocalToFirestore,
  migrateMemosToSecureStore,
  restoreLocalFromFirestore,
} from '../src/store/migrations';
import { useSyncStore } from '../src/store/syncStore';
import { ONBOARDING_KEY } from './onboarding';

// Web font injection — Baskin Robbins (배스킨라빈스체) via noonnu CDN
const BR_FONT_CSS = `
  @font-face {
    font-family: 'BRRA_R';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.2/BRRA_R.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'BRBA_B';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.2/BRBA_B.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
`;

function injectWebFontOnce(): void {
  if (Platform.OS !== 'web') return;
  if (typeof document === 'undefined') return;
  const ID = 'br-font-faces';
  if (document.getElementById(ID)) return;
  const styleEl = document.createElement('style');
  styleEl.id = ID;
  styleEl.textContent = BR_FONT_CSS;
  document.head.appendChild(styleEl);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const { user, isInitialized } = useAuthStore();
  // 네이티브: TTF 임베드 로딩. 웹: 아래 @font-face 주입과 병행 (둘 다 동일 family name)
  const [fontsLoaded, fontError] = useFonts({
    BRBA_B: require('../assets/fonts/BRBA_B.otf'),
    BRRA_R: require('../assets/fonts/BRRA_R.otf'),
  });

  useEffect(() => {
    injectWebFontOnce();

    // Firebase 익명 인증 초기화 (부팅과 병렬)
    const unsubscribeAuth = useAuthStore.getState().initialize();

    // 1회성 로컬 데이터 마이그레이션 (부팅 차단하지 않음)
    // 1) UTC→로컬 키 재그룹핑 → 2) 메모 평문 제거 + secure-store 이전 (순서 중요)
    void (async () => {
      await migrateLegacyUtcKeys();
      await migrateMemosToSecureStore();
    })();

    AsyncStorage.getItem(ONBOARDING_KEY)
      .then((value: string | null) => {
        setNeedsOnboarding(!value);
      })
      .catch(() => {
        setNeedsOnboarding(false);
      })
      .finally(() => {
        setIsReady(true);
      });

    return unsubscribeAuth;
  }, []);

  // 인증 완료 후 세션 추적 + Firestore 마이그레이션 + 원격 복원
  useEffect(() => {
    if (!isInitialized || !user) return;
    analyticsService.trackSessionStart(user.uid);
    const { hasMigrated } = useSyncStore.getState();
    if (!hasMigrated) {
      void migrateLocalToFirestore(user.uid);
    }
    // 구글 계정이 연동된 경우에만 Firestore → 로컬 복원 (익명 계정은 기기 간 공유 불가)
    const isGoogleLinked = user.providerData.some((p) => p.providerId === 'google.com');
    if (isGoogleLinked) {
      void restoreLocalFromFirestore(user.uid);
    }
  }, [isInitialized, user]);

  useEffect(() => {
    if (fontError) console.warn('[fonts] BR load error:', fontError);
    else if (fontsLoaded) console.log('[fonts] BRBA_B, BRRA_R loaded');
  }, [fontsLoaded, fontError]);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        {!isReady || (!fontsLoaded && !fontError) ? (
          <View style={{ flex: 1, backgroundColor: COLORS.background.normalAlternative as string }} />
        ) : (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="onboarding" options={{ gestureEnabled: false }} />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="camera" options={{ presentation: 'fullScreenModal' }} />
            <Stack.Screen name="analysis" />
            <Stack.Screen name="guide" />
            {needsOnboarding && <Redirect href="/onboarding" />}
          </Stack>
        )}
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default RootLayout;
