import app from './src/server'
import _debug from 'debug'

const debug = _debug('api:server')

const port = process.env.PORT || 4000;
app.listen(port, () => {
  debug(`Starting server`)
  console.log(`
    Server Started
    =============================
    Env  : ${process.env.NODE_ENV}
    Port : ${port}
    -----------------------------
   `)
})