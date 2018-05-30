'use strict';

const Controller = require('egg').Controller;
const querystring = require('querystring')

class UserController extends Controller {
  async login() {
    await this.ctx.render('login')
  }

  async auth(){
    const {email, password} = querystring.parse(this.ctx.req._parsedUrl.query) || {}// this.ctx.req.query || {}
    // console.log(this.ctx.req._parsedUrl)
    const status = await this.ctx.service.auth.login({email, password})
    this.json({
      success: !!status,
      data: status && {
        token: status
      } || null
    })
  }
  json(data){
    this.ctx.status = 200
    this.ctx.set({'Content-Type': 'application/json'})
    this.ctx.body = data
  }
  async loginout(){
    const {token} = querystring.parse(this.ctx.req._parsedUrl.query) || {}
    if(!token){
      return this.json({success: false, data: null})
    }
    let res = await this.ctx.service.auth.loginout(token)
    return this.json({
      success: res == 'OK',
      data: null
    })
  }
  async queryUserInfo(){
    const {token} = querystring.parse(this.ctx.req._parsedUrl.query) || {}
    if(!token){
      return this.json({success: false, data: null})
    }
    let res = await this.ctx.service.auth.queryUserInfo(token)
    return this.json({
      success: !!res,
      data: res
    })
  }
}

module.exports = UserController;
