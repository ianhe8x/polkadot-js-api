// Copyright 2017-2018 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import ApiRx from '@polkadot/api/rx';
import { Codec } from '@polkadot/types/types';
import { Observable } from 'rxjs';

import { Derive } from '../derive/Derive';
import { RxGraph } from './RxGraph';
import { RxOperators } from './RxOperators';

export class RxDerive extends Derive<Observable<Codec>> {
  constructor (api: ApiRx) {
    super();
    this.api = api;
    this.graph = new RxGraph(api);
    this.operators = new RxOperators();
  }
}
