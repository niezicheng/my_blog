import React, { useState, useEffect } from 'react'
import { Row, Col, Menu } from 'antd'
import {
  HomeOutlined,
  VideoCameraOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import Router from 'next/router'
import axios from 'axios'
import servicePath from '../config'

import '../static/style/components/header.css'

const Header = () => {
  const [navArr, setNavArr] = useState([])

  useEffect(() => {
    // 获取文章类别信息
    const fetchData = async () => {
      await axios(servicePath.getTypeInfo).then(res => {
        const data = res.data.data
        setNavArr(data)
      })
    }
    fetchData()
  }, [])

  const handleClick = (e) => {
    if(e.key === '0') {
      Router.push('/index')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }

  // 获取相应的类别图标
  const getIcon = (text) => {
    switch(text) {
      case 'VideoCameraOutlined':
        return <VideoCameraOutlined />
      case 'SmileOutlined':
        return <SmileOutlined />
      default: 
        return <HomeOutlined />
    }
  }


  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">清香的Orange</span>
          <span className="header-txt">技术小白，来学习来了</span>
        </Col>
        <Col xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal" onClick={handleClick}>
            <Menu.Item key="0">
              <HomeOutlined />
              首页
            </Menu.Item>
            {
              navArr.map(item => {
                return (
                  <Menu.Item key={item.Id}>
                    {getIcon(item.typeIcon)}
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header