let _uri: string | null = null;

export function setPendingImageUri(uri: string): void {
  _uri = uri;
}

export function getPendingImageUri(): string | null {
  return _uri;
}

export function clearPendingImageUri(): void {
  _uri = null;
}
