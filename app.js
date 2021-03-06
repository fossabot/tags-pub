const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const index = require('./routes/index')

module.exports = (argv) => {
  const app = express()

  app.argv = argv

  app.makeURL = function (rel) {
    return `${this.argv.root}${rel}`
  }

  app.disable('x-powered-by')

  app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')))
  app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist')))
  app.use(express.static(path.join(__dirname, 'public')))

  app.use('/', index)

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // error handler
  app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
  })

  return app
}
