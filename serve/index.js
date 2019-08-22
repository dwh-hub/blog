const express = require('express')

const app = express()

require('./plugins/db')(app)
require('./routes/admin')(app)

app.listen(3000, () => {
  console.log("http://loaclhost:3000")
})