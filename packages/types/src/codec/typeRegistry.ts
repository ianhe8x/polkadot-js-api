// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Constructor, RegistryTypes } from '../types';

import { isFunction, isString, isUndefined } from '@polkadot/util';

import { createClass, createMetadataKind$Enum, createMetadataKind$Struct } from './createType';
import MetadataRegistry, {
  TypeMetadata,
  TypeMetadataKind$Struct,
  TypeMetadataKind$Enum
} from '../Metadata/v2/MetadataRegistry';

// TODO: what is RESULT and UKNOWN and isize
// const TYPES_V2 = {
//   Metadata$Str: Default.Text,
//   Metadata$Unit: Default.Null,
//   Metadata$Bool: Default.bool,
//   Metadata$Usize: Default.usize,
//   // Metadata$Isize: isize,
//   Metadata$U8: Default.u8,
//   Metadata$I8: Default.i8,
//   Metadata$U16: Default.u16,
//   Metadata$I16: Default.i16,
//   Metadata$U32: Default.u32,
//   Metadata$I32: Default.i32,
//   Metadata$U64: Default.u64,
//   Metadata$I64: Default.i64,
//   Metadata$U128: Default.u128,
//   Metadata$I128: Default.i128,
//   Metadata$U256: Default.u256,
//   Metadata$U512: deriveUInt(256),
//   Metadata$H160: deriveU8aFixed(160),
//   Metadata$H256: Default.H256,
//   Metadata$H512: Default.H512
// };

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

  // private getStructTypeClass (typeDef: TypeMetadataKind$Primitive | TypeMetadataKind$Struct | TypeMetadataKind$Enum): Constructor {
  //   if (typeDef instanceof TypeMetadataKind$Struct) {}
  // }
  //
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
    this.registerObject(typeDefMap);
    const skippedLog = [];
    while (skipped.length > 0 && skipped.length < pendingTypes.length) {
      skippedLog.push(skipped.length);
      pendingTypes = skipped;
      typeDefMap = {};
      skipped = parseTypeMeta(pendingTypes);
      this.registerObject(typeDefMap);
    }
    if (skipped.length > 0) {
      console.log(`skipped types: ${skipped.length}`);
    }
  }

  private registerObject (obj: RegistryTypes) {
    Object.entries(obj).forEach(([name, type]) => {
      if (isString(type)) {
        this._registry.set(name, createClass(type));
      } else if (isFunction(type)) {
        // This _looks_ a bit funny, but `typeof Clazz === 'function'
        this._registry.set(name, type);
      } else {
        this._registry.set(name, createClass(JSON.stringify(type)));
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
    const defaultTypes = require('../index');
    const V2_DEFAULT = {
      'srml_indices::address#Address': defaultTypes.Address,
      'node_runtime#Call': defaultTypes.Proposal
    };
    defaultRegistry = new TypeRegistry({ ...defaultTypes, ...V2_DEFAULT });
  }
  return defaultRegistry;
}
