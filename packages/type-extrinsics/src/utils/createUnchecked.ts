// Copyright 2017-2019 @polkadot/extrinsics authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { FunctionMetadata } from '@polkadot/types/Metadata/v0/Modules';
import { FunctionMetadata as FunctionMetadataV2 } from '@polkadot/types/Metadata/v2/Modules';
import { MethodFunction } from '@polkadot/types/Method';
import { Method } from '@polkadot/types/index';
import { Method as MethodV2 } from '@polkadot/types/v2/Method';
import { assert } from '@polkadot/util';

/**
 * From the metadata of a function in the module's storage, generate the function
 * that will return the an UncheckExtrinsic.
 *
 * @param index - Index of the module section in the modules array.
 */
export function createDescriptorV0 (
  section: string,
  method: string,
  index: number,
  meta: FunctionMetadata
): MethodFunction {
  const callIndex = new Uint8Array([index, meta.id.toNumber()]);
  let extrinsicFn: any;

  const expectedArgs = Method.filterOrigin(meta);

  extrinsicFn = (...args: any[]): Method => {
    assert(expectedArgs.length.valueOf() === args.length, `Extrinsic ${section}.${method} expects ${expectedArgs.length.valueOf()} arguments, got ${args.length}.`);
    // TODO: pass args to constructor according to meta
    return new Method({
      args,
      callIndex
    }, meta);
  };

  extrinsicFn.callIndex = callIndex;
  extrinsicFn.meta = meta;
  extrinsicFn.method = method;
  extrinsicFn.section = section;
  extrinsicFn.toJSON = (): any =>
    meta.toJSON();

  return extrinsicFn as MethodFunction;
}

export function createDescriptorV2 (
  section: string,
  method: string,
  index: number,
  meta: FunctionMetadataV2
): MethodFunction {
  const callIndex = new Uint8Array([index, meta.id.toNumber()]);
  let extrinsicFn: any;

  const expectedArgs = Method.filterOrigin(meta);

  extrinsicFn = (...args: any[]): MethodV2 => {
    assert(expectedArgs.length.valueOf() === args.length, `Extrinsic ${section}.${method} expects ${expectedArgs.length.valueOf()} arguments, got ${args.length}.`);
    // TODO: pass args to constructor according to meta
    return new MethodV2({
      args,
      callIndex
    }, meta);
  };

  extrinsicFn.callIndex = callIndex;
  extrinsicFn.meta = meta;
  extrinsicFn.method = method;
  extrinsicFn.section = section;
  extrinsicFn.toJSON = (): any =>
    meta.toJSON();

  return extrinsicFn as MethodFunction;
}

export default {
  v0: createDescriptorV0,
  v2: createDescriptorV2
};
