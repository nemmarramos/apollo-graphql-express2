import _debug from 'debug'

import app from './src/server'

const debug = _debug('api:server')

const port = process.env.PORT || 4000;
const host = process.env.PORT || '0.0.0.0';

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