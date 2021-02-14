

export * from './base-tracker'

export * from './constant'

export * from './patchs'

export * from './utils'

declare global {
  interface Window {
    logger?: any
    loggerAction?: any
    WMDA_SDK_CONFIG?: any
    WMDA_REPORT?: any
  }
}
