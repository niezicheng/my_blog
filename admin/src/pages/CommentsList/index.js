import React, { useState, useEffect } from 'react';
import { Collapse, Row, Col, Button, Modal, message } from 'antd';

import moment from 'moment';

import {
  getCommentsInfo,
  deleteComment
} from './service';

const { Panel } = Collapse;
const { confirm } = Modal;

const MyCollapse = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentList()
  }, [])

  // 获取留言列表信息
  const getCommentList = () => {
    getCommentsInfo().then(res => {
      const { data } = res.data;
      setComments(data);
    })
  }

  // 删除留言信息
  const delComment = (e, id) => {
    console.log(id)
    e.stopPropagation();
    confirm({
      title: '确定要删除这条留言吗？',
      content: '点击确认后，该留言将被彻底删除，无法恢复',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteComment(id).then(res => {
          message.success('留言删除成功');
          // 如果前台并发量比较大的时候，尽量使用使用修改数组值的方式而不是再去数据库中进行查找
          getCommentList();
        })
      },
      onCancel() {
        message.success('留言没有变化');
      }
    });
  }

  // 折叠面板头部显示
  const header = (item) => {
    return(
      <Row >
        <Col span={19}>{item.title}</Col>
        <Col span={4}>{moment(item.createAt).format('YYYY-MM-DD HH:mm:ss')}</Col>
        <Col span={1}>
          <Button type="danger" size="small" onClick={(e) => {delComment(e, item.id)}}>删除</Button>
        </Col>
      </Row>
    )
  }

  return (
    <Collapse accordion>
      {comments && comments.map(item => {
        return (
          <Panel header={header(item)} key={item.id}>
            <p>{item.commentContent}</p>
          </Panel>
        )
      })}
      
    </Collapse>
  );
}

export default MyCollapse;
