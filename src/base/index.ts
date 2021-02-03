/*
 * @Date         : 2021-01-29 14:18:58
 * @LastEditors  : wangzishun
 * @LastEditTime : 2021-02-01 17:43:34
 * @Description  :
 */

export * from './base-tracker'

export * from './constant'

export * from './patch'

declare global {
  interface Window {
    logger?: any
    loggerAction?: any
    WMDA_SDK_CONFIG?: any
    WMDA_REPORT?: any
  }
}
