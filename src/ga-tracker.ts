/*
 * @Author       : wangzishun
 * @Date         : 2021-03-10 15:18:00
 * @LastEditors  : wangzishun
 * @LastEditTime : 2021-03-10 19:07:44
 * @Description  :
 */
import { isUndefined, BaseTracker, GAParamsEnum, GAParamsEnumKeys, GAParamsEnumKeysUnion, TrackerParamsUnion } from './base'

type GATrackerProps = Record<string, any>

export class GATracker extends BaseTracker {
  constructor(options: GATrackerProps = {}) {
    super()

    this.cachedExtendParameters = options
    if (!isUndefined(window.dataLayer)) {
      this.sender = (eventData) => window.dataLayer.push(eventData)
    }
  }

  /** 初始化过程缓存的扩展参数 */
  cachedExtendParameters

  sender

  serializeData(params: TrackerParamsUnion) {
    return params
  }
}
