import BN from 'bn.js';
import { AddressLike, Constructor } from '../types';
import getRegistry from '../codec/typeRegistry';
import { BaseProxy } from './base';

import AccountId from '../AccountId';
import AccountIndex from '../AccountIndex';

export type AnyAddress = BN | AddressLike | AccountId | AccountIndex | Array<number> | Uint8Array | number | string;

export default class Event extends BaseProxy<AddressLike> implements AddressLike {
  protected targetCls: Constructor;
  protected target: AddressLike;

  constructor (value: AnyAddress = new Uint8Array()) {
    super();
    this.targetCls = getRegistry().getOrThrow('Address');
    this.target = new this.targetCls(value) as AddressLike;
  }

  get rawLength (): number {
    return this.target.rawLength;
  }

}
