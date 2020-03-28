import React, { useState } from 'react';
import { Card, Input, Button, Spin, message } from 'antd';
import {
  UserOutlined,
  KeyOutlined
} from '@ant-design/icons';

import { login } from './service';

import './index.css';

const Login = (props) => {
  const [userName, setUseName] = useState(''); // 用户名
  const [password, setPassword] = useState(''); // 密码
  const [isLoading, setIsLoading] = useState(false); // loading状态标识

  /**
   * 登录提交点击事件
   */
  const loginSubmmit = () => {
    setIsLoading(true);
    if(!userName) {
      message.error('用户名不能为空');
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return false;
    } else if(!password) {
      message.error('密码不能为空');
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return false;
    }
    const params = {
      userName,
      password
    }
    // 登陆接口
    login(params).then(res => {
      setIsLoading(false);
      if(res.data.msg === '登录成功') {
        localStorage.setItem('openId', res.data.openId);
        props.history.push('/index');
      } else {
        message.error('用户名或密码错误');
      }
    })
  }


  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="个人博客后台管理系统" bordered style={{width: 400}}>
          <Input
            id="useName"
            size="middle"
            placeholder="用户名"
            prefix={<UserOutlined className="input-icon" />}
            onChange={(e) => {setUseName(e.target.value)}}
            style={{ marginBottom: '1rem' }}
          />
          <Input.Password
            id="password"
            size="middle"
            placeholder="密码"
            prefix={<KeyOutlined className="input-icon" />}
            onChange={(e) => {setPassword(e.target.value)}}
            style={{ marginBottom: '2rem' }}
          />
          <Button type="primary" size="middle" block onClick={loginSubmmit}>Login in</Button>
        </Card>
      </Spin>
    </div>
  );
}

export default Login;
