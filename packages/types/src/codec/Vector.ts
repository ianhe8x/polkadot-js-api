// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { u8aConcat, u8aToU8a, u8aToHex } from '@polkadot/util';

import Compact from './Compact';
import { Codec, Constructor } from '../types';
import { compareArray, decodeU8a } from './utils';

/**
 * @name Vector
 * @description
 * This manages codec arrays. Internally it keeps track of the length (as decoded) and allows
 * construction with the passed `Type` in the constructor. It is an extension to Array, providing
 * specific encoding/decoding on top of the base type.
 * @noInheritDoc
 */
export default class Vector<
  T extends Codec
  > extends Array<T> implements Codec {
  private _Type: Constructor<T>;

  constructor (Type: Constructor<T>, value: Vector<any> | Uint8Array | string | Array<any> = [] as Array<any>) {
    super(
      ...Vector.decodeVector(Type, value)
    );

    this._Type = Type;
  }

  static decodeVector<T extends Codec> (Type: Constructor<T>, value: Vector<any> | Uint8Array | string | Array<any>): Array<T> {
    if (Array.isArray(value)) {
      return value.map((entry) =>
        entry instanceof Type
          ? entry
          : new Type(entry)
      );
    }

    const u8a = u8aToU8a(value);
    const [offset, _length] = Compact.decodeU8a(u8a);
    const length = _length.toNumber();

    return decodeU8a(u8a.subarray(offset), new Array(length).fill(Type)) as T[];
  }

  static with<O extends Codec> (Type: Constructor<O>): Constructor<Vector<O>> {
    return class extends Vector<O> {
      constructor (value?: Array<any>) {
        super(Type, value);
      }
    };
  }

  get Type (): string {
    return this._Type.name;
  }

  /**
   * @description The length of the value when encoded as a Uint8Array
   */
  get encodedLength (): number {
    return this.reduce((total, raw) => {
      return total + raw.encodedLength;
    }, Compact.encodeU8a(this.length).length);
  }

  /**
   * @description The length of the value
   */
  get length (): number {
    // only included here since we ignore inherited docs
    return super.length;
  }

  /**
   * @description Compares the value of the input to see if there is a match
   */
  eq (other?: any): boolean {
    return compareArray(this, other);
  }

  /**
   * @description Converts the Object to an standard JavaScript Array
   */
  toArray (): Array<T> {
    return Array.from(this);
  }

  /**
   * @description Returns a hex string representation of the value
   */
  toHex (): string {
    return u8aToHex(this.toU8a());
  }

  /**
   * @description Converts the Object to JSON, typically used for RPC transfers
   */
  toJSON (): any {
    return this.map((entry) =>
      entry.toJSON()
    );
  }

  /**
   * @description Returns the string representation of the value
   */
  toString (): string {
    // Overwrite the default toString representation of Array.
    const data = this.map((entry) =>
      entry.toString()
    );

    return `[${data.join(', ')}]`;
  }

  /**
   * @description Encodes the value as a Uint8Array as per the parity-codec specifications
   * @param isBare true when the value has none of the type-specific prefixes (internal)
   */
  toU8a (isBare?: boolean): Uint8Array {
    const encoded = this.map((entry) =>
      entry.toU8a(isBare)
    );

    return isBare
      ? u8aConcat(...encoded)
      : u8aConcat(
        Compact.encodeU8a(this.length),
        ...encoded
      );
  }

  // Below are methods that we override. When we do a `new Vector(...).map()`,
  // we want it to return an Array. We only override the methods that return a
  // new instance.

  /**
   * @description Filters the array with the callback
   * @param callbackfn The filter function
   * @param thisArg The `this` object to apply the result to
   */
  filter (callbackfn: (value: T, index: number, array: Array<T>) => any, thisArg?: any): Array<T> {
    return this.toArray().filter(callbackfn, thisArg);
  }

  /**
   * @description Maps the array with the callback
   * @param callbackfn The mapping function
   * @param thisArg The `this` onject to apply the result to
   */
  map<U> (callbackfn: (value: T, index: number, array: Array<T>) => U, thisArg?: any): Array<U> {
    return this.toArray().map(callbackfn, thisArg);
  }
}
