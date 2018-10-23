// Copyright 2017-2018 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import UInt from './UInt';

describe('UInt', () => {
  describe('decoding', () => {
    const testDecode = (type: string, input: any, expected: number) =>
      it(`can decode from ${type}`, () => {
        const e = new UInt(input);
        expect(e.toNumber()).toBe(expected);
      });

    testDecode('BN', new UInt(1234567), 1234567);
    testDecode('hex', new UInt('0x12'), 18);
    testDecode('string', new UInt('1234567'), 1234567);
    testDecode('Uint8Array', new UInt(Uint8Array.from([135, 214, 18, 0, 0, 0, 0, 0])), 1234567);
  });

  it('has the correct encoded length', () => {
    expect(
      new UInt(4567).encodedLength
    ).toEqual(8);
  });

  it('provides a toNumber interface', () => {
    expect(
      new UInt(4567).toNumber()
    ).toEqual(4567);
  });

  it('converts to hex/string', () => {
    const u = new UInt('0x12', 16);

    expect(u.toHex()).toEqual('0x0012');
    expect(u.toString()).toEqual('18');
  });

  it('converts to JSON depending on flags', () => {
    expect(new UInt(0x12, 16).toJSON()).toEqual('0x0012');
    expect(new UInt(0x12, 16, false).toJSON()).toEqual(0x12);
  });

  it('converts to LE from the provided value', () => {
    expect(
      new UInt(1234567).toU8a()
    ).toEqual(new Uint8Array([135, 214, 18, 0, 0, 0, 0, 0]));
  });

  it('converts to LE from the provided value (bitLength)', () => {
    expect(
      new UInt(1234567, 32).toU8a()
    ).toEqual(new Uint8Array([135, 214, 18, 0]));
  });
});
