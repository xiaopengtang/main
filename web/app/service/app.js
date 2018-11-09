/**
 * 插件
 */
'use strict'

const Service = require('egg').Service
const fs = require('fs');
const FormStream = require('formstream')
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
        let url = Url.format({
            host: [host.host, host.port].join(':'),
            protocol: host.protocol || 'http:',
            pathname: this.ctx.path,
        })
        if(this.ctx.querystring){
            url += `?${encodeURIComponent(this.ctx.querystring)}`
        }
        
        let options = {
            method: this.ctx.req.method,
            headers: this.ctx.req.headers
        }
        if(/post/i.test(options.method)){
            const form = new FormStream()
            let filename = ''
            const reader = () => new Promise(async(resolve) => {
                const readerStream = await this.ctx.getFileStream()
                filename = readerStream.filename
                // let data = ''
                let arr = []
                // readerStream.setEncoding('UTF8')
                readerStream.on('data', chunk => {
                    arr.push(Buffer.from(chunk, 'binary'))
                });
                readerStream.on('end', () => {
                    let len = 0
                    arr.forEach(it => len += it.length)
                    resolve(Buffer.concat(arr, len))
                })
                readerStream.on('error', e => resolve(null))
            })
            const buffer = await reader()
            form.buffer('file', buffer, filename)
            // options.dataType = 'json'
            options.headers = form.headers()
            // delete options.headers //form.headers()
            // console.log(['stream.fields', stream]);
            options.stream = form //fs.createReadStream(this.ctx.req.body)
        }
        // console.log({url, options})
        const result = await new Promise(resolve => this.ctx.curl(url, options
            // {
            // method: this.ctx.req.method,
            // headers: this.ctx.req.headers,
            // stream: this.ctx.req.method === 'post' ? this.ctx.req.body : null,
            // contentType: 'json',
            // // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
            // dataType: 'json',
        // }
        ).then(resolve).catch(e => {
            this.app.logger.info(e)
            resolve()
        })) 
        // console.log(this.ctx.req.headers)
        // console.log({url, result})
        // console.log(url, result.data.toString())
        return result
    }
}