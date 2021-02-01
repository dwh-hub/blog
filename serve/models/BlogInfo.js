const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String }, // 博客昵称
    profile: { type: String }, // 博客个人简介
    avatar: { type: String },
    bgUrl: { type: String },
    bgm: { type: Object }
        //     bgmUrl: "",
        // bgmName: "",
        // bgmSinger: "",
        // bgmCover: "",
})

module.exports = mongoose.model('BlogInfo', schema)