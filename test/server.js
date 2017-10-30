// server.js -- test utility for tags.pub
//
//  Copyright 2017 Evan Prodromou <evan@prodromou.name>
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.

const {join} = require('path')
const {fork} = require('child_process')
const {promisify} = require('util')

const vows = require('perjury')
const {assert} = vows
const waitForPort = promisify(require('wait-for-port'))

class Server {

  constructor (env) {
    this.env = env
    this.path = join(__dirname, '..', 'bin', 'www')
  }

  start () {
    this.child = fork(this.path, [], {env: this.env, silent: true})
    const host = this.env.TAGS_PUB_HOSTNAME || 'localhost'
    const port = parseInt(this.env.TAGS_PUB_PORT, 10)
    return waitForPort(host, port)
  }

  stop () {
    return new Promise((resolve, reject) => {
      this.child.once('close', (code, signal) => {
        if (code !== 0) {
          reject(new Error('child exited with an error'))
        } else {
          resolve(code, signal)
        }
      })
      this.child.once('error', (err) => {
        reject(err)
      })
      this.child.kill()
    })
  }

  static batch (env, rest) {
    let base = {
      'When we start the app': {
        async topic() {
          const server = new Server(env)
          const child = await server.start()
          return server
        },
        'it works': (err, server) => {
          assert.ifError(err)
          assert.isObject(server)
        },
        async teardown(server) {
          assert.isObject(server)
          return server.stop()
        }
      }
    }
    let props = Object.getOwnPropertyNames(rest)
    base['When we start the app'][props[0]] = rest[props[0]]
    return base
  }
}

module.exports = Server
