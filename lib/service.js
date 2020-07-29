
// @log @config
export default class Service {
  constructor (opt = {}) {
    this.context = null
    this.app = opt.app
    this.service = opt.service
    this.config = opt.config
    this.curl = opt.curl
    this.log = opt.log
  }
  set ctx (v) {
  	this.context = v
  }
  get ctx () {
  	return this.context
  }
}
