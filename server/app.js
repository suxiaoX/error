const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const resolve = file => path.resolve(__dirname, file)

const server = (path, cache) => express.static(resolve(path))

app.use('/dist', server('../dist'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let middleware = require('./middleware')

app.use('/middleware', middleware)

let routes = require('./routes')
app.use('/', routes)

const port = process.env.PORT || 3033

app.listen(port, () => {
  console.log(`listening: ${port}......`)
})
