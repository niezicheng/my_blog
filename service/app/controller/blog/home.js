'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api Hi';
  }

  /*********************文章信息*************************/

  /**
   * 获取文章列表信息
   */
  async getArticleList() {
    const { pageNo, pageSize } = this.ctx.request.body
    const startRows = (pageNo-1)*pageSize
    const endRows = pageSize

    const sql = 'SELECT article.id as id, '+
              'article.title as title, '+
              'article.introduce as introduce, '+
              // 'FROM_UNIXTIME(article.createAt,"%Y-%m-%d %H:%i:%s" ) as createAt,'+
              'article.createAt as createAt, '+
              'article.view_count as view_count, '+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id '+
              'ORDER BY article.id DESC '+
              'LIMIT '+startRows+', '+endRows
    const sql2 = 'SELECT count(*) as total FROM article'
    const totalNum = await this.app.mysql.query(sql2)
    const result = await this.app.mysql.query(sql)
    this.ctx.body={
        total: totalNum[0].total,
        data: result
    }
  }

  /**
   * 通过文章id获取文章详情信息
   */
  async getArticleById() {
    const { id } = this.ctx.params

    const sql = 'SELECT article.id as id, '+
    'article.title as title, '+
    'article.introduce as introduce, '+
    'article.article_content as article_content, '+
    // 'FROM_UNIXTIME(article.createAt,"%Y-%m-%d %H:%i:%s" ) as createAt,'+
    'article.createAt as createAt, '+
    'article.view_count as view_count, '+
    'type.typeName as typeName, '+
    'type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    'WHERE article.id='+id

    const result = await this.app.mysql.query(sql)

    this.ctx.body = {
      data: result
    }
  }

  /**
   * 根据类别id获取文章列表
   */
  async getListById() {
    const { id, pageNo, pageSize } = this.ctx.request.body
    const startRows = (pageNo-1)*pageSize
    const endRows = pageSize

    const sql = 'SELECT article.id as id, '+
              'article.title as title, '+
              'article.introduce as introduce, '+
              // 'FROM_UNIXTIME(article.createAt,"%Y-%m-%d %H:%i:%s" ) as createAt,'+
              'article.createAt as createAt, '+
              'article.view_count as view_count, '+
              'type.Id as typeId, '+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id '+
              'WHERE type_id='+id+
              ' ORDER BY article.id DESC '+
              'LIMIT '+startRows+', '+endRows

    const sql2 = 'SELECT count(*) as total FROM article WHERE type_id='+id
    const totalNum = await this.app.mysql.query(sql2)
    const result = await this.app.mysql.query(sql)
    this.ctx.body={
        total: totalNum[0].total,
        data: result
    }
  }

  /**
   * 根据浏览量降序获取前面8条文章信息
   */
  async getArticleByViewCount() {
    const sql = 'SELECT * From article ORDER BY view_count DESC LIMIT 15';

    const result = await this.app.mysql.query(sql);

    this.ctx.body = {
      data: result
    };
  }

  /*********************文章类别信息*************************/

  /**
   * 获取文章类型信息
   */
  async getTypeInfo() {
    const result = await this.app.mysql.select('type')

    this.ctx.body = {
      data: result
    }
  }

  /*********************留言信息*************************/

  /**
   * 添加留言信息
   */
  async addArticleComment() {
    const tempComment = this.ctx.request.body

    const result = await this.app.mysql.insert('comment', tempComment)
    const isSuccess = result.affectedRows === 1 // 返回true添加成功，否则，添加失败

      this.ctx.body = {
        isSuccess
      }
  }

  /*********************用户信息*************************/

  /**
   * 获取用户信息
   */
  async getUserInfo() {
    const result = await this.app.mysql.select('userInfo')

    this.ctx.body = {
      data: result
    }
  }

}

module.exports = HomeController;
