import React from 'react'
import { Avatar, Divider } from 'antd'
import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons'

import '../static/style/components/author.css'

const Author = () => {
  return (
    <div className="author-div comm-box">
      {/* <div><Avatar size={100} src="http://blogimages.jspang.com/blogtouxiang1.jpg" /></div> */}
      <div><Avatar size={100} src="../static/images/avatar.jpg" /></div>
      <div className="author-nickname">清香的Orange</div>
      <div className="author-introduction">
        一名前端程序小白，正在不断的学习过程中，对前端基础有些许了解，主学react框架。
      </div>
      <Divider>社交账号</Divider>
      <Avatar size={28} icon={<GithubOutlined />} className="account" />
      <Avatar size={28} icon={<WeiboCircleOutlined />} className="account" />
      <Avatar size={28} icon={<QqOutlined />} className="account" />
      <Avatar size={28} icon={<WechatOutlined />} className="account" />
    </div>
  )
}

export default Author