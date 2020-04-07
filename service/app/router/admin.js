module.exports = app => {
  const { router, controller } = app
  const adminAuthor = app.middleware.adminAuthor() // eggjs内置的中间件【路由守卫】
  router.get('/admin/index', adminAuthor, controller.admin.main.index) // test
  router.post('/admin/login', controller.admin.main.login) // 登录
  router.post('/admin/logout', adminAuthor, controller.admin.main.logout) // 登出
  router.get('/admin/getTypeInfo', adminAuthor, controller.admin.main.getTypeInfo) // 获取文章类型信息
  router.post('/admin/addArticle', adminAuthor, controller.admin.main.addArticle) // 添加文章信息
  router.post('/admin/updateArticle', adminAuthor, controller.admin.main.updateArticle) // 修改文章信息
  router.get('/admin/getArticleList', adminAuthor, controller.admin.main.getArticleList) // 获取文章列表信息
  router.get('/admin/deleteArticle/:id', adminAuthor, controller.admin.main.deleteArticle) // 删除文章列表信息
  router.get('/admin/getArticleById/:id', adminAuthor, controller.admin.main.getArticleById) // 通过文章id获取文章列表信息
  router.get('/admin/getCommentsInfo', adminAuthor, controller.admin.main.getCommentsInfo) // 获取留言列表信息
  router.get('/admin/deleteComment/:id', adminAuthor, controller.admin.main.deleteComment) // 删除留言信息
  router.get('/admin/getUserInfo', adminAuthor, controller.admin.main.getUserInfo) // 获取个人信息
  router.post('/admin/updateUserInfo', adminAuthor, controller.admin.main.updateUserInfo) // 更新个人信息
  router.post('/admin/upload', adminAuthor, controller.admin.main.upload) // 更新个人信息
  router.get('/admin/getArticleByTypeId/:id', adminAuthor, controller.admin.main.getArticleByTypeId) // 根据文章类型id获取文章信息
  
}
