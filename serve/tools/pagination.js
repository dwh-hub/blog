/**
 * 分页处理
 * @param req {Object} node router req属性
 * @param Model {Model} mogoose模型 model.find() 对象
 * 
 * @return {Object} 返回分页接口数据对象
 */
module.exports = async (req, Model) => {
    const pageNo = Number(req.query.pageNo) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const all = await Model
    const items = await Model.skip((pageNo - 1) * pageSize).limit(pageSize)
    let result = {
        total: all.length,
        pageNum: pageNo ? all.length / pageSize : 1,
        list: pageNo ? items : all
    }
    return result
}