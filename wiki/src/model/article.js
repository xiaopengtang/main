module.exports = class article extends think.Model {
    async getList(){
        return await this.select()
    }
}