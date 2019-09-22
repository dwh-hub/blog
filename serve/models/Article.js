const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String},
  tag: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag' }],
  content: { type: String}
})

module.exports = mongoose.model('Article', schema)