

*__example__*: ```javascript
import Api from '@polkadot/api';
import WsProvider from '@polkadot/api-provider/ws';

const provider = new WsProvider('http://127.0.0.1:9944');
const api = new Api(provider);
```

# Hierarchy

**Api**

# Implements

* `object`

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new Api**(provider: *[ProviderInterface](../interfaces/_api_provider_src_types_d_.providerinterface.md)*): [Api](_api_src_index_.api.md)

*Defined in [api/src/index.ts:37](https://github.com/polkadot-js/api/blob/ef78f2a/packages/api/src/index.ts#L37)*

*__constructor__*: Default constructor for the Api Object

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| provider | [ProviderInterface](../interfaces/_api_provider_src_types_d_.providerinterface.md) |  An API provider using HTTP or WebSocket |

**Returns:** [Api](_api_src_index_.api.md)

___

# Properties

<a id="author"></a>

##  author

**● author**: *[ApiInterface$Section](../modules/_api_src_types_d_.md#apiinterface_section)*

*Defined in [api/src/index.ts:34](https://github.com/polkadot-js/api/blob/ef78f2a/packages/api/src/index.ts#L34)*

___
<a id="chain"></a>

##  chain

**● chain**: *[ApiInterface$Section](../modules/_api_src_types_d_.md#apiinterface_section)*

*Defined in [api/src/index.ts:35](https://github.com/polkadot-js/api/blob/ef78f2a/packages/api/src/index.ts#L35)*

___
<a id="state"></a>

##  state

**● state**: *[ApiInterface$Section](../modules/_api_src_types_d_.md#apiinterface_section)*

*Defined in [api/src/index.ts:36](https://github.com/polkadot-js/api/blob/ef78f2a/packages/api/src/index.ts#L36)*

___
<a id="system"></a>

##  system

**● system**: *[ApiInterface$Section](../modules/_api_src_types_d_.md#apiinterface_section)*

*Defined in [api/src/index.ts:37](https://github.com/polkadot-js/api/blob/ef78f2a/packages/api/src/index.ts#L37)*

___

