import React, { useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route } from 'react-router-dom';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';

import AddArticle from '../AddArticle';

import './index.css';

const { Header, Content, Footer, Sider } = Layout;

const AdminIndex = () => {
  const [collapsed, setCollapsed] = useState(false);

  // 控制导航菜单的闭合
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <PieChartOutlined />
            <span>工作台</span>
          </Menu.Item>
          <Menu.Item key="2">
            <DesktopOutlined />
            <span>文章管理</span>
          </Menu.Item>
          <Menu.Item key="3">
            <PieChartOutlined />
            <span>留言管理</span>
          </Menu.Item>
          <Menu.Item key="4">
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
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <div>
              <Route path="/index/" exact component={AddArticle} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;