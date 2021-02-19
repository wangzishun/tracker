import { ToolsTrackingUniqueKeys, TrackerParamsUnion } from './constant'

export function isUndefined(value): value is undefined {
  return value === undefined
}

export function isString(value): value is string {
  return typeof value === 'string'
}

const BaseTag = <const>{
  async: '[object AsyncFunction]',
  func: '[object Function]',
  gen: '[object GeneratorFunction]',
  proxy: '[object Proxy]',
  null: '[object Null]',
  undefined: '[object Undefined]'
}

export function isFunction(value): value is Function {
  const tag = Object.prototype.toString.call(value)

  return tag === BaseTag.async || tag === BaseTag.func
}

/**
 * 获取埋点字段的唯一标记凭证
 * 依据 key 从参数中取出可以标记一个埋点的对应字段, 返回 JSON.stringify()
 */
export function getToolsTrackingCertificate(params: TrackerParamsUnion) {
  const toolsTrackingCertificate = Object.values(ToolsTrackingUniqueKeys).reduce((previouse: any, uniqueKeys) => {
    previouse[uniqueKeys] = params[uniqueKeys]

    return previouse
  }, {})

  return JSON.stringify(toolsTrackingCertificate)
}
