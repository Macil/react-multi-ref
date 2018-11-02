/* @flow */

type RefFn<V> = (value: V|null) => mixed;

export default class MultiRef<K,V> {
  map: Map<K,V> = new Map();

  _refFns: Map<K,RefFn<V>> = new Map();

  ref(key: K): RefFn<V> {
    let refFn: ?RefFn<V> = this._refFns.get(key);
    if (!refFn) {
      refFn = value => {
        if (value == null) {
          this._refFns.delete(key);
          this.map.delete(key);
        } else {
          this.map.set(key, value);
        }
      };
      this._refFns.set(key, refFn);
    }
    return refFn;
  }
}
