import http from 'http'
import { env, mongo, port, ip, apiRoot } from '../config'
import mongoose from '../services/mongoose'
import express from '../services/express'
import api from '../api'
import cluster from 'cluster'
import { cpus } from 'os'

const app = express(apiRoot, api, 'main')
const server = http.createServer(app)
if (mongo.uri) {
  mongoose.connect(mongo.uri)
}
mongoose.Promise = Promise

// console.log({ env, mongo, port, ip, apiRoot });

setImmediate(() => {
  let threadNumber = cpus().length
  if (threadNumber > 2) threadNumber = 2
  // console.log('threadNumber', threadNumber)
  if (cluster.isPrimary && env === 'production') {
    console.log(`Primary ${process.pid} is running`)
    // Fork workers.
    for (let i = 0; i < threadNumber; i++) {
      setTimeout(() => {
        cluster.fork()
      }, i + 200)
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`)
      cluster.fork()
    })
  } else {
    server.listen(port, ip, () => {
      console.log('Express server listening on http://%s:%d, in %s mode', ip, port, env)
    })
    console.log(`Worker ${process.pid} started`)
  }
})

export default app
