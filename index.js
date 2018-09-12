import _debug from 'debug'

import app from './src/server'
import { host, port } from 'config/env'

const debug = _debug('api:server')

app.listen(port, host, () => {
  debug(`Starting server`)
  console.log(`
    Server Started
    =============================
    Env  : ${process.env.NODE_ENV}
    Host : ${host}
    Port : ${port}
    -----------------------------
   `)
})