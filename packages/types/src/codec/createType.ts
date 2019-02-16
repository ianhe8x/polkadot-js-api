// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assert } from '@polkadot/util';

import { Codec, Constructor } from '../types';
import { Text } from '../index';
import Compact from './Compact';
import Option from './Option';
import Struct from './Struct';
import Tuple from './Tuple';
import UInt from './UInt';
import Vector from './Vector';
import registry from './typeRegistry';
import {
  Metadata$Compact,
  Metadata$Option,
  Metadata$Tuple,
  Metadata$Vector,
  MetadataName
} from '../Metadata/v2/MetadataRegistry';

export enum TypeDefInfo {
  Compact,
  Option,
  Plain,
  Struct,
  Tuple,
  Vector,
  TypeV2
}

export type TypeDef = {
  info: TypeDefInfo,
  name?: string,
  type: string,
  sub?: TypeDef | Array<TypeDef>
};

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

function isV2Type (type: string) {
  return type.startsWith('#V2');
}

// TODO: support V2
export function getTypeDefV0 (type: string, name?: string): TypeDef {
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

export function getTypeDefV2 (type: string, name?: string): TypeDef {
  const metaName = new MetadataName(JSON.parse(type.substr(3)));
  return _getTypeDefV2(metaName);
}

export function _getTypeDefV2 (metaName: MetadataName): TypeDef {
  // const sub = getTypeDef(metaName.value);

  const value: TypeDef = {
    info: TypeDefInfo.TypeV2,
    name,
    type: metaName.toString()
  };

  if (metaName.type === 'Metadata$Array' || metaName.type === 'Metadata$Vector') {
    value.info = TypeDefInfo.Vector;
    value.sub = _getTypeDefV2(metaName.value as Metadata$Vector);
  } else if (metaName.type === 'Metadata$Tuple') {
    value.info = TypeDefInfo.Tuple;
    value.sub = (metaName.value as Metadata$Tuple).map((inner) => _getTypeDefV2(inner));
  } else if (metaName.type === 'Metadata$Option') {
    value.info = TypeDefInfo.Option;
    value.sub = _getTypeDefV2(metaName.value as Metadata$Option);
  } else if (metaName.type === 'Metadata$Compact') {
    value.info = TypeDefInfo.Compact;
    value.sub = _getTypeDefV2(metaName.value as Metadata$Compact);
  }
  return value;
}

export function getTypeDef (_type: Text | string, name?: string): TypeDef {
  const type = _type.toString().trim();
  if (isV2Type(type)) {
    return getTypeDefV2(type, name);
  } else {
    return getTypeDefV0(type, name);
  }
}

// TODO: support V2
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

  const Type = registry.get(value.type);

  assert(Type, `Unable to determine type from '${value.type}'`);

  return Type as Constructor;
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
