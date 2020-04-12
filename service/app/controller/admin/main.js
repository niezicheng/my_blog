'use strict'

const Controller = require('egg').Controller

// //node.js 文件操作对象
const fs = require('fs');
// //node.js 路径操作对象
const path = require('path');
//egg.js Controller
// const Controller = require('egg').Controller;
//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
//当然你也可以不使用这个 哈哈 个人比较赖
//还有我们这里使用了egg-multipart
const md5 = require('md5');

class MainController extends Controller {
    async index() {
      this.ctx.body="hello !!!"
    }

    /*********************************用户登录*************************************/

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
     * 用户登出
     */
    async logout() {
      this.ctx.session = null
      let isSuccess = false
      // session中openId不存在，登出成功
      if(!this.ctx.session) {
        isSuccess = true
      }
      
      this.ctx.body = {
        isSuccess
      }
    }

    /*********************************文章管理*************************************/

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
     * 删除文章信息
     * @param {文章id} id
     */
    async deleteArticle() {
      const { id } = this.ctx.params;
      const result = await this.app.mysql.delete('article', { id })
      
      this.ctx.body={
        data: result
      }
    }

    /**
     * 修改文章
     * @param {文章id} id
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
     * 根据文章id获取文章信息
     * @param {文章id} id
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

    /**
     * 根据文章类型id获取文章信息
     * @param {文章类型id} id 
     */
    async getArticleByTypeId() {
      const { id } = this.ctx.params
      const sql = 'SELECT article.id as id, '+
                  'article.title as title, '+
                  'article.article_content as article_content, '+
                  'article.introduce as introduce, '+
                  'article.createAt as createAt, '+
                  'article.view_count as view_count, '+
                  'type.typeName as typeName, '+
                  'type.id as typeId '+
                  'FROM article LEFT JOIN type ON article.type_id = type.Id '+
                  'WHERE type.id= '+id
      const result = await this.app.mysql.query(sql);
      this.ctx.body = {
        data: result
      }
    }

    /*********************************文章类型管理*************************************/

    /**
     * 添加文章类别
     */
    async addTypeInfo() {

    }

    /**
     * 删除文章类别
     */
    async deleteTypeInfo() {

    }
    
    /**
     * 获取文章类型信息
     */
    async getTypeInfo() {
      const result = await this.app.mysql.select('type')
      this.ctx.body = { data: result }
    }

    /*********************************留言管理*************************************/

    /**
     * 获取留言信息
     */
    async getCommentsInfo() {
      const sql = 'SELECT comment.id as id, '+
                  'comment.commentContent as commentContent, '+
                  'comment.createAt as createAt, '+
                  'article.title as title '+
                  'FROM comment LEFT JOIN article ON comment.articleId = article.Id '+
                  'ORDER BY comment.id DESC'

      const result = await this.app.mysql.query(sql)

      this.ctx.body = {
        data: result
      }
    }

    /**
     * 删除文章留言信息
     */
    async deleteComment() {
      const { id } = this.ctx.params

      const result = await this.app.mysql.delete('comment', { id })

      this.ctx.body = {
        data: result
      }
    }

    /*********************************个人信息管理*************************************/

    /**
     * 查询个人信息
     */
    async getUserInfo() {
      const result = await this.app.mysql.select('userinfo');

      this.ctx.body = {
        data: result
      }
    }

    /**
     * 更新个人信息
     */
    async updateUserInfo() {
      const tempUserInfo = this.ctx.request.body

      const result = await this.app.mysql.update('userinfo', tempUserInfo)
      const isSuccess = result.affectedRows === 1

      this.ctx.body = {
        isSuccess
      }
    }

    /**
     * 上传头像图片
     */
    async upload() {
      const ctx = this.ctx;
      //egg-multipart 已经帮我们处理文件二进制对象
      // node.js 和 php 的上传唯一的不同就是 ，php 是转移一个 临时文件
      // node.js 和 其他语言（java c#） 一样操作文件流
      const stream = await ctx.getFileStream();
      //新建一个文件名
      const filename = md5(stream.filename) + path
          .extname(stream.filename)
          .toLocaleLowerCase();
      //文件生成绝对路径
      //当然这里这样是不行的，因为你还要判断一下是否存在文件路径
      console.log(this.config.baseDir, '.popo');
      const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
      console.log(target, 'oioioi');
      //生成一个文件写入 文件流
      const writeStream = fs.createWriteStream(target);
      try {
          //异步把文件流 写入
          await awaitWriteStream(stream.pipe(writeStream));
      } catch (err) {
          //如果出现错误，关闭管道
          await sendToWormhole(stream);
          throw err;
      }
      //文件响应
      ctx.body = {
          url: '/public/uploads/' + filename
      };
    }
}

module.exports = MainController