// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert } from '@polkadot/util';

import { Codec, Constructor } from '../types';
import Text from '../Text';
import Compact from './Compact';
import Option from './Option';
import Struct from './Struct';
import Tuple from './Tuple';
import UInt from './UInt';
import Vector from './Vector';
import getRegistry from './typeRegistry';
import { EnumVariantMetadata, FieldMetadata } from '../Metadata/v2/MetadataRegistry';
import EnumType from '../codec/EnumType';
import Null from '../Null';

export enum TypeDefInfo {
  Compact,
  Option,
  Plain,
  Struct,
  Tuple,
  Vector
}

export type TypeDef = {
  info: TypeDefInfo,
  name?: string,
  type: string,
  sub?: TypeDef | Array<TypeDef>
};

type TypeClsMap = { [name: string]: Constructor };

// safely split a string on ', ' while taking care of any nested occurences
export function typeSplit (type: string): Array<string> {
  let sDepth = 0;
  let tDepth = 0;
  let vDepth = 0;
  let start = 0;
  const result = [];

  for (let index = 0; index < type.length; index++) {
    switch (type[index]) {
      case ',':
        // we are not nested, add the type
        if (sDepth === 0 && tDepth === 0 && vDepth === 0) {
          result.push(type.substr(start, index - start).trim());
          start = index + 1;
        }
        break;

      // inc struct depth, start found
      case '{':
        sDepth++;
        break;

      // dec struct depth, end found
      case '}':
        sDepth--;
        break;

      // inc tuple depth, start found
      case '(':
        tDepth++;
        break;

      // dec tuple depth, end found
      case ')':
        tDepth--;
        break;

      // inc compact/vec depth, start found
      case '<':
        vDepth++;
        break;

      // dec compact/vec depth, end found
      case '>':
        vDepth--;
        break;

      // normal character
      default:
        break;
    }
  }

  assert(!sDepth && !tDepth && !vDepth, `Invalid defintion (missing terminators) found in ${type}`);

  // the final leg of the journey
  result.push(type.substr(start, type.length - start).trim());

  return result;
}

export function getTypeDef (_type: Text | string, name?: string): TypeDef {
  const type = _type.toString().trim();
  const value: TypeDef = {
    info: TypeDefInfo.Plain,
    name,
    type
  };
  let subType = '';

  const startingWith = (type: string, start: string, end: string): boolean => {
    if (type.substr(0, start.length) !== start) {
      return false;
    }

    assert(type[type.length - 1] === end, `Expected '${start}' closing with '${end}'`);

    subType = type.substr(start.length, type.length - start.length - 1);

    return true;
  };

  if (startingWith(type, '(', ')')) {
    value.info = TypeDefInfo.Tuple;
    value.sub = typeSplit(subType).map((inner) => getTypeDef(inner));
  } else if (startingWith(type, '{', '}')) {
    const parsed = JSON.parse(type);

    value.info = TypeDefInfo.Struct;
    value.sub = Object.keys(parsed).map((name) => getTypeDef(parsed[name], name));
  } else if (startingWith(type, 'Compact<', '>')) {
    value.info = TypeDefInfo.Compact;
    value.sub = getTypeDef(subType);
  } else if (startingWith(type, 'Option<', '>')) {
    value.info = TypeDefInfo.Option;
    value.sub = getTypeDef(subType);
  } else if (startingWith(type, 'Vec<', '>')) {
    value.info = TypeDefInfo.Vector;
    value.sub = getTypeDef(subType);
  }

  return value;
}

// function isV2Type (type: string) {
//   return type.startsWith('#V2');
// }
//
// // TODO: support V2
// export function getTypeDefV0 (type: string, name?: string): TypeDef {
//   const value: TypeDef = {
//     info: TypeDefInfo.Plain,
//     name,
//     type
//   };
//   let subType = '';
//
//   const startingWith = (type: string, start: string, end: string): boolean => {
//     if (type.substr(0, start.length) !== start) {
//       return false;
//     }
//
//     assert(type[type.length - 1] === end, `Expected '${start}' closing with '${end}'`);
//
//     subType = type.substr(start.length, type.length - start.length - 1);
//
//     return true;
//   };
//
//   if (startingWith(type, '(', ')')) {
//     value.info = TypeDefInfo.Tuple;
//     value.sub = typeSplit(subType).map((inner) => getTypeDef(inner));
//   } else if (startingWith(type, '{', '}')) {
//     const parsed = JSON.parse(type);
//
//     value.info = TypeDefInfo.Struct;
//     value.sub = Object.keys(parsed).map((name) => getTypeDef(parsed[name], name));
//   } else if (startingWith(type, 'Compact<', '>')) {
//     value.info = TypeDefInfo.Compact;
//     value.sub = getTypeDef(subType);
//   } else if (startingWith(type, 'Option<', '>')) {
//     value.info = TypeDefInfo.Option;
//     value.sub = getTypeDef(subType);
//   } else if (startingWith(type, 'Vec<', '>')) {
//     value.info = TypeDefInfo.Vector;
//     value.sub = getTypeDef(subType);
//   }
//
//   return value;
// }
//
// export function getTypeDefV2 (type: string, name?: string): TypeDef {
//   const metaName = new MetadataName(JSON.parse(type.substr(3)));
//   return _getTypeDefV2(metaName);
// }
//
// export function _getTypeDefV2 (metaName: MetadataName): TypeDef {
//   // const sub = getTypeDef(metaName.value);
//
//   const value: TypeDef = {
//     info: TypeDefInfo.TypeV2,
//     name,
//     type: metaName.toString()
//   };
//
//   if (metaName.type === 'Metadata$Array' || metaName.type === 'Metadata$Vector') {
//     value.info = TypeDefInfo.Vector;
//     value.sub = _getTypeDefV2(metaName.value as Metadata$Vector);
//   } else if (metaName.type === 'Metadata$Tuple') {
//     value.info = TypeDefInfo.Tuple;
//     value.sub = (metaName.value as Metadata$Tuple).map((inner) => _getTypeDefV2(inner));
//   } else if (metaName.type === 'Metadata$Option') {
//     value.info = TypeDefInfo.Option;
//     value.sub = _getTypeDefV2(metaName.value as Metadata$Option);
//   } else if (metaName.type === 'Metadata$Compact') {
//     value.info = TypeDefInfo.Compact;
//     value.sub = _getTypeDefV2(metaName.value as Metadata$Compact);
//   }
//   return value;
// }
//
// export function getTypeDef (_type: Text | string, name?: string): TypeDef {
//   const type = _type.toString().trim();
//   if (isV2Type(type)) {
//     return getTypeDefV2(type, name);
//   } else {
//     return getTypeDefV0(type, name);
//   }
// }

