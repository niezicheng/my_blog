import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Input, Select, Button, DatePicker, message, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

import marked from 'marked';
import moment from 'moment';

import {
  getTypeInfo,
  addArticle,
  updateArticle,
  getArticleById
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
  const [time,setTime] = useState()   //发布或更新日期
  const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType,setSelectType] = useState('请选择类型') //选择的文章类别
  const [statusText, setStatusText] = useState('发布'); // 文章操作按钮

  /**
   * 获取文章类型信息
   */
  const getTypeMessage = useCallback(() => {
    getTypeInfo().then(res => {
      const value = res.data.data;
      if(value === '没有登录') {
        localStorage.removeItem('openId');
        props.history.push('/');
      } else {
        setTypeInfo(value);
      }
    })
  }, [props.history]);

  useEffect(() => {
    localStorage.removeItem('openId');
    getTypeMessage();
    // 获取文章id
    const { id } = props.match.params;
    if(id) {
      setArticleId(id);
      setStatusText('更新');
      getArticleInfoById(id)
    }
  }, [getTypeMessage, props.match.params]);

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
   * 绑定文章内容富文本框内容
   * @param {*} e 
   */
  const changeContent = (e) => {
    const { value } = e.target;
    setArticleContent(value);
    let html = marked(value);
    setMarkdownContent(html || '预览内容');
    
    
  }

  /**
   * 绑定文章简介富文本框内容
   * @param {*} e 
   */
  const changIntroduce = (e) => {
    const { value } = e.target;
    setIntroduce(value);
    const html = marked(value);
    setMarkdownIntro(html || '等待编辑');
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
    } else if (!time) {
      message.error(`${statusText}日期不能为空`);
      return false;
    }

    // 封装博文信息内容
    const articleInfo = {};
    articleInfo.type_id = selectedType;
    articleInfo.title = articleTitle;
    articleInfo.article_content = articleContent;
    articleInfo.introduce = introduce;

    // 发布文章
    if(articleId === 0) {
      articleInfo.createAt = (new Date(time).getTime());
      articleInfo.view_count = 0;
      addArticle(articleInfo).then(res => {
        const { insertId, isSuccess } = res.data;
        setArticleId(insertId);
        if(isSuccess) {
          message.success('发布成功');
          setStatusText('更新');
        } else {
          message.error('发布失败');
        }
      })
    } else {
      // 更新文章
      articleInfo.updateAt = (new Date(time).getTime());
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

  /**
   * 通过文章id获取文章内容信息
   * @param {文章id} id 
   */
  const getArticleInfoById = (id) => {
    getArticleById(id).then(res => {
      const articleInfo = res.data.data[0];
      setArticleTitle(articleInfo.title);
      setArticleContent(articleInfo.article_content);
      const html = marked(articleInfo.article_content);
      setMarkdownContent(html);
      setIntroduce(articleInfo.introduce);
      const introHtml = marked(articleInfo.introduce);
      setMarkdownIntro(introHtml);
      setSelectType(articleInfo.typeId);
    });
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={[12, 12]} >
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="文章标题"
                size="middle"
                onChange={e => {setArticleTitle(e.target.value)}}
              />
            </Col>
            <Col span={4}>
              <Select style={{ width: '7rem' }} value={selectedType} defaultValue={selectedType} size="middle" onChange={selectTypeHandle}>
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
                placeholder="文章内容"
                value={articleContent}
                onChange={changeContent}
                allowClear
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
          <Row gutter={[0, 12]}>
            <Col span={24}>
              <Button size="middle" style={{ marginRight: '.6rem' }}>暂存</Button>
              <Button type="primary" size="middle" onClick={publishArticle}>{statusText}</Button>
              <Tooltip placement="topRight" title='Makedown基本用法'>
                <a href='https://www.jianshu.com/p/f3a872c4379b' target='_blank'>
                  <InfoCircleOutlined style={{ fontSize: '1.2rem', marginLeft: '5rem' }} />
                </a>
              </Tooltip>
            </Col>
            <Col span={24}>
              <TextArea
                className="introduce-markdown"
                rows={4}
                placeholder="文章简介"
                value={introduce}
                onChange={changIntroduce}
                allowClear
              />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML = {{ __html: markdownIntro }}
              ></div>
            </Col>
            <Col span={9}>
              <div className="date-Text">
                {`${statusText}日期:`}
              </div>
            </Col>
            <Col span={15}>
              <div className="date-select">
                <DatePicker
                  placeholder={`${statusText}日期`}
                  size="middle"
                  disabledDate={(current => (current > moment().endOf('day')))}
                  onChange={(date, dateString) => {
                    const time = moment(date).format("YYYY-MM-DD HH:mm:ss")
                    setTime(time)
                  }}
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