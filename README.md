
<h1 align="center">@appmax-api/sdk</h1>

<p align="center">Unofficial NodeJS SDK for consuming the <a href="https://appmax.com.br" target="_blank">Appmax</a> API.</p>

<div align="center">
  <div style="width: fit-content; display: flex; align-items: flex-start; gap: 4px;">
    <img alt="NPM License" src="https://img.shields.io/npm/l/@appmax-api/sdk">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dw/@appmax-api/sdk">
    <a href="https://npmjs.com/package/@appmax-api/sdk">
      <img alt="NPM Version" src="https://img.shields.io/npm/v/@appmax-api/sdk">
    </a>
  </div>
</div>

## Installation

```bash
npm install @appmax-api/sdk
// or
yarn add @appmax-api/sdk
// or
pnpm add @appmax-api/sdk
```

## Getting Started

```ts
import { AppmaxAPI } from "@appmax-api/sdk"
// const { AppmaxAPI } = require("@appmax-api/sdk")

const api = new AppmaxAPI("Access Token")
```

## Features

- **Testing mode** (use homolog.sandboxappmax url)

  ```ts
    new AppmaxAPI("Access Token", { testMode: true })
  ```

- **Create customers** (/customer)

  ```ts
    api.customers.create()
  ```

- **Create orders** (/order)

  ```ts
    api.orders.create()
  ```

- **Initiate payments** (/payment/*)

  ```ts
    api.payments.create()
  ```

- **Tokenize cards** (/tokenize/card)

  ```ts
    api.payments.tokenize()
  ```

- **Refund orders** (/refund)

  ```ts
    api.orders.refund()
  ```

## API Documentation

Check the [official API documentation](https://docs.appmax.com.br/api/) for more information about their service.

## Contributing

Feel free to contribute with suggestions or bug reports at our [GitHub repository](https://github.com/joaotonaco/appmax-api-sdk).

## Authors

- [@joaotonaco](https://github.com/joaotonaco)