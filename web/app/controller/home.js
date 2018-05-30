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

  async auth(){
    let user = this.ctx.session.user
    const {token, referer} = this.ctx.query || {}
    if(user || !token){
      return this.ctx.redirect(referer || '/')
    }
    user = await this.ctx.service.token.queryUserInfo(token)
    this.ctx.body = {user, token}
    if(!user){
      return this.ctx.redirect('/sso/login')
    }
    this.ctx.session.user = user
    this.ctx.session.token = token
    return this.ctx.redirect(referer || '/')
  }
}

module.exports = HomeController;
