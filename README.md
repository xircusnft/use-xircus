# use-xircus

> Xircus Hook for Custom Marketplace UIs

[![NPM](https://img.shields.io/npm/v/use-xircus.svg)](https://www.npmjs.com/package/use-xircus) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

- Global State Management
- Graph Connection
- Xircus Authentication
- Smart Contract Calls


## Install

```bash
npm install --save use-xircus
```

## Usage

```jsx
import React, { Component } from 'react'

import { useMyHook } from 'use-xircus'

const Example = () => {
  const example = useMyHook()
  return (
    <div>{example}</div>
  )
}
```

## License

MIT © [xircusteam](https://github.com/xircusteam)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
