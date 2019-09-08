module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const tag = require('../../models/tag')
  router.post('/tag', async(req, res) => {
    const model = await tag.create(req.body)
    res.send(model)
  })
  app.use('/admin/api', router)
}