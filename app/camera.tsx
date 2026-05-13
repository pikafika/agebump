import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MontageButton } from '../src/components/montage/MontageButton';
import { COLORS, FONT_WEIGHT, RADIUS, SPACING, SQUIRCLE, TYPOGRAPHY } from '../src/constants/theme';
import { setPendingImageUri } from '../src/store/pendingImageStore';
import { resizeImage, validateImageSize } from '../src/utils/imageUtils';

type InputMode = '촬영' | '성분표' | '직접입력';
const MODES: InputMode[] = ['촬영', '성분표', '직접입력'];
const MODE_ICONS: Record<InputMode, string> = { 촬영: '📷', 성분표: '🏷️', 직접입력: '✏️' };

function handleBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/(tabs)');
}

export function CameraScreen() {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const [mode, setMode]           = useState<InputMode>('촬영');
  const [foodText, setFoodText]   = useState('');
  const [isLoading, setLoading]   = useState(false);
  const cameraRef = useRef<CameraView>(null);

  async function navigateToAnalysis(uri: string): Promise<void> {
    const isValid = await validateImageSize(uri);
    if (!isValid) {
      Alert.alert('파일 크기 초과', '5MB 이하의 이미지만 사용할 수 있습니다.');
      return;
    }
    const resizedUri = await resizeImage(uri);
    if (Platform.OS === 'web') {
      setPendingImageUri(resizedUri);
      router.replace('/analysis');
    } else {
      router.replace(`/analysis?imageUri=${encodeURIComponent(resizedUri)}`);
    }
  }

  // ── 권한 화면 ────────────────────────────────────────────────────────────────
  if (Platform.OS !== 'web' && !permission?.granted) {
    const canAsk = !permission || permission.canAskAgain;
    return (
      <View style={styles.container}>
        {/* 닫기 — 터치 영역이 노치 아래에 오도록 insets.top 적용 */}
        <TouchableOpacity
          style={[styles.closeBtn, { top: insets.top + SPACING.pt12, left: SPACING.pt16 }]}
          onPress={handleBack}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="close" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={styles.permissionWrap}>
          <View style={styles.permissionIconCircle}>
            <Text style={{ fontSize: 40 }}>📷</Text>
          </View>
          <Text style={styles.permissionTitle}>카메라 권한이 필요해요</Text>
          <Text style={styles.permissionBody}>
            음식을 촬영해서 혈당 영향을 분석하려면{'\n'}카메라 접근 권한이 필요합니다.
            {!canAsk && '\n설정 앱에서 카메라 접근을 허용해주세요.'}
          </Text>
          <MontageButton
            label={canAsk ? '권한 허용하기' : '설정에서 허용하기'}
            onPress={canAsk ? requestPermission : () => void Linking.openSettings()}
            size="large"
            fullWidth
          />
        </View>
      </View>
    );
  }

  // ── 이벤트 핸들러 ─────────────────────────────────────────────────────────────
  async function handleCapture() {
    if (isLoading) return;
    if (Platform.OS === 'web') {
      setLoading(true);
      try {
        const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.9 });
        if (result.canceled || !result.assets[0]) return;
        await navigateToAnalysis(result.assets[0].uri);
      } catch (err) {
        Alert.alert('오류', err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
      return;
    }
    setLoading(true);
    try {
      const photo = await cameraRef.current?.takePictureAsync({ quality: 0.9 });
      if (!photo) throw new Error('촬영에 실패했습니다.');
      await navigateToAnalysis(photo.uri);
    } catch (err) {
      Alert.alert('오류', err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGallery() {
    if (isLoading) return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 1,
    });
    if (result.canceled || !result.assets[0]) return;
    setLoading(true);
    try {
      await navigateToAnalysis(result.assets[0].uri);
    } catch (err) {
      Alert.alert('오류', err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  function handleTextAnalyze() {
    if (!foodText.trim()) {
      Alert.alert('입력 필요', '음식 이름을 입력해주세요.');
      return;
    }
    router.push(`/analysis?foodName=${encodeURIComponent(foodText.trim())}`);
  }

  // ── 렌더 ─────────────────────────────────────────────────────────────────────
  const bottomPad = Math.max(insets.bottom, SPACING.pt16);

  return (
    <View style={styles.container}>
      {/* 카메라 / 텍스트 배경 — 전체 화면 */}
      {mode !== '직접입력' && Platform.OS !== 'web' ? (
        <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing="back" />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.textBg]} />
      )}

      {/* ── Top Bar — insets.top으로 노치/다이나믹 아일랜드 아래에 배치 ── */}
      <View style={[styles.topBar, { paddingTop: insets.top + SPACING.pt08 }]}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={handleBack}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="close" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.topTitle}>음식 분석</Text>

        <TouchableOpacity
          style={[styles.galleryBtn, isLoading && { opacity: 0.5 }]}
          onPress={handleGallery}
          disabled={isLoading}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="images-outline" size={15} color="#fff" />
          <Text style={styles.galleryBtnText}>갤러리</Text>
        </TouchableOpacity>
      </View>

      {/* ── 중앙 영역 ── */}
      <View style={styles.middle}>
        {mode === '직접입력' ? (
          <View style={styles.textInputArea}>
            <Text style={styles.textLabel}>음식 이름을 입력하세요</Text>
            <TextInput
              style={styles.textInput}
              value={foodText}
              onChangeText={setFoodText}
              placeholder="예: 비빔밥, 된장찌개"
              placeholderTextColor="rgba(255,255,255,0.35)"
              returnKeyType="done"
              onSubmitEditing={handleTextAnalyze}
              autoFocus
            />
          </View>
        ) : (
          /* 뷰파인더 코너 가이드 */
          <View style={styles.viewfinderGuide}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
          </View>
        )}
      </View>

      {/* ── Bottom Controls ── */}
      <View style={[styles.bottomControls, { paddingBottom: bottomPad + SPACING.pt16 }]}>
        {/* 모드 탭 */}
        <View style={styles.modeTabs}>
          {MODES.map((m) => (
            <TouchableOpacity
              key={m}
              style={[styles.modeTab, mode === m && styles.modeTabActive]}
              onPress={() => setMode(m)}
            >
              <Text style={styles.modeTabIcon}>{MODE_ICONS[m]}</Text>
              <Text style={[styles.modeTabText, mode === m && styles.modeTabTextActive]}>{m}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 촬영 버튼 / 분석 버튼 */}
        {mode !== '직접입력' ? (
          <View style={styles.captureRow}>
            <View style={styles.captureSlot} />
            <Pressable
              style={[styles.captureBtn, isLoading && { opacity: 0.5 }]}
              onPress={handleCapture}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.primary.normal as string} size="large" />
              ) : (
                <View style={styles.captureInner} />
              )}
            </Pressable>
            <View style={styles.captureSlot} />
          </View>
        ) : (
          <View style={styles.analyzeRow}>
            <MontageButton label="분석하기" onPress={handleTextAnalyze} size="large" fullWidth />
          </View>
        )}
      </View>
    </View>
  );
}

