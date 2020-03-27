import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route } from 'react-router-dom';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import AddArticle from '../AddArticle';
import ArticleList from '../ArticleList';
import CommentsList from '../CommentsList';
import Personal from '../Personal';

import './index.css';


const { Header, Content, Footer, Sider } = Layout;

const AdminIndex = (props) => {
  const [collapsed, setCollapsed] = useState(false); // menu菜单闭合
  const [subMenu, setSubMenu] = useState('工作台'); // 子menu名称

  // 控制导航菜单的闭合
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  // 菜单选择路由跳转函数
  const selectHandleMenu = (e) => {
    switch(e.key) {    
      case 'articleList':
        props.history.push('/index/list/');
        setSubMenu('文章管理');
        break;
      case 'comment':
        props.history.push('/index/comment/');
        setSubMenu('留言管理');
        break;
      case 'personal':
        props.history.push('/index/personal/');
        setSubMenu('个人管理');
        break;
      default:
        props.history.push('/index/');
        setSubMenu('工作台');
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['workSpace']} mode="inline" onClick={selectHandleMenu}>
          <Menu.Item key="workSpace">
            <PieChartOutlined />
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key="articleList">
            <DesktopOutlined />
            <span>文章管理</span>
          </Menu.Item>
          <Menu.Item key="comment">
            <PieChartOutlined />
            <span>留言管理</span>
          </Menu.Item>
          <Menu.Item key="personal">
            <DesktopOutlined />
            <span>个人管理</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>{subMenu}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div>
              <Route path="/index/" exact component={AddArticle} />
              <Route path="/index/list/" exact component={ArticleList} />
              <Route path="/index/update/:id" exact component={AddArticle} />
              <Route path="/index/comment/" exact component={CommentsList} />
              <Route path="/index/personal/" exact component={Personal} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;