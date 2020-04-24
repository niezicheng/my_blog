import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Affix, BackTop, Pagination } from 'antd'
import {
  CalendarOutlined,
  FolderOutlined,
  FireOutlined,
} from '@ant-design/icons'

import axios from 'axios'
import moment from 'moment'

import marked from 'marked'
import highlightjs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import Header from '../components/Header'
import Author from '../components/Author'
import ViewRank from '../components/ViewRank'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import servicePath from '../config'

import '../static/style/pages/index.css'

const Home = (list) => {
  const [ mylist , setMylist ] = useState(list.data)
  const renderer = new marked.Renderer()

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

  // 分页查询页面改变事件
  const pageHandleChange = async (pageNo, pageSize) => {
    const res = await axios({
      url: servicePath.getArticleList,
      method: 'post',
      data: {
        pageNo,
        pageSize
      }
    })
    setMylist(res.data.data);
  }

  return (
    <div>
      <BackTop />
      <Head>
        <title>首页</title>
      </Head>
      <Affix offsetTop={0}>
        <Header />
      </Affix>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={13}>
          <List 
            header={<div className="list-header">最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detail', query: {id: item.id} }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined /> {moment(item.createAt).format('YYYY-MM-DD')}</span>
                  <span><FolderOutlined /> {item.typeName}</span>
                  <span><FireOutlined /> {item.view_count} 人</span>
                </div>
                <div className="list-context"
                  dangerouslySetInnerHTML={{__html: marked(item.introduce)}}
                ></div>
              </List.Item>
            )}
          />
          <Pagination
            defaultCurrent={1}
            total={list.total}
            onChange={pageHandleChange}
            hideOnSinglePage
            style={{ float: 'right', marginRight: '50px' }}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={6} xl={5}>
          <Author />
          <Advert />
          <ViewRank />
        </Col>
      </Row>
      <Footer />
    </div>
  )
}

Home.getInitialProps = async(context) => {
  console.log(context, 'hh');
  const promise = new Promise((resolve, reject) => {
    axios({
      url: servicePath.getArticleList,
      method: 'post',
      data: {
        pageNo: 1,
        pageSize: 10
      }
    })
    .then((res) => {
      console.log(res.data, 'kkkk');
      resolve(res.data)
    })
  })

  return await promise
}


export default Home
