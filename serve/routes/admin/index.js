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
  const router = express.Router({
    mergeParams: true // 合并url参数，使route能获取到父级的参数
  })
  // 增
  router.post('/add', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(success(model, '添加成功'))
  })
  // 删
  router.post('/delete', async (req, res) => {
    if (!req.body._id) {
      return res.send(fail(500, '缺失参数_id'))
    }
    await req.Model.remove({_id: req.body._id})
    res.send(success(null, '删除成功'))
  })
  // 改
  router.post('/edit', async (req, res) => {
    if (!req.body._id) {
      return res.send(fail(500, '缺失参数_id'))
    }
    await req.Model.findByIdAndUpdate(req.body._id, req.body)
    res.send(success(null, '修改成功'))
  })
  // 查
  router.get('/:id', async (req, res) => {
    if (!req.params.id) {
      return res.send(fail(500, '缺失参数_id'))
    }
    const item = await req.Model.findById({_id: req.params.id})
    res.send(success(item))
  })
  // 列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Tag') {
      queryOptions.populate = 'parent'
    }
    if (req.Model.modelName === 'Article') {
      const Tag = require(`../../models/Tag`)
      queryOptions.populate = 'tag'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send(success(items))
  })
  app.use('/admin/api/reset/:resoure', async(req, res, next) => {
    const ModelName = require('inflection').classify(req.params.resoure)
    req.Model = require(`../../models/${ModelName}`)
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  
  app.post('/admin/api/upload', upload.single('file'), async(req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(success(file.url))
  })

  app.post('/admin/api/login', async(req, res) => {
    const { usernname, password } = req.body
    // 1. 根据用户名找用户
    const User = require('../../models/User')
    const user = await User.findOne({ usernname }).select('+password')
    if (!user) {
      return fail(500, '用户不存在')
    }
    // 2. 校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      return fail(500, '密码错误')
    }
    // 3. 返回token
    const jwt = require('jsonwebtoken')
    const token = jwt.sign({ _id: user._id }, app.get('secret'))
    res.send(success(token))
  })
}