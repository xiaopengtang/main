'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const {ctx} = this
    // this.ctx.body = JSON.stringify(this.ctx.req.url)//this.ctx.req.url
    const result = await ctx.service.app.curl()
    // console.log({result})
    if(!result){
      ctx.status = 404
      return ctx.body = 'Can not find Serive'
    }
    ctx.status = result.status;
    ctx.set(result.headers);
    ctx.body = result.data;
  }
}

module.exports = HomeController;
