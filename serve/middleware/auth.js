module.exports = options => {
  const jwt = require('jsonwebtoken')
  const assert = require('http-assert')
  const User = require('../models/User')

  return async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '请先登录')
    // 校验token值 并拿到对应的用户信息
    const { _id } = jwt.verify(token, req.app.get('secret'))
    assert(_id, 401, '请先登录')
    req.user = await User.findById(_id)
    assert(req.user, 401, '请先登录')
    next()
  }
}