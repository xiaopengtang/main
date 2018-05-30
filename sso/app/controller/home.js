'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = this.app.config.token//'hi, egg';
  }
}

module.exports = HomeController;
