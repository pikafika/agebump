const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Web 번들에서 zustand v5 등 ESM 빌드의 `import.meta.env` 사용으로 인한
// "Cannot use 'import.meta' outside a module" 에러를 회피한다.
// 패키지 exports 조건 해석을 비활성화하면 `main` 필드(CJS)로 fallback된다.
config.resolver.unstable_enablePackageExports = false;

// Expo/Metro dev 서버가 내부적으로 COOP: same-origin 을 설정해
// Firebase linkWithPopup 팝업에서 window.close() 호출이 차단된다.
// setHeader 를 인터셉트해 COOP·COEP 를 항상 unsafe-none 으로 고정한다.
config.server = {
  enhanceMiddleware: (metroMiddleware) => {
    return (req, res, next) => {
      const _setHeader = res.setHeader.bind(res);
      res.setHeader = (name, value) => {
        const key = typeof name === 'string' ? name.toLowerCase() : '';
        if (key === 'cross-origin-opener-policy' || key === 'cross-origin-embedder-policy') {
          return _setHeader(name, 'unsafe-none');
        }
        return _setHeader(name, value);
      };
      metroMiddleware(req, res, next);
    };
  },
};

module.exports = config;
