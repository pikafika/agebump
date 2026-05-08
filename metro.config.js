const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Web 번들에서 zustand v5 등 ESM 빌드의 `import.meta.env` 사용으로 인한
// "Cannot use 'import.meta' outside a module" 에러를 회피한다.
// 패키지 exports 조건 해석을 비활성화하면 `main` 필드(CJS)로 fallback된다.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
