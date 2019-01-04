// Copyright 2017-2018 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Header } from '@polkadot/types/index';
import { Derive } from '../../Derive';

export function bestNumber<Stream, T> (derive: Derive<Stream>): T {
  const myNode = 'derive.chain.bestNumber()';
  const subscribeNewHead = derive.graph.getOrCreateNode('rpc.chain.subscribeNewHead');
  derive.graph.setEdge(
    subscribeNewHead,
    myNode,
    [
      derive.operators.filter((header?: Header) => !!header && !!header.blockNumber),
      derive.operators.map((header: Header) => header.blockNumber)
    ]
  );

  derive.graph.calculateNode(myNode);

  return derive.graph.node(myNode);
}
