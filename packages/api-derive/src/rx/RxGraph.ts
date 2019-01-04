// Copyright 2017-2018 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Codec } from '@polkadot/types/types';
import { combineLatest, Observable } from 'rxjs';

import { Graph } from '../derive/Graph';

export class RxGraph extends Graph<Observable<Codec>> {
  combine (streams: Observable<Codec>[]): Observable<Codec[]> {
    return combineLatest(streams);
  }

  createNode (nodeId: string): void {
    // All nodeIds are in the form: `AREA.SECTION.METHOD(arg1,arg2,...)`
    // So now we deserialize
    const [start] = nodeId.slice(0, -1).split('(');
    const [area, section, method] = start.split('.');
    switch (area) {
      case 'query':
      case 'rpc':
        // TODO How to set args correctly?
        this.setNode('nodeId', this.api[area][section][method]());
        break;
      case 'derive':
      // TODO
      default:
        throw new Error(`Node '${nodeId}' has incorrect area.`);
    }
  }
}
