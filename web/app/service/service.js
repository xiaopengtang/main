/**
 * Service
 */
'use strict'

const Service = require('egg').Service

module.exports = class Index extends Service {
    async getCanUseServiceList(){
        let res = await this.app.mysql.select('service', {status: 1})
        return res || []
    }
}