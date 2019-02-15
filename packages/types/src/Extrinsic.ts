// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { KeyringPair } from '@polkadot/keyring/types';
import { AnyNumber, AnyU8a, Codec, Constructor, ExtrinsicLike } from './types';

import typeRegistry from './codec/typeRegistry';
import Address from './Address';
import ExtrinsicSignature, { SignatureOptions } from './ExtrinsicSignature';
import Hash from './default/Hash';
import { FunctionMetadata } from './Metadata/v0/Modules';
import Method from './Method';

type ExtrinsicValue = {
  method?: Method
  signature?: ExtrinsicSignature
};

/**
 * @name Extrinsic
 * @description
 * A Proxy to actual Extrinsic Class
 *
 * Can be:
 * - signed, to create a transaction
 * - left as is, to create an inherent
 */
export default class Extrinsic implements ExtrinsicLike {
  protected targetCls: Constructor;
  protected target: ExtrinsicLike;
  constructor (value?: ExtrinsicValue | AnyU8a | Method) {
    this.targetCls = typeRegistry.getOrThrow('Extrinsic');
    this.target = new this.targetCls(value) as ExtrinsicLike;
  }

  /**
   * @description The arguments passed to for the call, exposes args so it is compatible with [[Method]]
   */
  get args (): Array<Codec> {
    return this.target.args;
  }

  /**
   * @description The actual `[sectionIndex, methodIndex]` as used in the Method
   */
  get callIndex (): Uint8Array {
    return this.target.callIndex;
  }

  /**
   * @description The actual data for the Method
   */
  get data (): Uint8Array {
    return this.target.data;
  }

  /**
   * @description The length of the value when encoded as a Uint8Array
   */
  get encodedLength (): number {
    return this.target.encodedLength;
  }

  /**
   * @description Convernience function, encodes the extrinsic and returns the actual hash
   */
  get hash (): Hash {
    return this.target.hash;
  }

  /**
   * @description `true` id the extrinsic is signed
   */
  get isSigned (): boolean {
    return this.target.isSigned;
  }

  /**
   * @description The length of the encoded value
   */
  get length (): number {
    return this.target.length;
  }

  /**
   * @description The [[FunctionMetadata]] that describes the extrinsic
   */
  get meta (): FunctionMetadata {
    return this.target.meta;
  }

  /**
   * @description The [[Method]] this extrinsic wraps
   */
  get method (): Method {
    return this.target.method;
  }

  /**
   * @description The [[ExtrinsicSignature]]
   */
  get signature (): ExtrinsicSignature {
    return this.target.signature;
  }

  /**
   * @description Add an [[ExtrinsicSignature]] to the extrinsic (already generated)
   */
  addSignature (signer: Address | Uint8Array, signature: Uint8Array, nonce: AnyNumber, era?: Uint8Array): ExtrinsicLike {
    return this.target.addSignature(signer, signature, nonce, era);
  }

  /**
   * @description Sign the extrinsic with a specific keypair
   */
  sign (account: KeyringPair, options: SignatureOptions): ExtrinsicLike {
    return this.target.sign(account, options);
  }

  /**
   * @description Returns a hex string representation of the value
   */
  toHex (): string {
    return this.target.toHex();
  }

  /**
   * @description Converts the Object to JSON, typically used for RPC transfers
   */
  toJSON (): any {
    return this.target.toJSON();
  }

  /**
   * @description Encodes the value as a Uint8Array as per the parity-codec specifications
   * @param isBare true when the value has none of the type-specific prefixes (internal)
   */
  toU8a (isBare?: boolean): Uint8Array {
    return this.target.toU8a(isBare);
  }

  eq (other?: any): boolean {
    return this.target.eq(other);
  }
}
