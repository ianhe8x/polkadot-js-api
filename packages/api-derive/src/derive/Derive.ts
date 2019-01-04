// Copyright 2017-2018 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import ApiBase from '@polkadot/api/Base';

import { Graph } from './Graph';
import { Operators } from './Operators';

export abstract class Derive<Stream> {
  protected api!: ApiBase<any, any, any>; // FIXME Don't use any any
  public graph!: Graph<Stream>;
  public operators!: Operators;
}
