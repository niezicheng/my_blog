import React from 'react';
import { Modal, Form, Input } from 'antd';

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 16 },
};

const MyModal = (props) => {
  const {
    form,
    modalType='',
    visible=false,
    confirmLoading=false,
    handleOk,
    handleCancel,
  } = props

  return (
    <Modal
      title={`修改${modalType === 'password' ? '密码' : '昵称'}`}
      okText="确定"
      cancelText="取消"
      visible={visible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        {...layout}
        scrollToFirstError
      >
        {modalType === 'password' ? (
          <>
            <Form.Item
              name="password"
              label="新密码"
              rules={[
                {
                  required: true,
                  message: '请输入你的新密码!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmPwd"
              label="确认密码"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请确认你的新密码!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('请确保两次输入的密码是一致的!');
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </>
        ) : (
          <Form.Item
            label="新的昵称"
            name="nickName"
            rules={[{ required: true, message: 'Please input your nickName!' }]}
          >
            <Input />
          </Form.Item>
        )}          
      </Form>
    </Modal>
  );
}

export default MyModal;