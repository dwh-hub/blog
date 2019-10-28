function success(data, message) {
  return {
    code: 200,
    message: message || '',
    data: data
  }
}

function fail(code, message) {
  return {
    code: code,
    message: message || '',
    data: null
  }
}

module.exports = app => {
  const express = require('express');
  const router = express.Router()
  const Article = require('../../models/Article')
  const Tag = require('../../models/Tag')


  router.get('/article/list', async (req, res) => {
    const list = await Article.find().populate('tag').limit(10)
    res.send(success(list))
  })

  router.get('/article/:id', async (req, res) => {
    const article = await Article.findById({_id: req.params.id})
    res.send(success(article))
  })

  router.get('/tag/list', async (req, res) => {
    const list = await Tag.find().populate('parent').limit(10)
    res.send(success(list))
  })

  app.use('/web/api', router)

  // 错误处理
  // app.use(async (err, req, res, next) => {
  //     res.status(200).send(fail(err.statusCode, err.message))
  // })
}