import React, { useState, useEffect } from 'react'
import { Form, Button, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const { TextArea } = Input

const Editor = ({ onChange, onSubmit, submitting, form }) => {
  const [, forceUpdate] = useState();
  // 开始时禁止留言按钮
  useEffect(() => {
    forceUpdate({});
  }, []);

  return(
    <div style={{ paddingLeft: '15px' }}>
      <Form form={form} name="horizontal_login" onFinish={onSubmit} layout="inline">
        <Form.Item
          name="nickName"
          label="昵称"
          rules={[{ required: true, message: '请输入您的昵称!' }]}
          style={{ marginBottom: '10px' }}
        >
          <Input
            placeholder="昵称"
          />
        </Form.Item>
        <Form.Item
          name="contact"
          label="联系方式"
          rules={[{ required: true, message: '请输入您的联系方式!' }]}
          style={{ marginBottom: '10px' }}
        >
          <Input
            placeholder="QQ\微信\邮箱"
          />
        </Form.Item>
        <Form.Item
          name="commentContent"
          rules={[{ required: true, message: '请输入留言内容!' }]}
          style={{ width: '90%' }}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
              }
              style={{ marginTop: '5px' }}
            >
              留言
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  )};

export default Editor