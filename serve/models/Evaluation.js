const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    articleId: { type: String },
    nickname: { type: String },
    email: { type: String },
    content: { type: String }
})

module.exports = mongoose.model('Evaluation', schema)