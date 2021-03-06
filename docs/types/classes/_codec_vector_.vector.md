

*__name__*: Vector

*__description__*: This manages codec arrays. Internally it keeps track of the length (as decoded) and allows construction with the passed `Type` in the constructor. It is an extension to Array, providing specific encoding/decoding on top of the base type.

# Type parameters
#### T :  [Codec](../interfaces/_types_.codec.md)
# Hierarchy

 `Array`<`T`>

**↳ Vector**

↳  [Extrinsics](_extrinsics_.extrinsics.md)

↳  [AuthoritiesChange](_digest_.authoritieschange.md)

↳  [Broadcast](_extrinsicstatus_.broadcast.md)

# Implements

* [Codec](../interfaces/_types_.codec.md)

# Indexable

\[n: `number`\]:&nbsp;`T`
# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new Vector**(Type: *[Constructor](../modules/_types_.md#constructor)<`T`>*, value?: *[Vector](_codec_vector_.vector.md)<`any`> | `Uint8Array` | `string` | `Array`<`any`>*): [Vector](_codec_vector_.vector.md)

*Defined in [codec/Vector.ts:22](https://github.com/polkadot-js/api/blob/ea7ecec/packages/types/src/codec/Vector.ts#L22)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| Type | [Constructor](../modules/_types_.md#constructor)<`T`> | - |
| `Default value` value | [Vector](_codec_vector_.vector.md)<`any`> | `Uint8Array` | `string` | `Array`<`any`> |  [] as Array&lt;any&gt; |

**Returns:** [Vector](_codec_vector_.vector.md)

___

# Properties

<a id="array"></a>

## `<Static>` Array

**● Array**: *`ArrayConstructor`*

*Defined in /home/travis/build/polkadot-js/api/node_modules/typescript/lib/lib.es5.d.ts:1358*

___

# Accessors

<a id="type"></a>

##  Type

getType(): `string`

*Defined in [codec/Vector.ts:56](https://github.com/polkadot-js/api/blob/ea7ecec/packages/types/src/codec/Vector.ts#L56)*

**Returns:** `string`

___
<a id="encodedlength"></a>

##  encodedLength

getencodedLength(): `number`

*Defined in [codec/Vector.ts:63](https://github.com/polkadot-js/api/blob/ea7ecec/packages/types/src/codec/Vector.ts#L63)*

*__description__*: The length of the value when encoded as a Uint8Array

**Returns:** `number`

___
<a id="length"></a>

##  length

getlength(): `number`

*Overrides Array.length*

*Defined in [codec/Vector.ts:72](https://github.com/polkadot-js/api/blob/ea7ecec/packages/types/src/codec/Vector.ts#L72)*

*__description__*: The length of the value

**Returns:** `number`

___

# Methods

<a id="eq"></a>

##  eq

▸ **eq**(other?: *`any`*): `boolean`

*Implementation of [Codec](../interfaces/_types_.codec.md).[eq](../interfaces/_types_.codec.md#eq)*

*Defined in [codec/Vector.ts:80](https://github.com/polkadot-js/api/blob/ea7ecec/packages/types/src/codec/Vector.ts#L80)*

*__description__*: Compares the value of the input to see if there is a match

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` other | `any` |

**Returns:** `boolean`

___
<a id="filter"></a>

##  filter

▸ **filter**(callbackfn: *`function`*, thisArg?: *`any`*): `Array`<`T`>

*Overrides Array.filter*

*Defined in [codec/Vector.ts:145](https://github.com/polkadot-js/api/blob/ea7ecec/packages/types/src/codec/Vector.ts#L145)*

*__description__*: Filters the array with the callback

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function` |  The filter function |
| `Optional` thisArg | `any` |  The \`this\` object to apply the result to |

**Returns:** `Array`<`T`>

___
<a id="map"></a>

##  map

▸ **map**<`U`>(callbackfn: *`function`*, thisArg?: *`any`*): `Array`<`U`>

*Overrides Array.map*

*Defined in [codec/Vector.ts:154](https://github.com/polkadot-js/api/blob/ea7ecec/packages/types/src/codec/Vector.ts#L154)*

*__description__*: Maps the array with the callback

**Type parameters:**

#### U 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| callbackfn | `function` |  The mapping function |
| `Optional` thisArg | `any` |  The \`this\` onject to apply the result to |

**Returns:** `Array`<`U`>

___
<a id="toarray"></a>

##  toArray

▸ **toArray**(): `Array`<`T`>

*Defined in [codec/Vector.ts:87](https://github.com/polkadot-js/api/blob/ea7ecec/packages/types/src/codec/Vector.ts#L87)*

*__description__*: Converts the Object to an standard JavaScript Array

**Returns:** `Array`<`T`>

___
<a id="tohex"></a>

##  toHex

▸ **toHex**(): `string`

*Implementation of [Codec](../interfaces/_types_.codec.md).[toHex](../interfaces/_types_.codec.md#tohex)*

*Defined in [codec/Vector.ts:94](https://github.com/polkadot-js/api/blob/ea7ecec/packages/types/src/codec/Vector.ts#L94)*

*__description__*: Returns a hex string representation of the value

**Returns:** `string`

___
<a id="tojson"></a>

##  toJSON

▸ **toJSON**(): `any`

*Implementation of [Codec](../interfaces/_types_.codec.md).[toJSON](../interfaces/_types_.codec.md#tojson)*

*Defined in [codec/Vector.ts:101](https://github.com/polkadot-js/api/blob/ea7ecec/packages/types/src/codec/Vector.ts#L101)*

*__description__*: Converts the Object to JSON, typically used for RPC transfers

**Returns:** `any`

___
<a id="tostring"></a>

##  toString

▸ **toString**(): `string`

*Implementation of [Codec](../interfaces/_types_.codec.md).[toString](../interfaces/_types_.codec.md#tostring)*

*Overrides Array.toString*

*Defined in [codec/Vector.ts:110](https://github.com/polkadot-js/api/blob/ea7ecec/packages/types/src/codec/Vector.ts#L110)*

*__description__*: Returns the string representation of the value

**Returns:** `string`

___
<a id="tou8a"></a>

##  toU8a

▸ **toU8a**(isBare?: *`undefined` | `false` | `true`*): `Uint8Array`

*Implementation of [Codec](../interfaces/_types_.codec.md).[toU8a](../interfaces/_types_.codec.md#tou8a)*

*Defined in [codec/Vector.ts:123](https://github.com/polkadot-js/api/blob/ea7ecec/packages/types/src/codec/Vector.ts#L123)*

*__description__*: Encodes the value as a Uint8Array as per the parity-codec specifications

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` isBare | `undefined` | `false` | `true` |  true when the value has none of the type-specific prefixes (internal) |

**Returns:** `Uint8Array`

___
<a id="decodevector"></a>

## `<Static>` decodeVector

▸ **decodeVector**<`T`>(Type: *[Constructor](../modules/_types_.md#constructor)<`T`>*, value: *[Vector](_codec_vector_.vector.md)<`any`> | `Uint8Array` | `string` | `Array`<`any`>*): `Array`<`T`>

*Defined in [codec/Vector.ts:32](https://github.com/polkadot-js/api/blob/ea7ecec/packages/types/src/codec/Vector.ts#L32)*

**Type parameters:**

#### T :  [Codec](../interfaces/_types_.codec.md)
**Parameters:**

| Name | Type |
| ------ | ------ |
| Type | [Constructor](../modules/_types_.md#constructor)<`T`> |
| value | [Vector](_codec_vector_.vector.md)<`any`> | `Uint8Array` | `string` | `Array`<`any`> |

**Returns:** `Array`<`T`>

___
<a id="with"></a>

## `<Static>` with

▸ **with**<`O`>(Type: *[Constructor](../modules/_types_.md#constructor)<`O`>*): [Constructor](../modules/_types_.md#constructor)<[Vector](_codec_vector_.vector.md)<`O`>>

*Defined in [codec/Vector.ts:48](https://github.com/polkadot-js/api/blob/ea7ecec/packages/types/src/codec/Vector.ts#L48)*

**Type parameters:**

#### O :  [Codec](../interfaces/_types_.codec.md)
**Parameters:**

| Name | Type |
| ------ | ------ |
| Type | [Constructor](../modules/_types_.md#constructor)<`O`> |

**Returns:** [Constructor](../modules/_types_.md#constructor)<[Vector](_codec_vector_.vector.md)<`O`>>

___

