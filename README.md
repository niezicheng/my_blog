1、在blog、server、admin文件目录下安装项目依赖：

```
npm i
```

2、启动本地MySql数据库服务，导入数据库建表文件my_blog.sql.

3、在server/config/config.default.js文件中修改相应的数据库连接配置信息为自身本地数据库对应信息。

4、运行项目：

使用下面命令依次运行server、blog、admin服务项目。

```
npm run dev || yarn dev
```

5、前后台浏览器本地运行显示地址：

[前台展示页面地址](http://localhost:3000)

[后台管理系统地址](http://localhost:3001)

