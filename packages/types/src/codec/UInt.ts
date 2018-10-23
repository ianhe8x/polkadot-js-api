// Copyright 2017-2018 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { AnyNumber, Codec } from '../types';

import BN from 'bn.js';
import { bnToBn, bnToHex, bnToU8a, hexToBn, isHex, isString, isU8a, u8aToBn } from '@polkadot/util';

export type UIntBitLength = 8 | 16 | 32 | 64 | 128 | 256;

export const DEFAULT_UINT_BITS = 64;

// A generic number codec. For Substrate all numbers are LE encoded, this handles the encoding
// and decoding of those numbers. Upon construction the bitLength is provided and any additional
// use keeps the number to this length.
//
// TODO:
//   - Apart from encoding/decoding we don't actuall keep check on the sizes, is this good enough?
export default class UInt extends BN implements Codec {
  protected _bitLength: UIntBitLength;
  private _isHexJson: boolean;

  constructor (value: AnyNumber = 0, bitLength: UIntBitLength = DEFAULT_UINT_BITS, isHexJson: boolean = true) {
    super(
      UInt.decodeUInt(value, bitLength).toNumber()
    );

    this._bitLength = bitLength;
    this._isHexJson = isHexJson;
  }

  private static decodeUInt (value: AnyNumber, bitLength: UIntBitLength): BN {
    if (value instanceof BN) {
      return value;
    } else if (isHex(value)) {
      return hexToBn(value as string);
    } else if (isU8a(value)) {
      return u8aToBn(value.subarray(0, bitLength / 8), true);
    } else if (isString(value)) {
      return new BN(value, 10);
    }

    return bnToBn(value);
  }

  get encodedLength (): number {
    return this._bitLength / 8;
  }

  toHex (): string {
    return bnToHex(this as BN, this._bitLength);
  }

  toJSON (): any {
    return this._isHexJson
      ? this.toHex()
      : this.toNumber();
  }

  toU8a (isBare?: boolean): Uint8Array {
    return bnToU8a(this as BN, this._bitLength, true);
  }

  // FIXME remove this
  toBn (): BN {
    return this;
  }

}
