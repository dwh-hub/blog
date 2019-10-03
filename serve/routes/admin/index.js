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
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const User = require('../../models/User')
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
    assert(req.body._id, 403, '缺失参数_id')
    await req.Model.remove({_id: req.body._id})
    res.send(success(null, '删除成功'))
  })
  // 改
  router.post('/edit', async (req, res) => {
    assert(req.body._id, 403, '缺失参数_id')
    await req.Model.findByIdAndUpdate(req.body._id, req.body)
    res.send(success(null, '修改成功'))
  })
  // 查
  router.get('/:id', async (req, res) => {
    assert(req.params.id, 403, '缺失参数_id')
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

  // 校验登录中间件
  const authMiddleware =  require('../../middleware/auth')

  app.use('/admin/api/reset/:resoure', authMiddleware(), async(req, res, next) => {
    // 自动require模型中间件
    const ModelName = require('inflection').classify(req.params.resoure)
    req.Model = require(`../../models/${ModelName}`)
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  
  // 上传资源
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async(req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(success(file.url))
  })

  // 登录
  app.post('/admin/api/login', async(req, res) => {
    const { username, password } = req.body
    assert(username, 403, '缺失参数username')
    assert(password, 403, '缺失参数password')
    // 1. 根据用户名找用户
    const user = await User.findOne({ username }).select('+password')
    assert(user, 403, '用户不存在')
    // 2. 校验密码
    const isValid = require('bcryptjs').compareSync(password, user.password)
    assert(isValid, 403, '密码错误')
    // 3. 返回token
    const token = jwt.sign({ _id: user._id }, app.get('secret'))
    res.send(success(token))
  })

  // 错误处理
  app.use(async(err, req, res, next) => {
    res.status(200).send(fail(err.statusCode, err.message))
  })
}