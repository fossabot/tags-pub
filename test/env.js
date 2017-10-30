// env.js -- environment variables for testing tags.pub server
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

const env = {
  TAGS_PUB_HOSTNAME: 'localhost',
  TAGS_PUB_PORT: '8081',
  TAGS_PUB_URL_ROOT: 'https://tags.pub',
  DEBUG: process.env.DEBUG
}

module.exports = env
