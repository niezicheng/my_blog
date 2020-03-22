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

    /**
     * 获取文章列表
     */
    async getArticleList() {
      const sql = 'SELECT article.id as id, '+
                  'article.title as title, '+
                  'article.introduce as introduce, '+
                  // 'FROM_UNIXTIME(article.createAt,"%Y-%m-%d %H:%i:%s" ) as createAt,'+
                  'article.createAt as createAt, '+
                  'article.updateAt as updateAt, '+
                  'article.view_count as view_count, '+
                  'type.typeName as typeName '+
                  'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                  'ORDER BY article.id DESC'
      
      const result = await this.app.mysql.query(sql);

      this.ctx.body = {
        data: result
      }
    }

    /**
     * 删除文章信息
     */
    async deleteArticle() {
      const { id } = this.ctx.params;
      const result = await this.app.mysql.delete('article', { id })
      
      this.ctx.body={
        data: result
      }
    }

    /**
     * 根据文章id获取文章信息
     */
    async getArticleById() {
      const { id } = this.ctx.params
      // ？？ 优化时需要判断前端是否传递了id，否则会影响业务流程

      const sql = 'SELECT article.id as id, '+
                  'article.title as title, '+
                  'article.article_content as article_content, '+
                  'article.introduce as introduce, '+
                  // 'FROM_UNIXTIME(article.createAt,"%Y-%m-%d %H:%i:%s" ) as createAt,'+
                  'article.createAt as createAt, '+
                  'article.view_count as view_count, '+
                  'type.typeName as typeName, '+
                  'type.id as typeId '+
                  'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                  'WHERE article.id= '+id
      
      const result = await this.app.mysql.query(sql);

      this.ctx.body = {
        data: result
      }
    }
}

module.exports = MainController