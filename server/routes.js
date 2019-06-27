const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()
const resolve = file => path.resolve(__dirname, file)

let indexHtml = fs.readFileSync(resolve('../dist/index.html'), 'utf-8')

router.use((req, res, next) => {
  console.log(`..加载${req.path}完毕..`)
  next()
})

router.get('/', (req, res) => {
  res.send(indexHtml)
})

module.exports = router
