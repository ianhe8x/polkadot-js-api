

# Type aliases

<a id="blockdecoded"></a>

##  BlockDecoded

**Ƭ BlockDecoded**: *`object`*

*Defined in [type-params/src/types.d.ts:45](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L45)*

#### Type declaration

___
<a id="blockextrinsicdecoded"></a>

##  BlockExtrinsicDecoded

**Ƭ BlockExtrinsicDecoded**: *`object`*

*Defined in [type-params/src/types.d.ts:28](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L28)*

#### Type declaration

___
<a id="blockjustificationdecoded"></a>

##  BlockJustificationDecoded

**Ƭ BlockJustificationDecoded**: *`object`*

*Defined in [type-params/src/types.d.ts:36](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L36)*

#### Type declaration

___
<a id="createitem"></a>

##  CreateItem

**Ƭ CreateItem**: *`function`*

*Defined in [type-params/src/types.d.ts:127](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L127)*

#### Type declaration
▸(options: *[CreateItemOptions](_type_params_src_types_d_.md#createitemoptions)*): [SectionItem](_type_params_src_types_d_.md#sectionitem)<`T`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| options | [CreateItemOptions](_type_params_src_types_d_.md#createitemoptions) |

**Returns:** [SectionItem](_type_params_src_types_d_.md#sectionitem)<`T`>

___
<a id="createitemoptions"></a>

##  CreateItemOptions

**Ƭ CreateItemOptions**: *`object`*

*Defined in [type-params/src/types.d.ts:111](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L111)*

#### Type declaration

___
<a id="createitemoptionsmap"></a>

##  CreateItemOptionsMap

**Ƭ CreateItemOptionsMap**: *`object`*

*Defined in [type-params/src/types.d.ts:123](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L123)*

#### Type declaration

[index: `string`]: [CreateItemOptions](_type_params_src_types_d_.md#createitemoptions)

___
<a id="createitems"></a>

##  CreateItems

**Ƭ CreateItems**: *`function`*

*Defined in [type-params/src/types.d.ts:129](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L129)*

#### Type declaration
▸(name: *`string`*, index?: * `undefined` &#124; `number`*): [CreateItem](_type_params_src_types_d_.md#createitem)<`T`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| name | `string` |
| `Optional` index |  `undefined` &#124; `number`|

**Returns:** [CreateItem](_type_params_src_types_d_.md#createitem)<`T`>

___
<a id="createsection"></a>

##  CreateSection

**Ƭ CreateSection**: *`function`*

*Defined in [type-params/src/types.d.ts:143](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L143)*

#### Type declaration
▸(options: *[CreateSectionOptions](_type_params_src_types_d_.md#createsectionoptions)<`T`, `Priv`, `Pub`>*): [Section](_type_params_src_types_d_.md#section)<`T`, `Priv`, `Pub`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| options | [CreateSectionOptions](_type_params_src_types_d_.md#createsectionoptions)<`T`, `Priv`, `Pub`> |

**Returns:** [Section](_type_params_src_types_d_.md#section)<`T`, `Priv`, `Pub`>

___
<a id="createsectionoptions"></a>

##  CreateSectionOptions

**Ƭ CreateSectionOptions**: * [CreateSectionOptions$Only](_type_params_src_types_d_.md#createsectionoptions_only)<`T`, `Priv`, `Pub`> &#124; [CreateSectionOptions$Fn](_type_params_src_types_d_.md#createsectionoptions_fn)<`T`, `Priv`, `Pub`>
*

*Defined in [type-params/src/types.d.ts:141](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L141)*

___
<a id="createsectionoptions_fn"></a>

##  CreateSectionOptions$Fn

**Ƭ CreateSectionOptions$Fn**: *`function`*

*Defined in [type-params/src/types.d.ts:139](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L139)*

#### Type declaration
▸(method: *[CreateItems](_type_params_src_types_d_.md#createitems)<`T`>*): [CreateSectionOptions$Only](_type_params_src_types_d_.md#createsectionoptions_only)<`T`, `Priv`, `Pub`>

**Parameters:**

| Param | Type |
| ------ | ------ |
| method | [CreateItems](_type_params_src_types_d_.md#createitems)<`T`> |

**Returns:** [CreateSectionOptions$Only](_type_params_src_types_d_.md#createsectionoptions_only)<`T`, `Priv`, `Pub`>

___
<a id="createsectionoptions_only"></a>

##  CreateSectionOptions$Only

**Ƭ CreateSectionOptions$Only**: *`object`*

*Defined in [type-params/src/types.d.ts:131](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L131)*

#### Type declaration

___
<a id="encodingversions"></a>

##  EncodingVersions

**Ƭ EncodingVersions**: * "poc-1" &#124; "latest"
*

*Defined in [type-params/src/types.d.ts:11](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L11)*

___
<a id="extrinsicdecoded"></a>

##  ExtrinsicDecoded

**Ƭ ExtrinsicDecoded**: *`object`*

*Defined in [type-params/src/types.d.ts:23](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L23)*

#### Type declaration

___
<a id="keyvalue"></a>

##  KeyValue

**Ƭ KeyValue**: *`object`*

*Defined in [type-params/src/types.d.ts:51](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L51)*

#### Type declaration

___
<a id="param"></a>

##  Param

**Ƭ Param**: * [Param$Options](_type_params_src_types_d_.md#param_options) & `object`
*

*Defined in [type-params/src/types.d.ts:71](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L71)*

___
<a id="param_decoded"></a>

##  Param$Decoded

**Ƭ Param$Decoded**: *`object`*

*Defined in [type-params/src/types.d.ts:62](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L62)*

#### Type declaration

___
<a id="param_options"></a>

##  Param$Options

**Ƭ Param$Options**: *`object`*

*Defined in [type-params/src/types.d.ts:67](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L67)*

#### Type declaration

___
<a id="param_type"></a>

##  Param$Type

**Ƭ Param$Type**: * "AccountId" &#124; "AccountIndex" &#124; "Balance" &#124; "BlockNumber" &#124; "bool" &#124; "Bytes" &#124; "Call" &#124; "CandidateReceipt" &#124; "Code" &#124; "Digest" &#124; "Gas" &#124; "Hash" &#124; "Header" &#124; "KeyValue" &#124; "MisbehaviorReport" &#124; "ParachainId" &#124; "PrendingExtrinsics" &#124; "PropIndex" &#124; "Proposal" &#124; "ReferendumIndex" &#124; "SessionKey" &#124; "Signature" &#124; "SignedBlock" &#124; "StorageKey" &#124; "StorageKeyValue" &#124; "StorageResult" &#124; "StorageResultSet" &#124; "String" &#124; "Timestamp" &#124; "u32" &#124; "u64" &#124; "u128" &#124; "VoteIndex" &#124; "VoteThreshold"
*

*Defined in [type-params/src/types.d.ts:17](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L17)*

___
<a id="param_type_array"></a>

##  Param$Type$Array

**Ƭ Param$Type$Array**: *`Array`< [Param$Type](_type_params_src_types_d_.md#param_type) &#124; `Array`< [Param$Type](_type_params_src_types_d_.md#param_type) &#124; `Array`<[Param$Type](_type_params_src_types_d_.md#param_type)>>>*

*Defined in [type-params/src/types.d.ts:19](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L19)*

___
<a id="param_types"></a>

##  Param$Types

**Ƭ Param$Types**: * [Param$Type](_type_params_src_types_d_.md#param_type) &#124; [Param$Type$Array](_type_params_src_types_d_.md#param_type_array)
*

*Defined in [type-params/src/types.d.ts:21](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L21)*

___
<a id="param_value"></a>

##  Param$Value

**Ƭ Param$Value**: * [Digest](_type_primitives_src_digest_d_.md#digest) &#124; [Header](_type_primitives_src_header_d_.md#header) &#124; [KeyValue](_type_params_src_types_d_.md#keyvalue) &#124; [MisbehaviorReport](_type_primitives_src_misbehavior_d_.md#misbehaviorreport) &#124; [ExtrinsicDecoded](_type_params_src_types_d_.md#extrinsicdecoded) &#124; `BN` &#124; `Date` &#124; `Uint8Array` &#124; `boolean` &#124; `number` &#124; `string` &#124; `null`
*

*Defined in [type-params/src/types.d.ts:56](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L56)*

___
<a id="param_value_array"></a>

##  Param$Value$Array

**Ƭ Param$Value$Array**: *`Array`< [Param$Value](_type_params_src_types_d_.md#param_value) &#124; `Array`< [Param$Value](_type_params_src_types_d_.md#param_value) &#124; `Array`<[Param$Value](_type_params_src_types_d_.md#param_value)>>>*

*Defined in [type-params/src/types.d.ts:58](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L58)*

___
<a id="param_values"></a>

##  Param$Values

**Ƭ Param$Values**: * [Param$Value](_type_params_src_types_d_.md#param_value) &#124; [Param$Value$Array](_type_params_src_types_d_.md#param_value_array)
*

*Defined in [type-params/src/types.d.ts:60](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L60)*

___
<a id="params"></a>

##  Params

**Ƭ Params**: *`Array`<[Param](_type_params_src_types_d_.md#param)>*

*Defined in [type-params/src/types.d.ts:76](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L76)*

___
<a id="section"></a>

##  Section

**Ƭ Section**: *`object`*

*Defined in [type-params/src/types.d.ts:99](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L99)*

#### Type declaration

___
<a id="sectionitem"></a>

##  SectionItem

**Ƭ SectionItem**: *`object`*

*Defined in [type-params/src/types.d.ts:79](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L79)*

#### Type declaration

___
<a id="sectionitems"></a>

##  SectionItems

**Ƭ SectionItems**: *`object`*

*Defined in [type-params/src/types.d.ts:95](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L95)*

#### Type declaration

___
<a id="sections"></a>

##  Sections

**Ƭ Sections**: *`Map`<`T`, [Section](_type_params_src_types_d_.md#section)<`T`, `Priv`, `Pub`>>*

*Defined in [type-params/src/types.d.ts:109](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/types.d.ts#L109)*

___

