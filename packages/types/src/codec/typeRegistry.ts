// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Constructor, RegistryTypes } from '../types';

import Default = require('../default');

import { isFunction, isString, isUndefined } from '@polkadot/util';

import { createClass, TypeDef } from './createType';
import MetadataRegistry, {
  TypeMetadata,
  TypeMetadataKind, TypeMetadataKind$Enum,
  TypeMetadataKind$Primitive,
  TypeMetadataKind$Struct
} from '../Metadata/v2/MetadataRegistry';
import { deriveUInt } from './UInt';
import { deriveU8aFixed } from './U8aFixed';
import Struct from './Struct';

const TYPES_DEFAULT = {
  ...Default
};

// TODO: what is RESULT and UKNOWN and isize
const TYPES_V2 = {
  '{"Metadata$Str":null}': Default.Text,
  '{"Metadata$Unit":null}': Default.Null,
  '{"Metadata$Bool":null}': Default.bool,
  '{"Metadata$Usize":null}': Default.usize,
  // Metadata$Isize: isize,
  '{"Metadata$U8":null}': Default.u8,
  '{"Metadata$I8":null}': Default.i8,
  '{"Metadata$U16":null}': Default.u16,
  '{"Metadata$I16":null}': Default.i16,
  '{"Metadata$U32":null}': Default.u32,
  '{"Metadata$I32":null}': Default.i32,
  '{"Metadata$U64":null}': Default.u64,
  '{"Metadata$I64":null}': Default.i64,
  '{"Metadata$U128":null}': Default.u128,
  '{"Metadata$I128":null}': Default.i128,
  '{"Metadata$U256":null}': Default.u256,
  '{"Metadata$U512":null}': deriveUInt(256),
  '{"Metadata$H160":null}': deriveU8aFixed(160),
  '{"Metadata$H256":null}': Default.H256,
  '{"Metadata$H512":null}': Default.H512
};

export class TypeRegistry {
  static readonly defaultRegistry: TypeRegistry = new TypeRegistry();

  private _registry: Map<string, Constructor> = new Map();

  constructor () {
    this.registerObject(TYPES_DEFAULT as any);
    this.registerObject(TYPES_V2);
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
    } if (arg1 instanceof Array) {
      this.registerTypeMetadata(arg1);
    } else {
      this.registerObject(arg1 as RegistryTypes);
    }
  }

  private getStructTypeClass (typeDef: TypeMetadataKind$Primitive | TypeMetadataKind$Struct | TypeMetadataKind$Enum): Constructor {
    if (typeDef instanceof TypeMetadataKind$Struct)
  }

  private registerTypeMetadata (obj: MetadataRegistry) {
    const pendingTypes: TypeMetadata[] = [];
    for (const typeMetadata of obj) {
      const kind = typeMetadata.kind;
      if (kind.type === 'TypeMetadataKind$Struct') {
        const typeDef = kind.value as TypeMetadataKind$Struct;

        const argsDef = typeDef.reduce((acc, subType) => {
          subType
        }, {});
        this.register(typeMetadata.name.toString(), Struct.with({}));
      }
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

  getOrThrow (name: string): Constructor {
    const type = this._registry.get(name);
    if (isUndefined(type)) {
      throw new Error(`type ${name} not found`);
    }
    return type;
  }
}

export default TypeRegistry.defaultRegistry;
