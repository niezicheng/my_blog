module.exports = app => {
  const { router, controller } = app;
  router.get('/blog/index', controller.blog.home.index); // test

  /*********************文章信息*************************/
  router.post('/blog/getArticleList', controller.blog.home.getArticleList); // 获取文章信息列表
  router.get('/blog/getArticleById/:id', controller.blog.home.getArticleById); // 通过文章id获取文章详情信息
  router.get('/blog/getArticleByViewCount', controller.blog.home.getArticleByViewCount); // 通过文章id获取文章详情信息
  
  /*********************文章类别信息*************************/
  router.get('/blog/getTypeInfo', controller.blog.home.getTypeInfo); // 获取文章类别信息
  router.get('/blog/getListById/:id', controller.blog.home.getListById); // 通过类型id获取文章信息

  /*********************留言信息*************************/
  router.post('/blog/addArticleComment', controller.blog.home.addArticleComment); // 添加文章留言信息

  /*********************用户信息*************************/
  router.get('/blog/getUserInfo', controller.blog.home.getUserInfo); // 获取用户信息
}