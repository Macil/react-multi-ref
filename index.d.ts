export default class MultiRef<K,V> {
  readonly map: ReadonlyMap<K,V>;
  ref(key: K): (value: V|null) => any;
}
