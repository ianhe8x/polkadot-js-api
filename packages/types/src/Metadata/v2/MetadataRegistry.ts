// Copyright 2017-2019 @polkadot/types authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import EnumType from '../../codec/EnumType';
import Struct from '../../codec/Struct';
import Vector from '../../codec/Vector';
import Null from '../../default/Null';
import Tuple from '../../codec/Tuple';
import Text from '../../default/Text';
import U16 from '../../default/U16';

export class MetadataName extends EnumType<Metadata$Unknown | Metadata$Custom | Metadata$CustomWithGenerics | Metadata$Array | Metadata$Vector | Metadata$Tuple | Metadata$Option | Metadata$Result | Metadata$Compact | Metadata$Str | Metadata$Unit | Metadata$Bool | Metadata$Usize | Metadata$Isize | Metadata$U8 | Metadata$I8 | Metadata$U16 | Metadata$I16 | Metadata$U32 | Metadata$I32 | Metadata$U64 | Metadata$I64 | Metadata$U128 | Metadata$I128 | Metadata$U256 | Metadata$U512 | Metadata$H160 | Metadata$H256 | Metadata$H512> {
  constructor (value: any) {
    super({
      Metadata$Unknown,
      Metadata$Custom,
      Metadata$CustomWithGenerics,
      Metadata$Array,
      Metadata$Vector,
      Metadata$Tuple,
      Metadata$Option,
      Metadata$Result,
      Metadata$Compact,
      Metadata$Str,
      Metadata$Unit,
      Metadata$Bool,
      Metadata$Usize,
      Metadata$Isize,
      Metadata$U8,
      Metadata$I8,
      Metadata$U16,
      Metadata$I16,
      Metadata$U32,
      Metadata$I32,
      Metadata$U64,
      Metadata$I64,
      Metadata$U128,
      Metadata$I128,
      Metadata$U256,
      Metadata$U512,
      Metadata$H160,
      Metadata$H256,
      Metadata$H512
    }, value);
  }

  get name (): string {
    return (this.raw as any).name || this.type;
  }

  toString (): string {
    return this.value.toString();
  }

  toJSON (): any {
    return this.toString();
  }
}

export class Metadata$Unknown extends Null {
  toString (): string {
    return 'Metadata$Unknown';
  }
}
export class Metadata$Custom extends Tuple {
  constructor (value: any) {
    super([
      Text,
      Text
    ], value);
  }

  get name (): string {
    return this[1].toString();
  }
  toString (): string {
    return `${this[0].toString()}#${this[0].toString()}`;
  }
}

export class Metadata$CustomWithGenerics extends Tuple {
  constructor (value: any) {
    super([
      Text,
      Text,
      Vector.with(MetadataName)
    ], value);
  }

  get name (): string {
    return this[1].toString();
  }

  toString (): string {
    let subType = '';
    const generics = this[2] as Vector<MetadataName>;
    if (generics.length === 1) {
      subType = generics[0].toString();
    } else if (this.length > 1) {
      subType = generics[0].toString();
      for (let i = 1; i < this.length; i++) {
        subType = `${subType},${generics[i].toString()}`;
      }
    }
    return `${this[0].toString()}#${this[0].toString()}<${subType}>`;
  }
}

