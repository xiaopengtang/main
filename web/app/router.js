'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/auth/sso', controller.home.auth)
  router.resources('*', controller.home.index);
};
