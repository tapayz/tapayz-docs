# Tapayz Introduction

**Tapayz** is a service that enables anyone to easily accept cryptocurrency payments.
You can obtain an **API KEY** through a simple registration process, and reliably use all services with just member creation and invoice requests.

---

## Key Features

- **Extensive Support Environment**
  Fully supports all major web browsers and various development languages and frameworks.

- **Secure Payment Processing**
  Applies the latest security protocols to protect users from security threats that may occur during cryptocurrency payment processes.

- **Scalability and Flexibility**
  Can be easily applied to various service environments such as shopping malls, platforms, and mobile apps with simple API integration.

- **Multi-Cryptocurrency Support**
  Supports various cryptocurrencies including Bitcoin, Ethereum, and Tether (USDT) to provide a wide range of payment experiences for global users.

---

## Service Architecture

The Tapayz payment flow proceeds as follows:

1. Customer requests payment
2. Merchant server calls **Invoice Generation API**
3. Provides payment page including Tapayz wallet address
4. Customer sends cryptocurrency
5. Transaction confirmation on blockchain network
6. Payment completion and Webhook notification

> 🔗 Diagrams will be available later in the [API Integration Guide](./getting-started/).

---

## Supported Networks

- **Tron (TRX, USDT-TRC20)**
- **Ethereum (ETH, USDT-ERC20)**
- **Binance Smart Chain (BNB, BUSD, USDT-BEP20)**
- **Bitcoin (BTC)**

---

## Fee and Settlement Policy

- **Service Fee** : 1% of transaction amount (minimum fee may apply)
- **Settlement Cycle** : Real-time or daily settlement (configurable)
- **Gas Fee Processing** : Variable according to each network policy

---

## Security Guidelines

- **API Key Management** :

  - Issued keys must be stored securely to prevent external exposure.
  - Can be immediately revoked and reissued when necessary

- **Webhook Security** :
  - Webhooks sent from Tapayz can be verified for forgery through **signature** verification
  - Refer to [Webhook Guide](./webhook/) for examples

---

## Use Cases

- **Global customer cryptocurrency payment support** in e-commerce shopping malls
- **Token charging** in online games/platforms
- **B2B cryptocurrency settlement** with overseas partners

---

## Limitations

- Service usage may be restricted in some countries/regions due to legal regulations.
- Delays may occur until payment confirmation during blockchain network congestion.

---

## Next Steps

Now go directly to [Quick Start](./getting-started/) to begin API integration 🚀