// Returns the type Class for construction
export function getTypeClass (value: TypeDef): Constructor {
  if (value.info === TypeDefInfo.Compact) {
    assert(value.sub && !Array.isArray(value.sub), 'Expected subtype for Compact');

    return Compact.with(
      getTypeClass(value.sub as TypeDef) as Constructor<UInt>
    );
  } else if (value.info === TypeDefInfo.Option) {
    assert(value.sub && !Array.isArray(value.sub), 'Expected subtype for Option');

    return Option.with(
      getTypeClass(value.sub as TypeDef)
    );
  } else if (value.info === TypeDefInfo.Struct) {
    assert(Array.isArray(value.sub), 'Expected nested subtypes for Struct');

    return Struct.with(
      (value.sub as Array<TypeDef>).reduce((result, sub) => {
        result[sub.name as string] = getTypeClass(sub);

        return result;
      }, {} as { [index: string]: Constructor })
    );
  } else if (value.info === TypeDefInfo.Tuple) {
    assert(Array.isArray(value.sub), 'Expected nested subtypes for Tuple');

    return Tuple.with(
      (value.sub as Array<TypeDef>).map(getTypeClass)
    );
  } else if (value.info === TypeDefInfo.Vector) {
    assert(value.sub && !Array.isArray(value.sub), 'Expected subtype for Vector');

    return Vector.with(
      getTypeClass(value.sub as TypeDef)
    );
  }

  const Type = getRegistry().getOrThrow(value.type,
    `Unable to determine type from '${value.type}'`
  );

  return Type;
}

export function createClass (type: Text | string, value?: any): Constructor {
  return getTypeClass(
    getTypeDef(type)
  );
}

export default function createType (type: Text | string, value?: any): Codec {
  // l.debug(() => ['createType', { type, value }]);

  const Type = createClass(type);

  return new Type(value);
}

export function createMetadataKind$Struct (types: FieldMetadata[]) {
  if (types.length === 0) {
    return Null;
  } else if ((types[0] as FieldMetadata).name.type === 'FieldName$Unnamed') {
    return createTuple(types);
  } else {
    return createStruct(types);
  }
}

/**
 * create a class derived from Tuple
 * @param types
 * @throws when one of the sub type class can't be found in registry
 */
function createTuple (types: FieldMetadata[]) {
  const typeClsList = types.map(typeMetadata => createClass(typeMetadata.ty.toString()));

  return Tuple.with(typeClsList);
}

/**
 * convert FieldMetadata[] into a class derived from Struct
 * @param types
 * @throws when one of the sub type class can't be found in registry
 * or if self-reference exists.
 */
function createStruct (types: FieldMetadata[]) {
  const typeClsMap = types.reduce((acc, typeMetadata) => {
    const typeName = typeMetadata.name.value.toString();
    acc[typeName] = createClass(typeMetadata.ty.toString());
    return acc;
  }, {} as TypeClsMap);

  return Struct.with(typeClsMap);
}

export function createMetadataKind$Enum (types: EnumVariantMetadata[]) {
  const typeClsMap = types.reduce((acc, typeMetadata) => {
    const enumName = typeMetadata.name.toString();
    const enumIndex = typeMetadata.index.toNumber();
    const enumFields = typeMetadata.fields.toArray();
    const definedEnumCount = Object.keys(acc).length;
    let unknownCount = 0;
    if (definedEnumCount < enumIndex) {
      // index can skip, need to sanitize
      for (let i = 0; i < enumIndex - definedEnumCount; i++) {
        acc[`UNKNOWN_${unknownCount++}`] = Null;
      }
    }
    if (enumFields.length === 0) {
      acc[enumName] = Null;
    } else {
      acc[enumName] = createMetadataKind$Struct(enumFields);
    }
    return acc;
  }, {} as TypeClsMap);
  return EnumType.with(typeClsMap);
}
