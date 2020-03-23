const baseUrl = 'http://127.0.0.1:7001/admin/'

const servicePath = {
  login: baseUrl + 'login', // 登录接口
  getTypeInfo: baseUrl + 'getTypeInfo', // 获取文章类型信息接口
  addArticle: baseUrl + 'addArticle', // 添加文章信息接口
  updateArticle: baseUrl + 'updateArticle', // 修改文章信息接口
  getArticleList: baseUrl + 'getArticleList', // 修改文章信息接口
  deleteArticle: baseUrl + 'deleteArticle/', // 删除文章信息接口
  getArticleById: baseUrl + 'getArticleById/', // 通过文章id获取文章信息接口
  getCommentsInfo: baseUrl + 'getCommentsInfo', // 获取留言信息接口
  deleteComment: baseUrl + 'deleteComment/', // 获取留言信息接口
}

export default servicePath