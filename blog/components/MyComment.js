import React, { useState } from 'react'
import { Comment, Avatar, message, Form } from 'antd'

import axios from 'axios'

import Editor from './Editor'

import servicePath from '../config'

const MyComment = (props) => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false); 

  const handleSubmit = (values) => {
    setSubmitting(true)
    const commentInfo = {
      ...values,
      articleId: props.articleId,
      createAt: (new Date()).getTime()
    }
    axios({
      url: servicePath.addArticleComment,
      method: 'post',
      data: commentInfo
    }).then(res => {
      const { isSuccess=false } = res.data
      if(isSuccess) {
        setSubmitting(false);
        message.success('留言成功')
        form.resetFields();
      } else {
        message.error('留言失败')
      }
    })
  };

  return (
    <div>
      <Comment
        avatar={
          <Avatar
            src="../static/images/avatar.jpg"
            alt="Han Solo"
          />
        }
        content={
          <Editor
            onSubmit={handleSubmit}
            submitting={submitting}
            form={form}
          />
        }
      />
    </div>
  );
}

export default MyComment;