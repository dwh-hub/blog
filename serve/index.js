const express = require('express')

const app = express()

require('./routes/admin')(app)

app.listen(3000, () => {
  console.log("http://loaclhost:3000")
})