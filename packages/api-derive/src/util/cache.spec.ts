// Copyright 2017-2019 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { ApiInterface$Rx } from '@polkadot/api/types';

import { cache } from './cache';

describe('cache', () => {
  const f = cache((api: ApiInterface$Rx) => (a: number, b: number) => [api, a, b]);
  const api = {} as ApiInterface$Rx;

  it('should hit cache when all arguments are the same', () => {
    const first = f(api)(2, 3);
    const second = f(api)(2, 3);

    expect(first).toBe(second);
  });

  it('should not hit cache when some arguments are not the same', () => {
    const first = f(api)(2, 3);
    const second1 = f(api)(5, 3);
    const second2 = f(api)(2, 5);
    const second3 = f({} as ApiInterface$Rx)(2, 3);

    expect(first).not.toBe(second1);
    expect(first).not.toBe(second2);
    expect(first).not.toBe(second3);
  });
});
