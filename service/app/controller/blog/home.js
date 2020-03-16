'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'api Hi';
  }

  /**
   * 获取文章列表信息
   */
  async getArticleList() {
    let sql = 'SELECT article.id as id, '+
              'article.title as title, '+
              'article.introduce as introduce, '+
              // 'FROM_UNIXTIME(article.createAt,"%Y-%m-%d %H:%i:%s" ) as createAt,'+
              'article.createAt as createAt, '+
              'article.view_count as view_count, '+
              '.type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.Id'

     const results = await this.app.mysql.query(sql)
     this.ctx.body={
         data:results
     }
  }

  /**
    * 通过文章id获取文章详情信息
    */
  async getArticleById() {
    const { id } = this.ctx.params

    let sql = 'SELECT article.id as id, '+
    'article.title as title, '+
    'article.introduce as introduce, '+
    'article.article_content as article_content, '+
    // 'FROM_UNIXTIME(article.createAt,"%Y-%m-%d %H:%i:%s" ) as createAt,'+
    'article.createAt as createAt, '+
    'article.view_count as view_count, '+
    '.type.typeName as typeName, '+
    '.type.id as typeId '+
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    'WHERE article.id='+id

    const result = await this.app.mysql.query(sql)

    this.ctx.body = {
      data: result
    }
  }
}

module.exports = HomeController;
