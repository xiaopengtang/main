const Base = require('./base.js');

module.exports = class extends Base {
  async indexAction() {
    const list = await this.model('article').getList()
    console.log({list})
    return this.display();
  }
};
