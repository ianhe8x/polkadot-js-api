// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Constructor, RegistryTypes } from '../types';

import { isFunction, isString, isUndefined } from '@polkadot/util';

import { createClass, getTypeDef, TypeDef } from './createType';
import MetadataRegistry, { TypeMetadata } from '../Metadata/v2/MetadataRegistry';
import { deriveUInt } from './UInt';
import { deriveU8aFixed } from './U8aFixed';

type TypeDefMap = {[name: string]: Constructor | undefined};

// const TYPES_DEFAULT = {
//   ...Default
// };

// TODO: what is RESULT and UKNOWN and isize
const TYPES_V2 = {
  // Metadata$Str: Default.Text,
  // Metadata$Unit: Default.Null,
  // Metadata$Bool: Default.bool,
  // Metadata$Usize: Default.usize,
  // // Metadata$Isize: isize,
  // Metadata$U8: Default.u8,
  // Metadata$I8: Default.i8,
  // Metadata$U16: Default.u16,
  // Metadata$I16: Default.i16,
  // Metadata$U32: Default.u32,
  // Metadata$I32: Default.i32,
  // Metadata$U64: Default.u64,
  // Metadata$I64: Default.i64,
  // Metadata$U128: Default.u128,
  // Metadata$I128: Default.i128,
  // Metadata$U256: Default.u256,
  // Metadata$U512: deriveUInt(256),
  // Metadata$H160: deriveU8aFixed(160),
  // Metadata$H256: Default.H256,
  // Metadata$H512: Default.H512
};

export class TypeRegistry {
  static readonly defaultRegistry: TypeRegistry = new TypeRegistry();

  private _registry: Map<string, Constructor> = new Map();
  private _typeDefMap: Map<string, TypeDef> = new Map();

  constructor () {
    // const Default = require('../index');
    // this.registerObject(Default as any);
    // this.registerObject(TYPES_V2);
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

  // private getStructTypeClass (typeDef: TypeMetadataKind$Primitive | TypeMetadataKind$Struct | TypeMetadataKind$Enum): Constructor {
  //   if (typeDef instanceof TypeMetadataKind$Struct) {}
  // }
  //
  private registerTypeMetadata (obj: MetadataRegistry) {
    const typeDefMap = obj.reduce((acc, typeMetadata) => {
      const typeName = typeMetadata.name.toString();
      acc[typeName] = undefined;
      return acc;
    }, {} as TypeDefMap);
    console.log(typeDefMap);
    const pendingTypes: TypeMetadata[] = [];
    // for (const typeMetadata of obj) {
    //   const kind = typeMetadata.kind;
    //   if (kind.type === 'TypeMetadataKind$Struct') {
    //     const typeDef = kind.value as TypeMetadataKind$Struct;
    //
    //     const argsDef = typeDef.reduce((acc, subType) => {
    //       subType
    //     }, {});
    //     this.register(typeMetadata.name.toString(), Struct.with({}));
    //   }
    // }
  }

  private typeDefFromMetadataRegistry (meta: MetadataRegistry): TypeDefMap {
    return meta.reduce((acc, typeMetadata) => {
      const typeName = typeMetadata.name.toString();
      acc[typeName] = undefined;
      return acc;
    }, {} as TypeDefMap);
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
