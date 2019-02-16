import BN from 'bn.js';
import { AddressLike, Constructor } from '../types';
import typeRegistry from '../codec/typeRegistry';
import { BaseProxy } from './base';

import AccountId from '../default/AccountId';
import AccountIndex from '../default/AccountIndex';

export type AnyAddress = BN | AddressLike | AccountId | AccountIndex | Array<number> | Uint8Array | number | string;

export default class Address extends BaseProxy<AddressLike> implements AddressLike {
  protected targetCls: Constructor;
  protected target: AddressLike;

  constructor (value: AnyAddress = new Uint8Array()) {
    super();
    this.targetCls = typeRegistry.getOrThrow('Address');
    this.target = new this.targetCls(value) as AddressLike;
  }

  get rawLength (): number {
    return this.target.rawLength;
  }

}
