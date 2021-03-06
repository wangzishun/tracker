import { isUndefined } from './utils'
import { TrackerParamsUnion } from './constant'

type STATUS = 'PREPARE' | 'READY'
/**
 * Tracker
 * 需要子类自行实现 [ sernder, serializeData ]
 * sernder (EventData)=>void 发码的实际执行方法, 入参为 serializeData 的返回值
 * serializeData: (TrackerParamsUnion)=>EventData 格式化发送的数据格式, 返回值作为 sender 的入参
 */
export abstract class BaseTracker {
  /**
   * 发送序列化后的数据
   */
  send(params: TrackerParamsUnion) {
    if (isUndefined(this.sender)) {
      // this.sender = console.log
      return
    }

    if (isUndefined(this.serializeData)) {
      throw new Error('需要实现 serializeData 方法')
    }

    const serializeData = this.serializeData(params)

    this.sender(serializeData)
  }

  STATUS: STATUS = 'PREPARE'

  isReady() {
    if (this.STATUS === 'READY') {
      return true
    }

    if (isUndefined(this.sender)) {
      return false
    }

    this.STATUS = 'READY'
    return true
  }

  isPrepare() {
    return !this.isReady()
  }

  abstract sender

  abstract serializeData(params: TrackerParamsUnion): any
}
