module.exports = app => {
  const { router, controller } = app
  const adminAuthor = app.middleware.adminAuthor() // eggjs内置的中间件【路由守卫】
  router.get('/admin/index', adminAuthor, controller.admin.main.index) // test
  router.post('/admin/login', controller.admin.main.login) // 登录
  router.get('/admin/getTypeInfo', adminAuthor, controller.admin.main.getTypeInfo) // 获取文章类型信息
  router.post('/admin/addArticle', adminAuthor, controller.admin.main.addArticle) // 添加文章信息
  router.post('/admin/updateArticle', adminAuthor, controller.admin.main.updateArticle) // 修改文章信息

}
