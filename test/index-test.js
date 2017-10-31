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
const Browser = require('zombie')

const Server = require('./server')
const env = require('./env')

vows.describe('index page')
  .addBatch(Server.batch(env, {
    'and we create a browser': {
      topic () {
        return new Browser()
      },
      'it works': (err, br) => {
        assert.ifError(err)
        assert.isObject(br)
        assert.instanceOf(br, Browser)
      },
      'and we fetch the home page': {
        async topic (br) {
          const url = `http://${env.TAGS_PUB_HOSTNAME}:${env.TAGS_PUB_PORT}/`
          await br.visit(url)
          return br
        },
        'it works': (err, br) => {
          assert.ifError(err)
          assert.isObject(br)
          assert.instanceOf(br, Browser)
          br.assert.success()
        }
      }
    }
  }))
  .export(module)
