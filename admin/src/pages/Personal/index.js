import React, { useState, useEffect } from 'react';
import { Row, Col, Divider, Input, Button, Form, message } from 'antd';
import {
  GithubOutlined,
  WeiboCircleOutlined,
  QqOutlined,
  WechatOutlined
} from '@ant-design/icons'

import MyAvatar from './components/MyAvatar';
import MyModal from './components/Modal';

import {
  getUserInfo,
  updateUserInfo
} from './service';


import './index.css';

const { TextArea } = Input;

const Personal = () => {
  const [form] = Form.useForm(); // 控制表单
  const [userInfo, setUserInfo] = useState({}); // 用户个人信息
  const [visible, setVisible] = useState(false); // 显示modal
  const [confirmLoading, setConfirmLoading] = useState(false); // 异步显示loading提交表单
  const [modalType, setModalType] = useState(''); // 控制modal显示内容

  useEffect(() => {
    getUserMessage()
  }, []);

  /**
   * 获取用户个人信息
   */
  const getUserMessage = () => {
    getUserInfo().then(res => {
      const { data } = res.data;
      setUserInfo(data[0]);
    })
  }

  /**
   * 更新用户相关个人信息
   */
  const updateUserMessage = (params) => {
    const data = { ...params, id: params.Id }; //这个需要显示的传递id，数据库中为Id不符合传递要求
    updateUserInfo(data).then(res => {
      const { isSuccess } = res.data;
      if(isSuccess) {
        setUserInfo({...data});
        setVisible(false);
        setConfirmLoading(false);
        message.success('信息更新成功');
      } else {
        message.error('信息没有发生变化');
      }
    })
  }

  // 确定修改函数
  const handleOk = () => {
    setConfirmLoading(true);
    form.validateFields().then(values => {
      let params = {...userInfo, ...values};
      if(modalType === 'password') {
        const { password } = values;
        params = {...userInfo, password};
      }
      updateUserMessage(params);
    }).catch(() => {
      setConfirmLoading(false);
    })
  };

  // 显示对应的Modal
  const showModal = (modalType) => {
    form.resetFields(); // 清空modal中表单数据信息
    setConfirmLoading(false);
    setModalType(modalType)
    setVisible(true);
  }

  // 关闭modal
  const handleCancel = () => {
    setVisible(false);
  };


  return (
    <>
      <Row className="row-warpper" type="flex" justify="center" align="middle">
        <Col span={4}>
          { userInfo.avatar && (
            <MyAvatar imgUrl={userInfo.avatar} updateUserMessage={updateUserMessage} userInfo={userInfo}/>
          )}
        </Col>
        <Divider className="divider-css" type="vertical" />
        <Col className="content-div" span={19}>
          <div className="userName-div">
            账号:
            <span className="text"> {userInfo.userName}</span>
          </div>
          <div className="nickName-div">
            用户昵称: 
            <span className="text">  {userInfo.nickName}</span>
            <span className="updateBtn" onClick={() => {showModal('nickName')}}>修改</span>
          </div>
          <div className="password-div">
            登录密码:
            <span className="text">  ******</span>
            <span className="updateBtn" onClick={() => {showModal('password')}}>修改</span>
          </div>
        </Col>
      </Row>
      <Row className="row-warpper" type="flex" justify="center">
        <Col span={4}>
          <span className="item-title">个人简介</span>
        </Col>
        <Divider className="divider-css" type="vertical" />
        <Col className="content-div need-btn" span={19}>
          <TextArea
            className="introduce"
            rows={4}
            placeholder="简介"
            value={userInfo.introduce}
            onChange={(e) => {setUserInfo({ ...userInfo, introduce: e.target.value })}}
            allowClear
          />
          <Button type="primary" size="small" onClick={() => { updateUserMessage({...userInfo})}}>修改</Button>
        </Col>
      </Row>
      <Row className="row-warpper" type="flex" justify="center">
        <Col span={4}>
          <span className="item-title">社交账号</span>
        </Col>
        <Divider className="divider-social" type="vertical" />
        <Col className="content-div need-btn" span={19}>
          <Input
            size="middle"
            placeholder="github"
            value={userInfo.github}
            onChange={(e) => {setUserInfo({ ...userInfo, github: e.target.value })}}
            prefix={<GithubOutlined />}
            allowClear
          />
          <Input
            size="middle"
            placeholder="blog"
            value={userInfo.blog}
            onChange={(e) => {setUserInfo({ ...userInfo, blog: e.target.value })}}
            prefix={<WeiboCircleOutlined />}
            allowClear
          />
          <Input
            size="middle"
            placeholder="email"
            value={userInfo.email}
            onChange={(e) => {setUserInfo({ ...userInfo, email: e.target.value })}}
            prefix={<QqOutlined />}
            allowClear
          />
          <Input
            size="middle"
            placeholder="weixin"
            value={userInfo.weixin}
            onChange={(e) => {setUserInfo({ ...userInfo, weixin: e.target.value })}}
            prefix={<WechatOutlined />}
            allowClear
          />
          <Button type="primary" size="small" onClick={() => { updateUserMessage({...userInfo})}}>修改</Button>
        </Col>
      </Row>
      <MyModal
        form={form}
        modalType={modalType}
        visible={visible}
        confirmLoading={confirmLoading}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
}

export default Personal;