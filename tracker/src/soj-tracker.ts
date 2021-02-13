/*
 * @Date         : 2021-01-28 13:43:09
 * @LastEditors  : wangzishun
 * @LastEditTime : 2021-02-12 23:13:13
 * @Description  :
 */

import { isUndefined, omit } from 'lodash-es'
import { BaseTracker, SOJParamsEnum, SOJParamsEnumKeys, SOJParamsEnumKeysUnion, TrackerParamsUnion } from './base'

type SOJTrackerProps = Record<string, any>

export class SOJTracker extends BaseTracker {
  constructor(options: SOJTrackerProps = {}) {
    super()

    this.cachedExtendParameters = options
    const SOJ = window.logger || window.loggerAction
    if (!isUndefined(SOJ)) {
      this.sender = (eventData) => SOJ.sendpv(eventData)
    }
  }

  /** 初始化过程缓存的扩展参数 */
  cachedExtendParameters

  sender

  serializeData(params: TrackerParamsUnion) {
    // data[SOJParamsEnum.id] = params.id

    const SOJEventData: Partial<Record<SOJParamsEnumKeysUnion | 'ep', any>> = {}

    for (const key of SOJParamsEnumKeys) {
      const trackParamKey = SOJParamsEnum[key]
      const trackParamValue = params[key]

      if (!isUndefined(trackParamValue)) {
        SOJEventData[trackParamKey] = trackParamValue
      }
    }

    SOJEventData.ep = { ...this.cachedExtendParameters, ...omit(params, Object.keys(SOJParamsEnum)) }

    return SOJEventData
  }
}
