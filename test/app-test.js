// app-test.js -- Test that the app can start and stop
//
// Copyright 2017 Evan Prodromou <legal@imfn.me>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const vows = require('perjury')
const {assert} = vows

const Server = require('./server')
const env = require('./env')

vows.describe('app start and stop')
  .addBatch({
    'When we start the app': {
      async topic() {
        const server = new Server(env)
        await server.start()
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
  })
  .export(module)
