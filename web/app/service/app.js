/**
 * 插件
 */
'use strict'

const Service = require('egg').Service

module.exports = class AppService extends Service {

    async queryAllowHost(){
        let list = this.ctx.service.service.getCanUseServiceList()
        if(list.length === 0){
            return
        }
        const url = this.ctx.req.url
        return list.filter(info => {
            const r = new RegExp(info.rule)
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
    }
}