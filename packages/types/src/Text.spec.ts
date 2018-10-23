// Copyright 2017-2018 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { CodecTo } from './types';
import Text from './Text';

describe('Text', () => {

  describe('decoding', () => {
    const testDecode = (type: string, input: any, expected: string) =>
      it(`can decode from ${type}`, () => {
        expect(new Text(input).toString()).toBe(expected);
      });

    testDecode('null', null, 'null');
    testDecode('string', 'foo', 'foo');
    testDecode('Text', new Text('foo'), 'foo');
    testDecode('Uint8Array', Uint8Array.from([12, 102, 111, 111]), 'foo');
    testDecode('object with `toString()`', { toString () { return 'foo'; } }, 'foo');
  });

  describe('encoding', () => {
    const testEncode = (to: CodecTo, expected: string | Uint8Array) =>
      it(`can encode ${to}`, () => {
        expect(new Text('foo')[to]()).toEqual(expected);
      });

    testEncode('toHex', '0x0c666f6f');
    testEncode('toJSON', 'foo');
    testEncode('toString', 'foo');
    testEncode('toU8a', Uint8Array.from([12, 102, 111, 111]));
  });

  it('has the correct encoded length', () => {
    expect(new Text('foo').encodedLength).toBe(4);
  });
});
