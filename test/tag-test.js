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

const AS2 = 'https://www.w3.org/ns/activitystreams'
const ACCEPT = 'application/activity+json;1.0,application/ld+json;0.5,application/json;0.1'
const HEADERS = {'Accept': ACCEPT}

vows.describe('/tag/:tag endpoint')
  .addBatch(Server.batch(env, {
    'and we fetch a tag with default accepts': {
      topic () {
        const url = `http://${env.TAGS_PUB_HOSTNAME}:${env.TAGS_PUB_PORT}/tag/foo`
        return fetch(url, {'headers': HEADERS})
      },
      'it works': (err, res) => {
        assert.ifError(err)
        assert.isObject(res)
        assert.equal(res.status, 200)
      },
      'it has the right MIME type': (err, res) => {
        assert.ifError(err)
        assert.isObject(res)
        assert.equal(res.status, 200)
        assert.ok(res.headers.has('Content-Type'))
        assert.equal(res.headers.get('Content-Type'), 'application/activity+json')
      },
      'and we get its JSON contents': {
        topic (res) {
          return res.json()
        },
        'it works': (err, json) => {
          assert.ifError(err)
          assert.isObject(json)
          assert.isString(json['@context'])
          assert.equal(json['@context'], AS2)
          assert.isString(json.type)
          assert.equal(json.type, 'Hashtag')
          assert.isString(json.id)
          assert.equal(json.id, `${env.TAGS_PUB_URL_ROOT}/tag/foo`)
          assert.isString(json.name)
          assert.equal(json.name, '#foo')
        }
      },
      'and we fetch a tag with application/ld+json': {
        topic () {
          const url = `http://${env.TAGS_PUB_HOSTNAME}:${env.TAGS_PUB_PORT}/tag/foo`
          return fetch(url, {'headers': {'Accept': 'application/ld+json'}})
        },
        'it has the right MIME type': (err, res) => {
          assert.ifError(err)
          assert.isObject(res)
          assert.equal(res.status, 200)
          assert.ok(res.headers.has('Content-Type'))
          assert.equal(res.headers.get('Content-Type'), 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"')
        }
      },
      'and we fetch a tag with application/json': {
        topic () {
          const url = `http://${env.TAGS_PUB_HOSTNAME}:${env.TAGS_PUB_PORT}/tag/foo`
          return fetch(url, {'headers': {'Accept': 'application/json'}})
        },
        'it has the right MIME type': (err, res) => {
          assert.ifError(err)
          assert.isObject(res)
          assert.equal(res.status, 200)
          assert.ok(res.headers.has('Content-Type'))
          assert.equal(res.headers.get('Content-Type'), 'application/json; charset=utf-8')
        }
      }
    }
  }))
  .export(module)
