// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Phase } from '../EventRecord';
import * as defaultTypes from '../index';
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
    }
    if (arg1 instanceof Array) {
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
      if (overwrite || !this._registry.get(name)) {
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
    return this._registry.get(name);
  }

  getOrThrow (name: string, msg?: string): Constructor {
    const type = this._registry.get(name);
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
      'srml_indices::address#Address': defaultTypes.Address,
      'node_runtime#Call': defaultTypes.Proposal,
      'sr_primitives#AccountId': defaultTypes.AccountId,
      // FIXME some code in api relay on the implementation of Phase and EventRecord
      'srml_system#Phase': Phase,
      'srml_system#EventRecord<node_runtime#Event>': defaultTypes.EventRecord
    };
    defaultRegistry = new TypeRegistry({ ...defaultTypes, ...V2_DEFAULT });
  }
  return defaultRegistry;
}
