/* @flow */

import MultiRef from '.';

test('works', () => {
  const mr = new MultiRef<number,string>();

  const originalRef1 = mr.ref(1);
  const originalRef2 = mr.ref(2);

  expect(originalRef2).not.toBe(originalRef1);

  // These will be new functions not matching the above, because
  // the value isn't cached until it's used. This is important because
  // if a React render is aborted (likely when features of concurrent
  // rendering are used), then the function returned by `ref` may not
  // get called, which means we won't get a chance to un-remember the
  // returned function. We only remember a returned function when it's
  // called (with a non-null value), because that's the only point we're
  // guaranteed the returned function will get a chance to unremember
  // itself later.
  const ref1 = mr.ref(1);
  const ref2 = mr.ref(2);

  expect(ref2).not.toBe(ref1);

  expect(ref1).not.toBe(originalRef1);
  expect(ref2).not.toBe(originalRef2);

  ref1('123');
  ref2('456');

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

  ref1b('temporary');

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
