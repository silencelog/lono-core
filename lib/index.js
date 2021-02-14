import Koa from 'koa'
import Service from './service'
import Observer from './observer'

/**
 * Lono核心类继承koa
 */
class Core extends Koa {
  constructor (opt = {}) {
    super()
    this.opt = Object.create(opt)
    this.lono = this
    this.quoteContext = {
      ctx: this.context
    }
    // createAnonymousContext
    this.$observer = new Observer()
  }
  use (middleware) {
    // 类型fn就认为是koa中间件
    if (typeof middleware === 'object' && middleware.isLono && typeof middleware.install === 'function') {
      const fn = middleware.install(this)
      typeof fn === 'function' && super.use(fn)
      if (this.name) {
        this['_' + this.name] = middleware
        // 中间件挂载后触发消息
        this.$observer.emit(`$core:mount_${this.name}`, middleware, this)
      }
    } else if (typeof middleware === 'function') {
      super.use(middleware)
    }
    return this
  }
}

exports.Service = Service

export default Core
