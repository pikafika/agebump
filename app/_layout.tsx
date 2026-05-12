import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Redirect, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from '../src/constants/theme';
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
  // 네이티브: TTF 임베드 로딩. 웹: 아래 @font-face 주입과 병행 (둘 다 동일 family name)
  const [fontsLoaded, fontError] = useFonts({
    BRBA_B: require('../assets/fonts/BRBA_B.otf'),
    BRRA_R: require('../assets/fonts/BRRA_R.otf'),
  });

  useEffect(() => {
    injectWebFontOnce();
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
  }, []);

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
