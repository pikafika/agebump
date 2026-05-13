import * as LegacyFS from 'expo-file-system/legacy';
import * as ImageManipulator from 'expo-image-manipulator';
import { Platform } from 'react-native';

const MAX_DIMENSION = 1024;
const JPEG_QUALITY = 0.8;
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export async function resizeImage(uri: string): Promise<string> {
  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: MAX_DIMENSION, height: MAX_DIMENSION } }],
      { compress: JPEG_QUALITY, format: ImageManipulator.SaveFormat.JPEG },
    );
    return result.uri;
  } catch (err) {
    throw new Error(
      `이미지 리사이즈에 실패했습니다: ${err instanceof Error ? err.message : '알 수 없는 오류'}`,
    );
  }
}

async function imageToBase64Web(uri: string): Promise<string> {
  if (uri.startsWith('data:')) {
    const base64 = uri.split(',')[1];
    if (!base64 || base64.length < 100) {
      throw new Error('base64 변환 결과가 비어 있거나 너무 짧습니다.');
    }
    return base64;
  }
  const response = await fetch(uri);
  const blob = await response.blob();
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = (reader.result as string).split(',')[1];
      if (!base64 || base64.length < 100) {
        reject(new Error('base64 변환 결과가 비어 있거나 너무 짧습니다.'));
        return;
      }
      resolve(base64);
    };
    reader.onerror = () => reject(new Error('이미지를 base64로 변환하는 데 실패했습니다.'));
    reader.readAsDataURL(blob);
  });
}

export async function imageToBase64(uri: string): Promise<string> {
  try {
    if (Platform.OS === 'web') return await imageToBase64Web(uri);
    const base64 = await LegacyFS.readAsStringAsync(uri, {
      encoding: LegacyFS.EncodingType.Base64,
    });
    const cleaned = base64.replace(/^data:image\/[a-z]+;base64,/, '');
    if (!cleaned || cleaned.length < 100) {
      throw new Error(`base64 변환 결과가 비어 있거나 너무 짧습니다 (length=${cleaned.length}).`);
    }
    return cleaned;
  } catch (err) {
    throw new Error(
      `이미지를 base64로 변환하는 데 실패했습니다: ${err instanceof Error ? err.message : '알 수 없는 오류'}`,
    );
  }
}

export async function validateImageSize(uri: string): Promise<boolean> {
  try {
    if (Platform.OS === 'web') {
      if (uri.startsWith('data:')) {
        const base64 = uri.split(',')[1] ?? '';
        return Math.ceil(base64.length * 0.75) <= MAX_FILE_SIZE_BYTES;
      }
      const response = await fetch(uri);
      const blob = await response.blob();
      return blob.size <= MAX_FILE_SIZE_BYTES;
    }
    const info = await LegacyFS.getInfoAsync(uri);
    if (!info.exists) throw new Error('이미지 파일이 존재하지 않습니다.');
    return info.size !== undefined ? info.size <= MAX_FILE_SIZE_BYTES : true;
  } catch (err) {
    if (err instanceof Error && err.message === '이미지 파일이 존재하지 않습니다.') throw err;
    throw new Error(
      `이미지 크기 확인에 실패했습니다: ${err instanceof Error ? err.message : '알 수 없는 오류'}`,
    );
  }
}
