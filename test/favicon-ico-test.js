// tag-test.js -- Test the /tag/:tag endpoint
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
const fetch = require('node-fetch')

const Server = require('./server')
const env = require('./env')

vows.describe('favicon.ico endpoint')
  .addBatch(Server.batch(env, {
    'and we fetch the favicon.ico file': {
      topic () {
        const url = `http://${env.TAGS_PUB_HOSTNAME}:${env.TAGS_PUB_PORT}/favicon.ico`
        return fetch(url)
      },
      'it works': (err, res) => {
        assert.ifError(err)
        assert.isObject(res)
        assert.equal(res.status, 200)
      }
    }
  }))
  .export(module)
