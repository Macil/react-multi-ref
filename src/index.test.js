/* @flow */

import MultiRef from '.';

test('works', () => {
  const mr = new MultiRef<number,string>();
  const ref1 = mr.ref(1);
  const ref2 = mr.ref(2);

  expect(ref2).not.toBe(ref1);

  expect(mr.ref(1)).toBe(ref1);
  expect(mr.ref(2)).toBe(ref2);

  mr.ref(1)('abc');
  mr.ref(2)('def');

  expect(mr.map.get(1)).toBe('abc');
  expect(mr.map.get(2)).toBe('def');

  expect(mr.ref(1)).toBe(ref1);
  expect(mr.ref(2)).toBe(ref2);

  mr.ref(1)('ABC');

  expect(mr.map.get(1)).toBe('ABC');
  expect(mr.map.get(2)).toBe('def');

  expect(mr.ref(1)).toBe(ref1);
  expect(mr.ref(2)).toBe(ref2);

  mr.ref(1)(null);

  expect(mr.map.has(1)).toBe(false);
  expect(mr.map.get(2)).toBe('def');

  const ref1b = mr.ref(1);
  expect(ref1b).not.toBe(ref1);

  expect(mr.ref(1)).toBe(ref1b);
  expect(mr.ref(2)).toBe(ref2);

  mr.ref(1)('a_b_c');

  expect(mr.map.get(1)).toBe('a_b_c');
  expect(mr.map.get(2)).toBe('def');

  mr.ref(2)('d_e_f');

  expect(mr.map.get(1)).toBe('a_b_c');
  expect(mr.map.get(2)).toBe('d_e_f');

  expect(mr.ref(1)).toBe(ref1b);
  expect(mr.ref(2)).toBe(ref2);
});
