const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String},
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Tag' }
})

module.exports = mongoose.model('Tag', schema)