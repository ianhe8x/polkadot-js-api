

# Functions

<a id="signature"></a>

##  signature

▸ **signature**<`T`>(__namedParameters: *`object`*): `string`

*Defined in [type-params/src/signature.ts:20](https://github.com/polkadot-js/api/blob/ef78f2a/packages/type-params/src/signature.ts#L20)*

*__name__*: signature

*__signature__*: jsonrpcSignature (method: InterfaceMethodDefinition): string

*__summary__*: Returns a string representation of the method with inputs and outputs.

*__description__*: Formats the name, inputs and outputs into a human-readable string. This contains the input parameter names input types and output type.

*__example__*: import signature from '@polkadot/params/signature';

signature({ name: 'test\_method', params: \[ { name: 'dest', type: 'Address' } \], type: 'Address' }); // => test\_method (dest: Address): Address

**Type parameters:**

#### T 
**Parameters:**

| Param | Type |
| ------ | ------ |
| __namedParameters | `object` |

**Returns:** `string`

___