export class Metadata$Array extends Tuple {
  constructor (value: any) {
    super([
      U16,
      MetadataName
    ], value);
  }
  toString (): string {
    return `Vec<${this[1].toString()}>`;
  }
}
export class Metadata$Vector extends MetadataName {
  toString (): string {
    return `Vec<${this.value.toString()}>`;
  }
}
export class Metadata$Tuple extends Vector.with(MetadataName) {
  toString (): string {
    let subType = '';
    if (this.length === 1) {
      subType = this[0].toString();
    } else if (this.length > 1) {
      subType = this[0].toString();
      for (let i = 1; i < this.length; i++) {
        subType = `${subType},${this[i].toString()}`;
      }
    }
    return `(${subType})`;
  }
}
export class Metadata$Option extends MetadataName {
  toString (): string {
    return `Option<${this.value.toString()}>`;
  }
}
export class Metadata$Result extends Tuple {
  constructor (value: any) {
    super([
      MetadataName,
      MetadataName
    ], value);
  }
  toString (): string {
    return `(${this[0].toString()},${this[1].toString()})`;
  }
}
export class Metadata$Compact extends MetadataName {
  toString (): string {
    return `Compact<${this.value.toString()}>`;
  }
}
export class Metadata$Str extends Null {
  toString (): string {
    return 'Metadata$Str';
  }
}
export class Metadata$Unit extends Null {
  toString (): string {
    return 'Metadata$Unit';
  }
}
export class Metadata$Bool extends Null {
  toString (): string {
    return 'Metadata$Bool';
  }
}
export class Metadata$Usize extends Null {
  toString (): string {
    return 'Metadata$Usize';
  }
}
export class Metadata$Isize extends Null {
  toString (): string {
    return 'Metadata$Isize';
  }
}
export class Metadata$U8 extends Null {
  toString (): string {
    return 'Metadata$U8';
  }
}
export class Metadata$I8 extends Null {
  toString (): string {
    return 'Metadata$I8';
  }
}
export class Metadata$U16 extends Null {
  toString (): string {
    return 'Metadata$U16';
  }
}
export class Metadata$I16 extends Null {
  toString (): string {
    return 'Metadata$I16';
  }
}
export class Metadata$U32 extends Null {
  toString (): string {
    return 'Metadata$U32';
  }
}
export class Metadata$I32 extends Null {
  toString (): string {
    return 'Metadata$I32';
  }
}
export class Metadata$U64 extends Null {
  toString (): string {
    return 'Metadata$U64';
  }
}
export class Metadata$I64 extends Null {
  toString (): string {
    return 'Metadata$I64';
  }
}
export class Metadata$U128 extends Null {
  toString (): string {
    return 'Metadata$U128';
  }
}
export class Metadata$I128 extends Null {
  toString (): string {
    return 'Metadata$I128';
  }
}
export class Metadata$U256 extends Null {
  toString (): string {
    return 'Metadata$U256';
  }
}
export class Metadata$U512 extends Null {
  toString (): string {
    return 'Metadata$U512';
  }
}
export class Metadata$H160 extends Null {
  toString (): string {
    return 'Metadata$H160';
  }
}
export class Metadata$H256 extends Null {
  toString (): string {
    return 'Metadata$H256';
  }
}
export class Metadata$H512 extends Null {
  toString (): string {
    return 'Metadata$H512';
  }
}

export class FieldName$Unnamed extends U16 {}
export class FieldName$Named extends Text {}

export class FieldName extends EnumType<FieldName$Unnamed | FieldName$Named> {
  constructor (value: any) {
    super({
      FieldName$Unnamed,
      FieldName$Named
    }, value);
  }
}

export class FieldMetadata extends Struct {
  constructor (value: any) {
    super({
      name: FieldName,
      ty: MetadataName
    }, value);
  }
}

export class EnumVariantMetadata extends Struct {
  constructor (value: any) {
    super({
      name: Text,
      index: U16,
      fields: Vector.with(FieldMetadata)
    }, value);
  }
}

export class TypeMetadataKind$Primitive extends Null {}
export class TypeMetadataKind$Struct extends Vector.with(FieldMetadata) {}
export class TypeMetadataKind$Enum extends Vector.with(EnumVariantMetadata) {}

export class TypeMetadataKind extends EnumType<TypeMetadataKind$Primitive | TypeMetadataKind$Struct | TypeMetadataKind$Enum> {
  constructor (value: any) {
    super({
      TypeMetadataKind$Primitive,
      TypeMetadataKind$Struct,
      TypeMetadataKind$Enum
    }, value);
  }
}

export class TypeMetadata extends Struct {
  constructor (value?: any) {
    super({
      name: MetadataName,
      kind: TypeMetadataKind
    }, value);
  }

  get name (): MetadataName {
    return this.get('name') as MetadataName;
  }

  get kind (): TypeMetadataKind {
    return this.get('kind') as TypeMetadataKind;
  }
}

export default class MetadataRegistry extends Vector.with(TypeMetadata) {
}
