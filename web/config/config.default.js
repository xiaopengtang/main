'use strict';
const path = require('path')
module.exports = appInfo => {
  const config = exports = {
    security: {
      csrf: {
        enable: false,
      }
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527055906355_2705';
 
  // add your config here
  config.middleware = [];

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '106.15.201.3',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'KdWDMQRTpxZxvoWb',
      // 数据库名
      database: 'service',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }

  exports.session = {
    key: 'MAIN_SESS',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };

  exports.static = {
    maxAge: 31536000,
    dir: path.join(appInfo.baseDir,'../static'),
  }

  return config;
};
