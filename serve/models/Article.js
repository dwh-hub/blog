const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: { type: String},
  editorType: { type: Number }, // 1 markdown 2 html
  addTime: { type: Date, default: Date.now },
  tag: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Tag' }],
  MDContent: { type: String},
  HTMLContent: { type: String}
})

module.exports = mongoose.model('Article', schema)