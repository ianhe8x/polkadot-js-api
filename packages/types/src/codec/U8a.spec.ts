// Copyright 2017-2018 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { CodecTo } from '../types';
import U8a from './U8a';

describe('U8a', () => {
  describe('decoding', () => {
    const testDecode = (type: string, input: any, expected: string) =>
      it(`can decode from ${type}`, () => {
        const e = new U8a(input);
        expect(e.toString()).toBe(expected);
      });

    testDecode('Array', [1, 2, 3, 4, 5], '0x0102030405');
    testDecode('hex', '0x0102030405', '0x0102030405');
    testDecode('U8a', new U8a([1, 2, 3, 4, 5]), '0x0102030405');
    testDecode('Uint8Array', Uint8Array.from([1, 2, 3, 4, 5]), '0x0102030405');
  });

  describe('encoding', () => {
    const testEncode = (to: CodecTo, expected: string | Uint8Array) =>
      it(`can encode ${to}`, () => {
        const e = new U8a([1, 2, 3, 4, 5]);
        expect(e[to]()).toEqual(expected);
      });

    testEncode('toJSON', '0x0102030405');
    testEncode('toHex', '0x0102030405');
    testEncode('toString', '0x0102030405');
    testEncode('toU8a', Uint8Array.from([1, 2, 3, 4, 5]));
  });

  it('contains the length of the elements', () => {
    expect(new U8a([1, 2, 3, 4, 5]).length).toEqual(5);
  });

  it('returns the correct encoded length', () => {
    expect(new U8a([1, 2, 3, 4, 5]).encodedLength).toEqual(5);
  });
});
