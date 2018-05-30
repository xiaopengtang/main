'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/sso/login', controller.user.login);
  router.get('/sso/auth', controller.user.auth);
  router.get('/sso/loginout', controller.user.loginout);
  router.get('/sso/queryUserInfo', controller.user.queryUserInfo);
};
