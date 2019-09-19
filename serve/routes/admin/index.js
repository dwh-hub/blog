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
  const express = require('express')
  const router = express.Router()
  const Tag = require('../../models/Tag')
  // 添加tag
  router.post('/tag/add', async (req, res) => {
    if (!req.body.name) {
      return res.send(fail(500, '缺失参数name'))
    }
    const model = await Tag.create(req.body)
    res.send(success(model, '添加成功'))
  })
  // 删除tag
  router.post('/tag/delete', async (req, res) => {
    if (!req.body._id) {
      return res.send(fail(500, '缺失参数_id'))
    }
    await Tag.remove({_id: req.body._id})
    res.send(success(null, '删除成功'))
  })
  // 修改tag
  router.post('/tag/edit', async (req, res) => {
    if (!req.body._id) {
      return res.send(fail(500, '缺失参数_id'))
    }
    if (!req.body.name) {
      return res.send(fail(500, '缺失参数name'))
    }
    await Tag.update({_id: req.body._id},{name: req.body.name})
    res.send(success(null, '修改成功'))
  })
  // tag列表
  router.get('/tagList', async (req, res) => {
    const items = await Tag.find().limit(10)
    res.send(success(items))
  })
  app.use('/admin/api', router)
}