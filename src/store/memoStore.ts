import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const MEMO_KEY_PREFIX = 'memo-';

/**
 * SecureStore 키는 영숫자/대시/언더스코어만 허용된다.
 * FoodRecord.id는 timestamp 문자열(예: '1715559123456')이라 충돌 위험은 없지만,
 * 만일을 대비해 안전 문자만 남긴다.
 */
function safeKey(recordId: string): string {
  return `${MEMO_KEY_PREFIX}${recordId.replace(/[^A-Za-z0-9._-]/g, '_')}`;
}

/**
 * 메모는 OS Keychain(iOS) / Keystore(Android)에 암호화 저장한다.
 * Web 환경에서는 SecureStore를 사용할 수 없으므로 안전하게 no-op.
 */
const isSupportedPlatform = Platform.OS === 'ios' || Platform.OS === 'android';

export async function getMemo(recordId: string): Promise<string> {
  if (!isSupportedPlatform) return '';
  try {
    const value = await SecureStore.getItemAsync(safeKey(recordId));
    return value ?? '';
  } catch {
    return '';
  }
}

export async function setMemo(recordId: string, text: string): Promise<void> {
  if (!isSupportedPlatform) return;
  try {
    const trimmed = text.trim();
    if (trimmed.length === 0) {
      await SecureStore.deleteItemAsync(safeKey(recordId));
      return;
    }
    await SecureStore.setItemAsync(safeKey(recordId), trimmed);
  } catch (err) {
    console.warn('[memoStore] setMemo failed:', err);
  }
}

export async function deleteMemo(recordId: string): Promise<void> {
  if (!isSupportedPlatform) return;
  try {
    await SecureStore.deleteItemAsync(safeKey(recordId));
  } catch {
    // ignore
  }
}
