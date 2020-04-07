import React, { useState, useEffect } from 'react'
import { Avatar, Divider, Tooltip } from 'antd'
import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons'

import '../static/style/components/author.css'
import axios from 'axios'
import servicePath from '../config'

const Author = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo()
  }, [])

  // 获取用户相关信息
  const getUserInfo = () => {
    axios(servicePath.getUserInfo).then(res => {
      const { data } = res.data
      setUserInfo(data[0])
    })
  }

  return (
    <div className="author-div comm-box">
      {/* <div><Avatar size={100} src="http://blogimages.jspang.com/blogtouxiang1.jpg" /></div> */}
      <div><Avatar size={100} src="../static/images/avatar.jpg" /></div>
      <div className="author-nickname">{userInfo.nickName}</div>
      <div className="author-introduction">
        {userInfo.introduce}
      </div>
      <Divider>社交账号</Divider>
      <Tooltip placement="topLeft" title={userInfo.github}>
        <a href={userInfo.github} target="_blank">
          <Avatar size={26} icon={<GithubOutlined />} className="account" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title={userInfo.blog} target="_blank">
        <a href={userInfo.blog} target="_blank">
          <Avatar size={26} icon={<WeiboCircleOutlined />} className="account" />
        </a>
      </Tooltip>
      <Tooltip placement="topLeft" title={userInfo.email}>
      <Avatar size={26} icon={<QqOutlined />} className="account" />
      </Tooltip>
      <Tooltip placement="topLeft" title={userInfo.weixin}>
        <Avatar size={26} icon={<WechatOutlined />} className="account" />
      </Tooltip>  
    </div>
  )
}

export default Author