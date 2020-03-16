const baseUrl = 'http://127.0.0.1:7001/blog/'

const servicePath = {
  getArticleList: baseUrl + 'getArticleList', // 首页博文信息列表信息接口
  getArticleById: baseUrl + 'getArticleById/', // 通过文章获取博文详细信息接口
  getTypeInfo: baseUrl + 'getTypeInfo', // 获取文章类型信息接口
  getListById: baseUrl + 'getListById/', // 通过类型id获取博文列表信息接口
}

export default servicePath