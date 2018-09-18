

The HTTP Provider allows sending requests using HTTP. it does not support subscriptions so you won´t be able to listen to events such as new blocks or balance changes. It is usually preferrable using the [WsProvider](_api_provider_src_ws_index_.wsprovider.md).
*__example__*: ```javascript
import createApi from '@polkadot/api';
import WsProvider from '@polkadot/api-provider/ws';
const provider = new WsProvider('http://127.0.0.1:9933');
const api = createApi(provider);
```

*__see__*: [WsProvider](_api_provider_src_ws_index_.wsprovider.md)

# Hierarchy

**HttpProvider**

# Implements

* [ProviderInterface](../interfaces/_api_provider_src_types_d_.providerinterface.md)

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new HttpProvider**(endpoint: *`string`*): [HttpProvider](_api_provider_src_http_index_.httpprovider.md)

*Defined in [api-provider/src/http/index.ts:35](https://github.com/polkadot-js/api/blob/ef78f2a/packages/api-provider/src/http/index.ts#L35)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| endpoint | `string` |

**Returns:** [HttpProvider](_api_provider_src_http_index_.httpprovider.md)

___

# Methods

<a id="isconnected"></a>

##  isConnected

▸ **isConnected**(): `boolean`

*Implementation of [ProviderInterface](../interfaces/_api_provider_src_types_d_.providerinterface.md).[isConnected](../interfaces/_api_provider_src_types_d_.providerinterface.md#isconnected)*

*Defined in [api-provider/src/http/index.ts:49](https://github.com/polkadot-js/api/blob/ef78f2a/packages/api-provider/src/http/index.ts#L49)*

Whether the node is connected or not.

**Returns:** `boolean`
true if connected

___
<a id="on"></a>

##  on

▸ **on**(type: *[ProviderInterface$Emitted](../modules/_api_provider_src_types_d_.md#providerinterface_emitted)*, sub: *[ProviderInterface$EmitCb](../modules/_api_provider_src_types_d_.md#providerinterface_emitcb)*): `void`

*Implementation of [ProviderInterface](../interfaces/_api_provider_src_types_d_.providerinterface.md).[on](../interfaces/_api_provider_src_types_d_.providerinterface.md#on)*

*Defined in [api-provider/src/http/index.ts:56](https://github.com/polkadot-js/api/blob/ef78f2a/packages/api-provider/src/http/index.ts#L56)*

Events are not supported with the HttpProvider, see [WsProvider](_api_provider_src_ws_index_.wsprovider.md).

**Parameters:**

| Param | Type |
| ------ | ------ |
| type | [ProviderInterface$Emitted](../modules/_api_provider_src_types_d_.md#providerinterface_emitted) |
| sub | [ProviderInterface$EmitCb](../modules/_api_provider_src_types_d_.md#providerinterface_emitcb) |

**Returns:** `void`

___
<a id="send"></a>

##  send

▸ **send**(method: *`string`*, params: *`Array`<`any`>*): `Promise`<`any`>

*Implementation of [ProviderInterface](../interfaces/_api_provider_src_types_d_.providerinterface.md).[send](../interfaces/_api_provider_src_types_d_.providerinterface.md#send)*

*Defined in [api-provider/src/http/index.ts:60](https://github.com/polkadot-js/api/blob/ef78f2a/packages/api-provider/src/http/index.ts#L60)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| method | `string` |
| params | `Array`<`any`> |

**Returns:** `Promise`<`any`>

___
<a id="subscribe"></a>

##  subscribe

▸ **subscribe**(types: *`string`*, method: *`string`*, params: *`Array`<`any`>*, cb: *[ProviderInterface$Callback](../modules/_api_provider_src_types_d_.md#providerinterface_callback)*): `Promise`<`number`>

*Implementation of [ProviderInterface](../interfaces/_api_provider_src_types_d_.providerinterface.md).[subscribe](../interfaces/_api_provider_src_types_d_.providerinterface.md#subscribe)*

*Defined in [api-provider/src/http/index.ts:82](https://github.com/polkadot-js/api/blob/ef78f2a/packages/api-provider/src/http/index.ts#L82)*

Subscriptions are not supported with the HttpProvider, see [WsProvider](_api_provider_src_ws_index_.wsprovider.md).

**Parameters:**

| Param | Type |
| ------ | ------ |
| types | `string` |
| method | `string` |
| params | `Array`<`any`> |
| cb | [ProviderInterface$Callback](../modules/_api_provider_src_types_d_.md#providerinterface_callback) |

**Returns:** `Promise`<`number`>

___
<a id="unsubscribe"></a>

##  unsubscribe

▸ **unsubscribe**(type: *`string`*, method: *`string`*, id: *`number`*): `Promise`<`boolean`>

*Implementation of [ProviderInterface](../interfaces/_api_provider_src_types_d_.providerinterface.md).[unsubscribe](../interfaces/_api_provider_src_types_d_.providerinterface.md#unsubscribe)*

*Defined in [api-provider/src/http/index.ts:91](https://github.com/polkadot-js/api/blob/ef78f2a/packages/api-provider/src/http/index.ts#L91)*

Subscriptions are not supported with the HttpProvider, see [WsProvider](_api_provider_src_ws_index_.wsprovider.md).

**Parameters:**

| Param | Type |
| ------ | ------ |
| type | `string` |
| method | `string` |
| id | `number` |

**Returns:** `Promise`<`boolean`>

___

