module.exports = options => {
  return async function adminAuthor(ctx, next) {
    console.log(ctx.session.openId)
    if(ctx.session.openId) {
      await next()
    } else {
      ctx.body = { data: '没有登录' }
    }
  }
}