const CORNER_SIZE = 24;
const CORNER_THICK = 3;
const CORNER_COLOR = 'rgba(255,255,255,0.85)';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  textBg: { backgroundColor: '#111' },

  /* ── 권한 화면 ── */
  closeBtn: {
    position: 'absolute',
    width: 40, height: 40,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  permissionWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.pt32,
    gap: SPACING.pt16,
  },
  permissionIconCircle: {
    width: 96, height: 96,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.pt08,
  },
  permissionTitle: {
    ...TYPOGRAPHY.heading2,
    color: '#fff',
    fontWeight: FONT_WEIGHT.bold,
    textAlign: 'center',
  },
  permissionBody: {
    ...TYPOGRAPHY.body2,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.pt08,
  },

  /* ── Top Bar ── */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.pt16,
    paddingBottom: SPACING.pt12,
    zIndex: 10,
  },
  iconBtn: {
    width: 40, height: 40,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    ...TYPOGRAPHY.heading2,
    color: '#fff',
    fontWeight: FONT_WEIGHT.semiBold,
  },
  galleryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: SPACING.pt08,
    paddingHorizontal: SPACING.pt12,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  galleryBtnText: {
    ...TYPOGRAPHY.label2,
    color: '#fff',
    fontWeight: FONT_WEIGHT.medium,
  },

  /* ── 중앙 영역 ── */
  middle: { flex: 1 },

  textInputArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.pt24,
    gap: SPACING.pt12,
  },
  textLabel: {
    ...TYPOGRAPHY.body1,
    color: 'rgba(255,255,255,0.75)',
    fontWeight: FONT_WEIGHT.medium,
  },
  textInput: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    borderRadius: RADIUS.large,
    paddingHorizontal: SPACING.pt16,
    paddingVertical: SPACING.pt16,
    ...TYPOGRAPHY.body1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    ...SQUIRCLE,
  },

  viewfinderGuide: {
    flex: 1,
    margin: SPACING.pt32,
  },
  cornerTL: {
    position: 'absolute', top: 0, left: 0,
    width: CORNER_SIZE, height: CORNER_SIZE,
    borderTopWidth: CORNER_THICK, borderLeftWidth: CORNER_THICK,
    borderColor: CORNER_COLOR, borderTopLeftRadius: 4,
  },
  cornerTR: {
    position: 'absolute', top: 0, right: 0,
    width: CORNER_SIZE, height: CORNER_SIZE,
    borderTopWidth: CORNER_THICK, borderRightWidth: CORNER_THICK,
    borderColor: CORNER_COLOR, borderTopRightRadius: 4,
  },
  cornerBL: {
    position: 'absolute', bottom: 0, left: 0,
    width: CORNER_SIZE, height: CORNER_SIZE,
    borderBottomWidth: CORNER_THICK, borderLeftWidth: CORNER_THICK,
    borderColor: CORNER_COLOR, borderBottomLeftRadius: 4,
  },
  cornerBR: {
    position: 'absolute', bottom: 0, right: 0,
    width: CORNER_SIZE, height: CORNER_SIZE,
    borderBottomWidth: CORNER_THICK, borderRightWidth: CORNER_THICK,
    borderColor: CORNER_COLOR, borderBottomRightRadius: 4,
  },

  /* ── 하단 컨트롤 ── */
  bottomControls: {
    paddingTop: SPACING.pt16,
    paddingHorizontal: SPACING.pt20,
    gap: SPACING.pt20,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  modeTabs: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: RADIUS.large,
    padding: 4,
    gap: 4,
    ...SQUIRCLE,
  },
  modeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: SPACING.pt08,
    borderRadius: RADIUS.medium,
  },
  modeTabActive: { backgroundColor: COLORS.primary.normal },
  modeTabIcon: { fontSize: 13 },
  modeTabText: {
    ...TYPOGRAPHY.label2,
    color: 'rgba(255,255,255,0.55)',
    fontWeight: FONT_WEIGHT.medium,
  },
  modeTabTextActive: {
    color: '#fff',
    fontWeight: FONT_WEIGHT.semiBold,
  },

  captureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.pt08,
  },
  captureSlot: { width: 48 },
  captureBtn: {
    width: 76, height: 76,
    borderRadius: RADIUS.pill,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  captureInner: {
    width: 60, height: 60,
    borderRadius: RADIUS.pill,
    backgroundColor: '#fff',
  },

  analyzeRow: { paddingVertical: SPACING.pt08 },
});

export default CameraScreen;
