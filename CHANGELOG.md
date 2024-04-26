## 1.0.2 (2024-04-26)

- Uses [React 19's support for ref cleanup functions](https://react.dev/blog/2024/04/25/react-19#cleanup-functions-for-refs) when available. This will ensure compatibility with future React versions that don't call the ref callback with null when unmounting an element.

## 1.0.1 (2022-09-11)

- Fixes a minor issue where `MultiRef.ref()` cached return values would never become uncached if a React render is aborted and then `MultiRef.ref()` was not used with the same key in a subsequent render.

## 1.0.0 (2018-11-01)

Initial release.
