function success(res, data, message) {
  res.send({
    code: 200,
    message: message,
    data: data
  })
}

function fail(code, message) {
  return {
    code: code,
    message: message
  }
}

module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const tag = require('../../models/tag')
  // 添加tag
  router.post('/tag', async (req, res) => {
    if (!req.body.name) {
      return fail(500, '缺失参数name')
    }
    const model = await tag.create(req.body)
    success(res, model, '添加成功')
  })
  // tag列表
  router.get('/tagList', async (req, res) => {
    const items = await tag.find().limit(10)
    res.send(items)
  })
  app.use('/admin/api', router)
}