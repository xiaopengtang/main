
'use strict'

const Service = require('egg').Service
const crypto = require('crypto')

const md5 = str => {
    let md5 = crypto.createHash("md5")
    md5.update(str)
    return md5.digest('hex')
}

module.exports = class Auth extends Service {
    // 创建token
    createToken(info){
        const {key, field} = this.app.config.token || {}
        const str = field.map(name => info[name] || '').join(',')
        return md5(`${key}@${str}`)
    }
    // 
    async login(where){
        where.password = md5(`${this.app.config.token.prefix}@${where.password || ''}`)
        let info = await this.app.mysql.select('user_base', {
            where,
            columns: ['id', 'name', 'email', 'faceUrl']
        })
        info = Array.isArray(info) && info[0]
        if(!info){
            return 
        }
        const token = this.createToken(info)
        let status = await this.app.redis.set(token, JSON.stringify(info), 'EX', this.app.config.token.expire)
        return status == 'OK' && token 
    }
    // 
    async loginout(token){
        return await this.app.redis.set(token, null, 'EX', this.app.config.token.expire)
    }
    //
    async queryUserInfo(token){
        const res = await this.app.redis.get(token)
        return res && JSON.parse(res) || null
    }
}