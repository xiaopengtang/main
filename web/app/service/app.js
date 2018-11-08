/**
 * 插件
 */
'use strict'

const Service = require('egg').Service

const Url = require('url')

module.exports = class AppService extends Service {

    async queryAllowHost(){
        let list = await this.ctx.service.service.getCanUseServiceList()
        // console.log({list})
        if(!list){
            return
        }
        const url = this.ctx.req.url
        return list.filter(info => {
            // console.log({info})
            const r = new RegExp(info.rules)
            return r.test(url)
        }).sort((next, pre) => next.level - pre.level).pop()
    }
    /**
     *  
     * @param requestCtrl 用户请求
     */
    async curl(){
        const host = await this.queryAllowHost()
        if(!host){
            return 
        }
        const url = decodeURIComponent(Url.format({
            host: [host.host, host.port].join(':'),
            protocol: host.protocol || 'http:',
            pathname: this.ctx.req.url,
        }))
        console.log({url})
        const result = await new Promise(resolve => this.ctx.curl(url, {
            method: this.ctx.req.method,
            headers: this.ctx.req.headers,
            data: this.ctx.req.method === 'post' ? this.ctx.req.body : null
        }).then(resolve).catch(e => {
            this.app.logger.info(e)
            resolve()
        })) 
        // console.log(this.ctx.req.headers)
        // console.log({url, result})
        // console.log(url, result.data.toString())
        return result
    }
}