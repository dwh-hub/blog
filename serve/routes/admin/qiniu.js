
const qiniu = require('qiniu')
 
// 创建上传凭证
const accessKey = 'zNgNChFG6kRFUre11Muprp6uTCYNxTuNapYgns0K'    // AK 
const secretKey = 'dLbn1MoLAOMQpaLpqn5xiEWv56lFJwe4juqfYcTx'    // SK
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const bucket = "dahuayuan"

const options = {
    scope: bucket,         //对象存储空间名字
    expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const qiniuToken = putPolicy.uploadToken(mac)
 
module.exports = {
    qiniuToken
}
