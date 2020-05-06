const baseUrl = 'http://127.0.0.1:7001/blog/'

const servicePath = {
  /***********文章信息**************/
  getArticleList: baseUrl + 'getArticleList', // 首页博文信息列表信息接口
  getArticleById: baseUrl + 'getArticleById/', // 通过文章获取博文详细信息接口
  getArticleByViewCount: baseUrl + 'getArticleByViewCount', // 根据浏览量降序获取前六条文章信息
  getListById: baseUrl + 'getListById', // 通过类型id获取博文列表信息接口
  /***********文章类型信息**************/
  getTypeInfo: baseUrl + 'getTypeInfo', // 获取文章类型信息接口
  /***********留言信息**************/
  addArticleComment: baseUrl + 'addArticleComment', // 添加文章留言信息接口
  /***********用户信息**************/
  getUserInfo: baseUrl + 'getUserInfo', // 获取用户信息接口
}

export default servicePath