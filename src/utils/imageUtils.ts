import { File } from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

const MAX_DIMENSION = 1024;
const JPEG_QUALITY = 0.8;
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

/**
 * 이미지를 최대 1024×1024 크기로 리사이즈하고 JPEG로 저장한다.
 * @returns 리사이즈된 이미지의 로컬 URI
 */
export async function resizeImage(uri: string): Promise<string> {
  try {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: MAX_DIMENSION, height: MAX_DIMENSION } }],
      {
        compress: JPEG_QUALITY,
        format: ImageManipulator.SaveFormat.JPEG,
      },
    );
    return result.uri;
  } catch (err) {
    throw new Error(
      `이미지 리사이즈에 실패했습니다: ${err instanceof Error ? err.message : '알 수 없는 오류'}`,
    );
  }
}

/**
 * 로컬 URI의 이미지를 순수 base64 문자열로 변환한다.
 * "data:image/jpeg;base64," 접두사는 포함하지 않는다.
 */
export async function imageToBase64(uri: string): Promise<string> {
  try {
    const file = new File(uri);
    const base64 = await file.base64();
    const prefixPattern = /^data:image\/[a-z]+;base64,/;
    return base64.replace(prefixPattern, '');
  } catch (err) {
    throw new Error(
      `이미지를 base64로 변환하는 데 실패했습니다: ${err instanceof Error ? err.message : '알 수 없는 오류'}`,
    );
  }
}

/**
 * 이미지 파일 크기가 5MB 이하인지 확인한다.
 * @returns 5MB 이하면 true, 초과하면 false
 */
export async function validateImageSize(uri: string): Promise<boolean> {
  try {
    const file = new File(uri);
    if (!file.exists) {
      throw new Error('이미지 파일이 존재하지 않습니다.');
    }
    return file.size <= MAX_FILE_SIZE_BYTES;
  } catch (err) {
    if (err instanceof Error && err.message === '이미지 파일이 존재하지 않습니다.') {
      throw err;
    }
    throw new Error(
      `이미지 크기 확인에 실패했습니다: ${err instanceof Error ? err.message : '알 수 없는 오류'}`,
    );
  }
}
