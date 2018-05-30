'use strict';

const Controller = require('egg').Controller;
const querystring = require('querystring')

class UserController extends Controller {
  async login() {
    // this.ctx.session.token = null
    // const {referer} = this.ctx.query || {}
    const token = this.ctx.session.token
    const {referer} = this.ctx.query || {}
    const user = token && await this.ctx.service.auth.queryUserInfo(token) || null
    if(!user){
      return await this.ctx.render('login', {referer})
    }
    
    // if(!referer){
    //   this.ctx.status = 200
    //   this.ctx.body = 'you has login'
    // }else{
      // referer += '&'
      this.ctx.redirect(referer || '/')
    // }
  }

  async auth(){
    let token = this.ctx.session.token
    if(token){
      return this.json({
        success: true,
        data: {url: '/auth/sso?token='+token}
      })
    }
    const {email, password} = this.ctx.query || {}// this.ctx.req.query || {}
    // console.log(this.ctx.req._parsedUrl)
    const status = await this.ctx.service.auth.login({email, password})
    if(status){
      this.ctx.session.token = status
    }
    // const url = '/auth/sso?token='
    const data = status && {url: '/auth/sso?token='+status} || null
    this.json({
      success: !!status,
      data
    })
  }
  json(data){
    this.ctx.status = 200
    this.ctx.set({'Content-Type': 'application/json'})
    this.ctx.body = data
  }
  async loginout(){
    
    let {token} = this.ctx.query || {}
    token = token || this.ctx.session.token
    if(!token){
      return this.json({success: false, data: null})
    }
    let res = await this.ctx.service.auth.loginout(token)
    this.ctx.session.token = res == 'OK' ? null : this.ctx.session.token
    return this.json({
      success: res == 'OK',
      data: null
    })
  }
  async queryUserInfo(){
    const {token} = this.ctx.query || {}
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
