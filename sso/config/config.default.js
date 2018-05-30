'use strict';
const path = require('path')
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1527649616073_2359';

  // add your config here
  config.middleware = [];

  config.token = {
    key: 'ssocenter_1316000828x',
    field: ['id', 'email', 'name'],
    expire: 24 * 60 * 1000,
    prefix: '!!@#$%^&@#$$%%^^&&**)(_+'
  }

  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view'),
      // path.join(appInfo.baseDir, 'path/to/another'),
    ].join(','),
    cache: true,
    defaultExtension: '.html',
    defaultViewEngine: 'nunjucks'
  };
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0,
    },
  }
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
      database: 'sso',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }

  return config;
};
