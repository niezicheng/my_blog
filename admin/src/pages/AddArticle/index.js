import React, { useState } from 'react';
import { Row, Col, Input, Select, Button, DatePicker } from 'antd';

import marked from 'marked';

import './index.css';

const { Option } = Select;
const { TextArea } = Input;

const AddArticle = () => {
  const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle,setArticleTitle] = useState('')   //文章标题
  const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introduce,setIntroduce] = useState()            //简介的markdown内容
  const [markdownIntro, setMarkdownIntro] = useState('等待编辑') //简介的html内容
  const [createAt,setCreateAt] = useState()   //发布日期
  const [updateAt,setUpdateAt] = useState() //修改日志的日期
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState(1) //选择的文章类别

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

  // 绑定博客内容富文本框内容
  const changeContent = (e) => {
    const { value } = e.target;
    setArticleContent(value);
    let html = marked(value);
    setMarkdownContent(html);
  }

  // 绑定博客简介富文本框内容
  const changIntroduce = (e) => {
    const { value } = e.target;
    setIntroduce(value);
    const html = marked(value);
    setMarkdownIntro(html);
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input 
                placeholder="博客标题"
                size="middle"
              />
            </Col>
            <Col span={4}>
              <Select defaultValue="1" size="middle">
                <Option value="1">视频教程</Option>
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
              <Button type="primary" size="middle">发布</Button>
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