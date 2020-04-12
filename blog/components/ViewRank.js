import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card } from 'antd'

import axios from 'axios'
import servicePath from '../config'

import '../static/style/components/viewRank.css'

const ViewRank = () => {
  const [article, setArticle] = useState([]); // 展示排行文章

  useEffect(() => {
    getArticle()
  }, [])

  // 获取文章浏览排行信息
  const getArticle = () => {
    axios(servicePath.getArticleByViewCount)
    .then(res => {
      const { data } = res.data
      console.log(data, 'jjjjjj')
      setArticle(data);
    })
  }

  return (
    <div className="view-div comm-box">
      <Card title="文章浏览排行" size="small" bordered={false}>
        {article.map(item => (
          <div key={item.Id}>
            <div className="view-title" >
              <Link href={{ pathname: '/detail', query: {id: item.Id} }}>
                <a>{item.title}</a>
              </Link>
            </div>
            <div className="view-count">{`(${item.view_count})`}</div>
          </div>
        ))}
      </Card>
    </div>
  );
}

export default ViewRank;
