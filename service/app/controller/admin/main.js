'use strict'

const Controller = require('egg').Controller

class MainController extends Controller {
    async index() {
      this.ctx.body="hello !!!"
    }

    /**
     * 用户登录
     */
    async login() {
      const userName = this.ctx.request.body.userName
      const password = this.ctx.request.body.password

      const sql = "SELECT userName FROM userInfo WHERE userName = '"+userName+"' AND password = '"+password+"'"
      const result = await this.app.mysql.query(sql)
      if(result.length > 0) {
        const openId = new Date().getTime(); // 类似于登录凭证【秘钥】
        this.ctx.session.openId = { 'openId': openId }
        this.ctx.body = {
          'msg': '登录成功',
          'openId': openId // 用于前后台的二次验证，可以不用查询数据库，节省资源
        }
      } else {
        this.ctx.body = {
          'msg': '登录失败'
        }
      }
    }

    /**
     * 获取文章类型信息
     */
    async getTypeInfo() {
      const result = await this.app.mysql.select('type')
      this.ctx.body = { data: result }
    }

    /**
     * 添加文章
     */
    async addArticle() {
      const tempArticle = this.ctx.request.body

      const result = await this.app.mysql.insert('article', tempArticle)
      const isSuccess = result.affectedRows === 1
      const insertId = result.insertId

      this.ctx.body = {
        isSuccess,
        insertId
      }
    }

    /**
     * 修改文章
     */
    async updateArticle() {
      const tempArticle = this.ctx.request.body

      const result = await this.app.mysql.update('article', tempArticle)
      const isSuccess = result.affectedRows === 1

      this.ctx.body = {
        isSuccess
      }
    }
}

module.exports = MainController