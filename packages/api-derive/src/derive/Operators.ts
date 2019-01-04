// Copyright 2017-2018 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {
  MonoTypeOperatorFunction as ObservableMonoTypeOperatorFunction,
  OperatorFunction as ObservableOperatorFunction,
  UnaryFunction
} from 'rxjs';

// TODO
// It would have been great to use a generic type `Stream`, which would be
// either Observable or Promise. However, that's not possible in TS:
// https://stackoverflow.com/questions/54037783/typescript-generic-type-of-a-generic-type
// So instead, we create those types manually, separately for Promise and for
// Observable.
export interface PromiseOperatorFunction<T, R> extends UnaryFunction<Promise<T>, Promise<R>> { }
export interface PromiseMonoTypeOperatorFunction<T> extends PromiseOperatorFunction<T, T> { }

type OperatorFunction<T, R> = ObservableOperatorFunction<T, R> | PromiseOperatorFunction<T, R>;
type MonoTypeOperatorFunction<T> = ObservableMonoTypeOperatorFunction<T> | PromiseMonoTypeOperatorFunction<T>;

export abstract class Operators {
  abstract filter<T> (predicate: (value: T, index: number) => boolean): MonoTypeOperatorFunction<T>;
  abstract map<T, R> (project: (value: T, index: number) => R): OperatorFunction<T, R>;
}
