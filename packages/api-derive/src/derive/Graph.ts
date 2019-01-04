// Copyright 2017-2018 @polkadot/api-derive authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Graph as DagreGraph } from '@dagrejs/graphlib';
import ApiBase from '@polkadot/api/Base';
import { assert } from '@polkadot/util';

export abstract class Graph<Stream> extends DagreGraph {
  protected api: ApiBase<any, any, any>; // FIXME Don't use any

  constructor (api: ApiBase<any, any, any>) { // FIXME Don't use any
    super();
    this.api = api;
  }

  abstract combine (streams: Stream[]): void;

  calculateNode (nodeId: string): void {
    // Get all incoming edges into w
    const edges = this.inEdges(nodeId);

    if (!edges) {
      throw new Error(`Incoming edges into ${nodeId} are empty.`);
    }

    // Perform some basic checks
    edges.forEach(edge => {
      assert(
        this.node(edge.v).subscribe, // FIXME should be isObservable here
        `Node ${edge.v} is not an Observable, got ${JSON.stringify(this.node(edge.v))}.`
      );
      assert(
        Array.isArray(this.edge(edge.v, nodeId)), // FIXME do a more precise check
        `Edge ${nodeId} is not a pipes array, got ${JSON.stringify(this.edge(edge.v, nodeId))}.`
      );
    });

    // The Observable inside node w is done by combining the Observables
    // incoming into w, where each Observable is piped into the pipes inside
    // their edge.
    // with w.
    this.setNode(nodeId, this.combine(
      edges.map(
        edge => this.node(edge.v).pipe(...this.edge(edge))
      )
    ));
  }

  abstract createNode (nodeId: string): void;

  getOrCreateNode (nodeId: string): string {
    // Create node if it doesn't exist
    if (!this.hasNode(nodeId)) {
      this.createNode(nodeId);
    }

    return nodeId;
  }
}
