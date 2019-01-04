// Copyright 2017-2018 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { MonoTypeOperatorFunction, OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Operators } from '../derive/Operators';

export class RxOperators extends Operators {
  filter<T> (predicate: (value: T, index: number) => boolean): MonoTypeOperatorFunction<T> {
    return filter(predicate);
  }

  map<T, R> (project: (value: T, index: number) => R): OperatorFunction<T, R> {
    return map(project);
  }
}
