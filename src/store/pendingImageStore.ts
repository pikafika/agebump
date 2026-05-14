let _uri: string | null = null;
let _base64: string | null = null;

export function setPendingImageUri(uri: string): void { _uri = uri; }
export function getPendingImageUri(): string | null { return _uri; }
export function clearPendingImageUri(): void { _uri = null; }

export function setPendingBase64(base64: string): void { _base64 = base64; }
export function getPendingBase64(): string | null { return _base64; }
export function clearPendingBase64(): void { _base64 = null; }
