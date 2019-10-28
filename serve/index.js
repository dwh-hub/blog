const express = require('express')

const app = express()

// 生成用户token的密钥
app.set('secret', 'dahuayuan')

app.use(require('cors')())
app.use(express.json())
// 静态文件托管路由
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
  console.log("http://loaclhost:3000")
})