import React, { useState, useEffect } from 'react';
import { List, Row, Col, Modal, message, Button } from 'antd';

import moment from 'moment';

import {
  getArticleList,
  deleteArticle,
} from './service';

import './index.css';

const { confirm } = Modal;

const ArticleList = (props) => {
  const [list, setList] = useState([]); // 文章内容列表

  useEffect(() => {
    getList();
  }, [])

  // 获取文章列表信息
  const getList = () => {
    getArticleList().then(res => {
      setList(res.data.data);
    });
  }

  // 删除文章列表信息
  const delArticle = (id) => {
    confirm({
      title: '确定要删除这篇文章吗？',
      content: '点击确认后，该文章将被彻底删除，无法恢复',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteArticle(id).then(res => {
          message.success('文章删除成功');
          // 如果前台并发量比较大的时候，尽量使用使用修改数组值的方式而不是再去数据库中进行查找
          getList();
        })
      },
      onCancel() {
        message.success('文章没有变化');
      }
    });
  }

  // 修改文章跳转函数
  const updateArticle = (id) => {
    props.history.push('/index/update/'+id);
  }

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={7}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>更新时间</b>
            </Col>
            <Col span={3}>
              <b>浏览量</b>
            </Col>
            <Col span={3}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item key={item.id}>
            <Row className="list-div">
              <Col span={7}>
                {item.title}
              </Col>
              <Col span={3}>
                {item.typeName}
              </Col>
              <Col span={4}>
                {moment(item.createAt).format('YYYY-MM-DD HH:mm:ss')}
              </Col>
              <Col span={4}>
                {item.updateAt ? moment(item.updateAt).format('YYYY-MM-DD HH:mm:ss') : '-'}
              </Col>
              <Col span={3}>
                {item.view_count}
              </Col>
              <Col span={3}>
                <Button type="primary" size="small" onClick={() => {updateArticle(item.id)}}>修改</Button>
                <Button type="danger" size="small" onClick={() => {delArticle(item.id)}}>删除</Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ArticleList;