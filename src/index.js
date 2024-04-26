/* @flow */

type RefFn<V> = (value: V|null) => mixed;

export default class MultiRef<K,V> {
  map: Map<K,V> = new Map();

  #refFns: Map<K,RefFn<V>> = new Map();

  ref(key: K): RefFn<V> {
    const refFn = this.#refFns.get(key);
    if (refFn) {
      return refFn;
    } else {
      const refFn: RefFn<V> = value => {
        if (value == null) {
          // Support for React <=18, which cleans up ref functions by calling them
          // with null.
          this.#refFns.delete(key);
          this.map.delete(key);
        } else {
          this.#refFns.set(key, refFn);
          this.map.set(key, value);
          // React 19+ cleanup support
          return () => {
            this.#refFns.delete(key);
            this.map.delete(key);
          };
        }
      };
      // We don't put `refFn` into `this._refFns` yet, because if the current render
      // is aborted, then it's possible than `refFn(null)` won't be called later
      // and its cleanup will never happen. We shouldn't cause any side effects that
      // need cleaning up later until `refFn` gets called with a non-null value.
      return refFn;
    }
  }
}
