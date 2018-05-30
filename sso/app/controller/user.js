'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    // this.ctx.body = 'hi, egg';
    await this.ctx.render('login')
  }

  async ath(){}
}

module.exports = UserController;
