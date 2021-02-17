
import { isUndefined } from './base'
import { BaseTracker, SOJParamsEnum, SOJParamsEnumKeys, SOJParamsEnumKeysUnion, TrackerParamsUnion } from './base'

type SOJTrackerProps = Record<string, any>

export class SOJTracker extends BaseTracker {
  constructor(options: SOJTrackerProps = {}) {
    super()

    this.cachedExtendParameters = options
    const SOJ = window.logger || window.loggerAction
    if (!isUndefined(SOJ)) {
      this.sender = (eventData) => SOJ.sendpv(eventData)
      return this
    }

    return undefined
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

    SOJEventData.ep = { ...this.cachedExtendParameters, ...params }

    return SOJEventData
  }
}
