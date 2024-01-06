# Twitter Clone API
```js
// utils/generation.js
import crypto from 'node:crypto'
import fs from 'node:fs'

const secret = `JWT_SECRET_KEY=${crypto.randomBytes(64).toString('hex')}\n`

try {
  fs.appendFileSync('.env', secret)
} catch (err) {
  console.error(err.message)
}
```
```json
// package.json
"generate:secret": "babel-node src/utils/gensecret.js"
```