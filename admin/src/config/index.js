const baseUrl = 'http://127.0.0.1:7001/admin/'

const servicePath = {
  login: baseUrl + 'login', // 登录接口
  getTypeInfo: baseUrl + 'getTypeInfo', // 获取文章类型信息接口
  addArticle: baseUrl + 'addArticle', // 添加文章信息接口
  updateArticle: baseUrl + 'updateArticle', // 修改文章信息接口
}

export default servicePath