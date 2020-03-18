import React, { useState } from 'react';
import { Card, Input, Button, Spin } from 'antd';
import {
  UserOutlined,
  KeyOutlined
} from '@ant-design/icons';

import './index.css';

const Login = () => {
  const [useName, setUseName] = useState(''); // 用户名
  const [password, setPassword] = useState(''); // 密码
  const [isLoading, setIsLoading] = useState(false); // loading状态标识

  /**
   * 登录提交点击事件
   */
  const loginSubmmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }


  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card title="Person blog System" bordered style={{width: 400}}>
          <Input
            id="useName"
            size="large"
            placeholder="Enter your useName"
            prefix={<UserOutlined style={{color: 'rgba: (0, 0, 0, .25)'}} />}
            onChange={(e) => {setUseName(e.target.value)}}
          />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{color: 'rgba: (0, 0, 0, .25)'}} />}
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <Button type="primary" size="large" block onClick={loginSubmmit}>Login in</Button>
        </Card>
      </Spin>
    </div>
  );
}

export default Login;
