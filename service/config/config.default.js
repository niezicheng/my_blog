/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1584197174050_3227';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  // 连接数据库相关配置信息
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'root',
      // database
      database: 'my_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  // 跨域请求相关配置信息
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: [ '*' ]
  };

  config.cors = {
    // origin: '*', //允许所有请求源进行访问接口
    origin: 'http://localhost:3000', //只允许这个域进行访问接口
    credentials: true,   // 开启认证,允许cookie可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS' // 允许请求的方式
  };

  return {
    ...config,
    ...userConfig,
  };
};
