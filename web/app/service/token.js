/**
 * 插件
 */
'use strict'

const Service = require('egg').Service

const Url = require('url')

module.exports = class TokenService extends Service {
    async connectSsoCenter(token, type){
        type = type || 'QUERY:USER'
        const host = {
            host: '127.0.0.1',
            port: '7004',
            pathname: ({
                'QUERY:USER': '/sso/queryUserInfo',
                'LOGINOUT': '/sso/loginout'
            })[type]
        }
        const url = decodeURIComponent(Url.format({
            host: [host.host, host.port].join(':'),
            protocol: host.protocol || 'http:',
            pathname: host.pathname//this.ctx.req.url,
        }))
        console.log({url})
        const result = await new Promise(resolve => this.ctx.curl(url, {
            method: 'get',//this.ctx.req.method,
            data: {token}
        }).then(resolve).catch(e => {
            this.app.logger.info(e)
            resolve()
        })) 
        const res = result && JSON.parse(result.data.toString()) || null
        return res && res.data || null
    }
    async loginout(token){
        return await this.connectSsoCenter(token, 'LOGINOUT')
    }
    /**
     *  
     * @param requestCtrl 用户请求
     */
    async queryUserInfo(token){
        return await this.connectSsoCenter(token)
        // const url = this.getAuthUrl()
        // const result = await new Promise(resolve => this.ctx.curl(url, {
        //     method: 'get',//this.ctx.req.method,
        //     data: {token}
        // }).then(resolve).catch(e => {
        //     this.app.logger.info(e)
        //     resolve()
        // })) 
        // return result && JSON.parse(result.data.toString()) || null
    }
}