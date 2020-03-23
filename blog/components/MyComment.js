import React, { useState } from 'react'
import { Comment, Avatar, message } from 'antd'

import axios from 'axios'

import Editor from './Editor'

import servicePath from '../config'

const MyComment = (props) => {
  const [submitting, setSubmitting] = useState(false); 
  const [value, setValue] = useState(''); // 评论提交的value值

  const handleSubmit = () => {
    if (!value) {
      message.error('留言信息不能为空');
      return;
    }
    setSubmitting(true)
    const commentInfo = {}
    console.log(props, 'lllll');
    commentInfo.articleId = props.articleId
    commentInfo.commentContent = value
    commentInfo.createAt = (new Date()).getTime()
    axios({
      url: servicePath.addArticleComment,
      method: 'post',
      data: commentInfo
    }).then(res => {
      const { isSuccess=false } = res.data
      if(isSuccess) {
        setSubmitting(false);
        setValue('')
        message.success('留言成功')
      } else {
        message.error('留言失败')
      }
    })
  };

  // 留言编辑文本信息
  const handleChange = e => {
    setValue(e.target.value);
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
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </div>
  );
}

export default MyComment;