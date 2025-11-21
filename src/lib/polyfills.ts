// Polyfill localStorage for SSR
if (typeof window === "undefined") {
  // @ts-expect-error - We're creating a mock localStorage for SSR
  global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    length: 0,
    key: () => null,
  };
}

