// Copyright 2017-2018 @polkadot/api-provider authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MockState, MockState$Storage, MockState$Subscriptions } from './types';

import E3 from 'eventemitter3';
import interfaces from '@polkadot/jsonrpc';
import u8aToHex from '@polkadot/util/u8a/toHex';
import logger from '@polkadot/util/logger';

const l =logger('api-mock');

const SUBSCRIPTIONS: string[] = Array.prototype.concat.apply(
  [], [...interfaces.values()].map((areas) =>
    Object
      .keys(areas.public)
      .filter((method) =>
        areas.public[method].isSubscription
      )
      .map((method) =>
        `subscribe_${method}`
      )
  )
);

const REQUESTS = {
  'state_getStorage': (storage: MockState$Storage, params: Array<any>): string => {
    return u8aToHex(
      storage[(params[0] as string)]
    );
  },
  'system_chain': (): string => 'mockChain',
  'system_name': (): string => 'mockClient',
  'system_version': (): string => '9.8.7'
};

export default function state (): MockState {
  const storage = {};
  const subscriptions: MockState$Subscriptions = SUBSCRIPTIONS.reduce((subs, name) => {
    subs[name] = {
      callbacks: {},
      lastValue: null
    };

    return subs;
  }, ({} as MockState$Subscriptions));

  return {
    emitter: new E3.EventEmitter(),
    l,
    requests: Object.assign({}, REQUESTS),
    storage,
    subscriptionId: 0,
    subscriptionMap: {},
    subscriptions
  };
}