/*
 * @Date         : 2021-01-28 13:40:40
 * @LastEditors  : wangzishun
 * @LastEditTime : 2021-02-12 22:28:12
 * @Description  :
 */

import { isUndefined, omit } from 'lodash-es'
import { BaseTracker, WMDAParamsEnum, TrackerParamsUnion, WMDAParamsEnumKeysUnion, WMDAParamsEnumKeys } from './base'

type WMDATrackerProps = Record<string, any>

export class WMDATracker extends BaseTracker {
  /**
   * 初始化时保存扩展参数, 后续的每次发码都会带上扩展参数
   *
   */
  constructor(options: WMDATrackerProps = {}) {
    super()

    this.cachedExtendParameters = options
    if (!isUndefined(window.WMDA_REPORT)) {
      // this.sender = (eventData) => window.WMDA_REPORT('custom', eventData)
      this.sender = (eventData) => window.WMDA_REPORT('custom', eventData)
    }
  }

  /** 扩展参数 */
  cachedExtendParameters

  sender

  /**
   * 依据映射 WMDAParamsEnum 取出关键的key
   * @param params
   */
  serializeData(params: TrackerParamsUnion) {
    // data[WMDAParamsEnum.id] = params.id
    const WMDAEventData: Partial<Record<WMDAParamsEnumKeysUnion, any>> = {}

    for (const key of WMDAParamsEnumKeys) {
      const trackParamKey = WMDAParamsEnum[key]
      const trackParamValue = params[key]

      if (!isUndefined(trackParamValue)) {
        WMDAEventData[trackParamKey] = trackParamValue
      }
    }

    const extendParameters = {
      /** 映射之外的参数一律当作扩展参数 */
      ...omit(params, WMDAParamsEnumKeys),
      ...this.cachedExtendParameters
    }

    return Object.assign({}, WMDAEventData, extendParameters)
  }
}
