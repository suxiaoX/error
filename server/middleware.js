const express = require('express')
const fs = require('fs')
const sourceMap = require('source-map')
const path = require('path')
const colors = require('colors')

const router = express.Router()
const { SourceMapConsumer } = sourceMap
const resolve = file => path.resolve(__dirname, file)

router.post('/errorLog/', async (req, res) => {
  let error = req.body
  let url = error.scriptURI

  console.log(colors.yellow('修改之前的报错~~~~~~~~~~~~~start'))
  console.log(error)
  console.log(colors.yellow('修改之前的报错~~~~~~~~~~~~~end'))

  console.log(colors.rainbow('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~分割线~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'))
  if (url) {
    let fileUrl = url.slice(url.indexOf('dist/')) + '.map'
    let consumer = await new SourceMapConsumer(fs.readFileSync(resolve('../' + fileUrl), 'utf8'))

    let result = consumer.originalPositionFor({
      line: error.lineNo,
      column: error.columnNo
    })

    console.log(colors.red('修改之后的报错行列~~~~~~~~~~~start'))
    console.log(result)
    console.log(colors.red('修改之后的报错行列~~~~~~~~~~~end'))
  }
})

module.exports = router