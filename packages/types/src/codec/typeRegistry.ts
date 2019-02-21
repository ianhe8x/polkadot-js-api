// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Phase } from '../EventRecord';
import * as defaultTypes from '../index';
import Type from '../Type';
import { Constructor, RegistryTypes } from '../types';

import { isFunction, isString, isUndefined } from '@polkadot/util';

import { createClass, createMetadataKind$Enum, createMetadataKind$Struct } from './createType';
import MetadataRegistry, {
  TypeMetadata,
  TypeMetadataKind$Struct,
  TypeMetadataKind$Enum
} from '../Metadata/v2/MetadataRegistry';

export class TypeRegistry {
  static readonly defaultRegistry: TypeRegistry = new TypeRegistry();

  private _registry: Map<string, Constructor> = new Map();

  constructor (types?: RegistryTypes) {
    if (types) {
      this.register(types);
    }
  }

  register (type: Constructor | RegistryTypes | MetadataRegistry): void;
  register (name: string, type: Constructor): void;
  register (arg1: string | Constructor | RegistryTypes | MetadataRegistry, arg2?: Constructor): void {
    if (isString(arg1)) {
      const name = arg1;
      const type = arg2!;

      this._registry.set(name, type);
    } else if (isFunction(arg1)) {
      const name = arg1.name;
      const type = arg1;

      this._registry.set(name, type);
    } else if (arg1 instanceof Array) {
      this.registerTypeMetadata(arg1);
    } else {
      this.registerObject(arg1 as RegistryTypes);
    }
  }

  private registerTypeMetadata (obj: MetadataRegistry) {
    let typeDefMap: { [name: string]: Constructor } = {};
    let pendingTypes: TypeMetadata[] = obj.toArray();
    const parseTypeMeta = (types: TypeMetadata[]) => {
      const skipped: TypeMetadata[] = [];
      for (const typeMetadata of types) {
        const { name, kind } = typeMetadata;
        switch (kind.type) {
          case 'TypeMetadataKind$Struct': {
            // Tuple or Struct
            const typeDef = kind.value as TypeMetadataKind$Struct;
            try {
              typeDefMap[name.toString()] = createMetadataKind$Struct(typeDef);
            } catch (e) {
              skipped.push(typeMetadata);
            }
            break;
          }
          case 'TypeMetadataKind$Enum': {
            const typeDef = kind.value as TypeMetadataKind$Enum;
            try {
              typeDefMap[name.toString()] = createMetadataKind$Enum(typeDef);
            } catch (e) {
              skipped.push(typeMetadata);
            }
            break;
          }
          case 'TypeMetadataKind$Primitive': {
            const typeCls = this.get(name.toString());
            if (!typeCls) {
              skipped.push(typeMetadata);
              console.warn(`${typeCls} is Primitive, but not found in type registry`);
            }
            break;
          }
          default:
            skipped.push(typeMetadata);
        }
      }
      return skipped;
    };

    let skipped = parseTypeMeta(pendingTypes);
    this.registerObject(typeDefMap, false);
    const skippedLog = [];
    while (skipped.length > 0 && skipped.length < pendingTypes.length) {
      skippedLog.push(skipped.length);
      pendingTypes = skipped;
      typeDefMap = {};
      skipped = parseTypeMeta(pendingTypes);
      this.registerObject(typeDefMap, false);
    }
    if (skipped.length > 0) {
      console.log(`skipped types: ${skipped.length}`);
    }
  }

  private registerObject (obj: RegistryTypes, overwrite: boolean = true) {
    Object.entries(obj).forEach(([name, type]) => {
      if (overwrite || !this.get(name)) {
        if (isString(type)) {
          this._registry.set(name, createClass(type));
        } else if (isFunction(type)) {
          // This _looks_ a bit funny, but `typeof Clazz === 'function'
          this._registry.set(name, type);
        } else {
          this._registry.set(name, createClass(JSON.stringify(type)));
        }
      }
    });
  }

  get (name: string): Constructor | undefined {
    let retType = this._registry.get(name);
    if (!retType) {
      const genericType = new Type(name).removeGenerics();
      retType = this._registry.get(genericType.toString());
    }
    return retType;
  }

  getOrThrow (name: string, msg?: string): Constructor {
    const type = this.get(name);
    if (isUndefined(type)) {
      throw new Error(msg || `type ${name} not found`);
    }
    return type;
  }
}

let defaultRegistry: TypeRegistry;

export default function getDefaultRegistry () {
  if (!defaultRegistry) {
    const V2_DEFAULT = {
      // FIXME some code in api relay on the implementation of Phase and EventRecord
      'sr_primitives#AccountId': defaultTypes.AccountId,
      'srml_indices::address#Address': defaultTypes.Address,
      'node_runtime#Call': defaultTypes.Proposal,
      'srml_system#Phase': Phase,
      'srml_system#EventRecord': defaultTypes.EventRecord,
      'node_runtime#Event': defaultTypes.Event,
      'sr_primitives::generic::digest#Digest': defaultTypes.Digest,
      // TODO: remove when Bryan commit a fix
      '(Vec<u8>,Vec<u8>)': defaultTypes.KeyValue,
      'substrate_primitives::authority_id#Ed25519AuthorityId': defaultTypes.SessionKey,
      'sr_primitives#Perbill': defaultTypes.Perbill,
      'sr_primitives#Permill': defaultTypes.Permill,
      'srml_democracy#ReferendumInfo': defaultTypes.ReferendumIndex,
      'srml_contract#Schedule': defaultTypes.Schedule,
      'srml_grandpa#StoredPendingChange': defaultTypes.StoredPendingChange,
      'srml_staking#ValidatorPrefs': defaultTypes.ValidatorPrefs,
      'srml_democracy#Vote': defaultTypes.Vote,
      'srml_democracy::vote_threshold#VoteThreshold': defaultTypes.VoteThreshold
    };
    defaultRegistry = new TypeRegistry({ ...defaultTypes, ...V2_DEFAULT });
  }
  return defaultRegistry;
}
