module.exports = app => {
  const { router, controller } = app;
  router.get('/blog/index', controller.blog.home.index);
  router.get('/blog/getArticleList', controller.blog.home.getArticleList); // 获取文章信息列表
  router.get('/blog/getArticleById/:id', controller.blog.home.getArticleById); // 通过文章id获取文章详情信息
}