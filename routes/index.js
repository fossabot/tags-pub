const {join} = require('path')
const express = require('express')
const router = express.Router()

const AS2 = 'https://www.w3.org/ns/activitystreams'

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(join(__dirname, '..', 'public', 'index.html'))
})

/* GET tag */
router.get('/tag/:tag', (req, res, next) => {
  const {tag} = req.params
  const obj = {
    '@context': AS2,
    type: 'Hashtag',
    id: req.app.makeURL(`/tag/${tag}`),
    name: `#${tag}`
  }
  if (req.accepts('application/activity+json')) {
    res.type('application/activity+json')
    res.send(Buffer.from(JSON.stringify(obj), 'utf8'))
  } else if (req.accepts('application/ld+json')) {
    res.type('application/ld+json; profile="https://www.w3.org/ns/activitystreams"')
    res.send(Buffer.from(JSON.stringify(obj), 'utf8'))
  } else if (req.accepts('application/json')) {
    res.json(obj)
  } else {
    res.sendStatus(406)
  }
})

module.exports = router
