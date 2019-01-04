// Copyright 2017-2018 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import ApiRx from '@polkadot/api/rx';
import { BlockNumber } from '@polkadot/types/index';

import { RxDerive } from '../../../src/rx/RxDerive';

describe('RxDerive', () => {
  let api: ApiRx;
  let derive: RxDerive;

  beforeAll(async () => {
    api = await ApiRx.create().toPromise();
    derive = new RxDerive(api); // FIXME this syntax is temporary
  });

  it('makes a bestNumber call', (done) => {
    derive.chain.bestNumber().subscribe((blockNumber: BlockNumber) => {
      if (blockNumber instanceof BlockNumber) {
        done();
      }
    });
  });
});
