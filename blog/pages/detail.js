import React from 'react'
import Head from 'next/head'
import { Row, Col, Affix, Breadcrumb, BackTop } from 'antd'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from '@ant-design/icons';

import axios from 'axios'
import moment from 'moment'

import marked from 'marked'
import highlightjs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import MyComment from '../components/MyComment'
import Footer from '../components/Footer'

import servicePath from '../config'

const Detail = (props) => {
  const tocify = new Tocify() // 文章详情导航栏插件
  const renderer = new marked.Renderer()

  // ### 文本
  renderer.heading = (text, level, raw) => {
    const anchor = tocify.add(text, level)
    return (
      `<a id="${anchor}" href="#${anchor}" class="anchor-fix">
        <h${level}>${text}</h${level}>
      </a>\n`
    )
  }

  marked.setOptions({
    renderer: renderer, // 可以通过自定义的Renderer渲染出自定义的格式
    gfm:true, // 启动类似与github样式的markdown
    pedantic: false, // 只解析符合Markdown定义的，不修正Markdown的错误
    sanitize: false, // 原始输出，忽略HTML标签
    tables: true, // 支持github形式的表格，使用时必须打开gfm选项
    breaks: false, // 支持github换行符，使用时必须打开gfm选项
    smartLists: true, // 优化列表输出，使你的样式更好看一些
    smartypants: false,
    highlight: function (code) { // 代码高亮显示规则
            return highlightjs.highlightAuto(code).value;
    }
  })

  const html = marked(props.article_content) // 将markdown转换为html

  return (
    <div>
      <BackTop />
      <Head>
        <title>{props.title}</title>
      </Head>
      <Affix offsetTop={0}>
        <Header />
      </Affix>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={13}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href={`/list?id=${props.typeId}`}>{props.typeName}</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
          <div>
            <div className="detailed-title">
              {props.title}
            </div>
            <div className="list-icon center">
              <span><CalendarOutlined /> {moment(props.createAt).format('YYYY-MM-DD')}</span>
              <span><FolderOutlined /> {props.typeName}</span>
              <span><FireOutlined /> {props.view_count}人</span>
            </div>
            <div className="detailed-content" 
              dangerouslySetInnerHTML={{__html: html}}
            >
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={6} xl={5}>
          <Author />
          <Advert />
          <Affix offsetTop={60}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
                {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={13}>
          <MyComment articleId={props.id} />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={6} xl={5}></Col>
      </Row>
      <Footer />
    </div>
  )
}

Detail.getInitialProps = async(context) => {

  const { id } = context.query

  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleById+id)
    .then((res) => {
      resolve(res.data.data[0])
    })
  })

  return await promise
}

export default Detail
