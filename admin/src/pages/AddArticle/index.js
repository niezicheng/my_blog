import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd';

import marked from 'marked';
import {
  getTypeInfo,
  addArticle,
  updateArticle
} from './service';

import './index.css';

const { Option } = Select;
const { TextArea } = Input;

const AddArticle = (props) => {
  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introduce,setIntroduce] = useState()            //简介的markdown内容
  const [markdownIntro, setMarkdownIntro] = useState('等待编辑') //简介的html内容
  const [createAt,setCreateAt] = useState()   //发布日期
  const [updateAt,setUpdateAt] = useState() //修改日志的日期
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState('请选择类型') //选择的文章类别
  const [btnStatus, setBtnStatus] = useState('发布'); // 文章操作按钮

  useEffect(() => {
    localStorage.removeItem('openId');
    getTypeMessage()
  }, []);

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: true
  });

  /**
   * 绑定博客内容富文本框内容
   * @param {*} e 
   */
  const changeContent = (e) => {
    const { value } = e.target;
    setArticleContent(value);
    let html = marked(value);
    setMarkdownContent(html);
  }

  /**
   * 绑定博客简介富文本框内容
   * @param {*} e 
   */
  const changIntroduce = (e) => {
    const { value } = e.target;
    setIntroduce(value);
    const html = marked(value);
    setMarkdownIntro(html);
  }

  /**
   * 获取文章类型信息
   */
  const getTypeMessage = () => {
    getTypeInfo().then(res => {
      const value = res.data.data;
      if(value === '没有登录') {
        localStorage.removeItem('openId');
        props.history.push('/');
      } else {
        setTypeInfo(value);
      }
    })
  }

  /**
   * 选择文章类型change函数
   */
  const selectTypeHandle = (value) => {
    setSelectType(value);
  }

  /**
   * 发布文章内容
   */ 
  const publishArticle = () => {
    if(selectedType === '请选择类型') {
      message.error('请选择文章类型');
      return false;
    } else if (!articleTitle) {
      message.error('文章标题不能为空');
      return false;
    } else if (!articleContent) {
      message.error('文章内容不能为空');
      return false;
    } else if (!introduce) {
      message.error('文章简介不能为空');
      return false;
    } else if (!createAt) {
      message.error('发布日期不能为空');
      return false;
    }

    // 封装博文信息内容
    const articleInfo = {};
    articleInfo.type_id = selectedType;
    articleInfo.title = articleTitle;
    articleInfo.article_content = articleContent;
    articleInfo.introduce = introduce;
    const date = createAt.replace('-', '/');
    articleInfo.createAt = (new Date(date).getTime())/1000;
    
    // 发布文章
    if(articleId === 0) {
      articleInfo.view_count = 0;
      addArticle(articleInfo).then(res => {
        const { insertId, isSuccess } = res.data;
        setArticleId(insertId);
        if(isSuccess) {
          message.success('发布成功');
          setBtnStatus('更新');
        } else {
          message.error('发布失败');
        }
      })
    } else {
      // 更新文章
      articleInfo.id = articleId;
      updateArticle(articleInfo).then(res => {
        const { isSuccess } = res.data;
        if(isSuccess) {
          message.success('更新成功');
        } else {
          message.error('更新失败');
        }
      })
    }
    
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                size="middle"
                onChange={e => {setArticleTitle(e.target.value)}}
              />
            </Col>
            <Col span={4}>
              <Select defaultValue={selectedType} size="middle" onChange={selectTypeHandle}>
                {typeInfo.map(item => {
                  return (
                    <Option key={item.Id} value={item.Id} >
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown"
                rows={30}
                placeholder="博客内容"
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div 
                className="show-html"
                dangerouslySetInnerHTML = {{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="middle">暂存</Button>
              <Button type="primary" size="middle" onClick={publishArticle}>{btnStatus}</Button>
            </Col>
            <Col span={24}>
              <TextArea
                rows={4}
                placeholder="博客简介"
                onChange={changIntroduce}
              />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML = {{ __html: markdownIntro }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="middle"
                  onChange={(date, dateString) => {setCreateAt(dateString)}}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;