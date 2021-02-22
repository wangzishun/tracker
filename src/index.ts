import { TrackerParamsUnion, patches, isUndefined, isFunction, isString } from './base'

import { SOJTracker } from './soj-tracker'
import { WMDATracker } from './wmda-tracker'
import { trackerForAntdvForm } from './tracker-for-antdv-form'

type TrackerProps = ConstructorParameters<typeof WMDATracker>[number] & ConstructorParameters<typeof SOJTracker>[number]

type AspectFunction<T extends (args?, result?) => any> = (args: Parameters<T>, result: ReturnType<T>) => TrackerParamsUnion

type TrackerParams = string | TrackerParamsUnion

type FieldsMapping = Record<string, TrackerParams>

export class Tracker {
  private static WMDATracker: WMDATracker

  private static SOJTracker: SOJTracker

  /**
   * @param params 发码参数
   * WMDA { id: event_id 事件id }
   * SOJ { action: action }
   */
  static async send(params: TrackerParams = {}) {
    /** 这里把参数变成对象 */
    const refactoredParams = isString(params) ? { key: params } : params
    const data = await patches(refactoredParams)

    new Tracker()

    Tracker.WMDATracker && Tracker.WMDATracker.send(data)
    Tracker.SOJTracker && Tracker.SOJTracker.send(data)
  }

  /**
   * 装饰器工厂函数 确定是 参数, 属性, 方法, 类
   */
  static track(params: TrackerParams | AspectFunction<any>) {
    return function (target, name?: PropertyKey, descriptor?: PropertyDescriptor) {
      if (typeof descriptor === 'number') {
        throw new Error('暂不支持参数埋点')
      } else if (isUndefined(name) && isUndefined(descriptor)) {
        throw new Error('暂不支持装饰class')
      } else if (isUndefined(descriptor) && name) {
        // 装饰属性
        TrackClassProperty.apply(this, [params, target, name])
      } else if (descriptor) {
        // 装饰方法
        return TrackClassMethod.apply(this, [params, descriptor])
      }
    }
  }

  static form(context, options?: TrackOptions) {
    try {
      trackForm(context, options)
    } catch (error) {
      // console.log(error)
    }
  }

  constructor(trackerProps?: TrackerProps) {
    if (isUndefined(Tracker.WMDATracker) || Tracker.WMDATracker.isPrepare()) {
      Tracker.WMDATracker = new WMDATracker(trackerProps)
    }

    if (isUndefined(Tracker.SOJTracker) || Tracker.SOJTracker.isPrepare()) {
      Tracker.SOJTracker = new SOJTracker(trackerProps)
    }
  }
}

/**
 * 返回一个目标"类方法"的 descriptor
 */
function TrackClassMethod(params: TrackerParams | AspectFunction<any>, descriptor: PropertyDescriptor) {
  const originalValue = descriptor.value

  descriptor.value = function (...args) {
    const result = originalValue.apply(this, args)

    const tracking = async (originalValueResult) => {
      /** 方法的话就把原函数的 入参和返回值 传进去 */
      if (isFunction(params)) {
        const AspectFunctionResult = await params.apply(this, [args, originalValueResult])
        Tracker.send(AspectFunctionResult)
      } else {
        Tracker.send(params)
      }
    }

    /** 结果有可能是异步, 异步的时候注册到回调函数上 */
    if (result && result.then) {
      result.then(tracking)
    } else {
      tracking(result)
    }

    return result
  }
  return descriptor
}

function TrackClassProperty(params: TrackerParams | AspectFunction<any>, target, name) {
  let value = target[name]

  const setter = (newProperty) => {
    if (isFunction(newProperty)) {
      value = function (...paramsRest) {
        const tracking = async (originalValueResult) => {
          /** 方法的话就把原函数的 入参和返回值 传进去 */
          if (isFunction(params)) {
            console.log(params);

            const AspectFunctionResult = await params.apply(newProperty, [paramsRest, originalValueResult])
            Tracker.send(AspectFunctionResult)
          } else {
            Tracker.send(params)
          }
        }

        const result = newProperty(paramsRest)
        if (result && result.then) {
          result.then(tracking)
        } else {
          tracking(result)
        }
      }

      return
    } else {
      Tracker.send(params)
    }
    value = newProperty
  }

  Object.defineProperty(target, name, {
    enumerable: true,
    configurable: true,
    set: setter,
    get: () => value
  })
}

function TrackClass(params: any) {
  console.log(params)

  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    console.log(constructor)
    return class extends constructor {
      constructor(...rest) {
        super(rest)
      }
      on() {}
    }
  }
}

function getChangeHandler(fieldsMapping: FieldsMapping, onValuesChange?: (name, action, event) => TrackerParamsUnion) {
  return (name, action, event) => {
    let paramsFromMapping = fieldsMapping[name]
    paramsFromMapping = isString(paramsFromMapping) ? { Key: paramsFromMapping } : paramsFromMapping

    const params = isFunction(onValuesChange) ? onValuesChange(name, action, event) : {}

    Tracker.send({ ...paramsFromMapping, name, ...params })
  }
}

interface TrackOptions {
  onValuesChange?: (name, action, event) => TrackerParamsUnion
  fieldsMapping?: FieldsMapping
}
function trackForm(context, options: TrackOptions = {}) {
  const { fieldsMapping = {}, onValuesChange } = options

  if (trackerForAntdvForm.isAntdvForm(context)) {
    const handleChange = getChangeHandler(fieldsMapping, onValuesChange)
    trackerForAntdvForm(context, handleChange)
  }
}

export default Tracker

declare global {
  interface Window {
    logger?: any
    loggerAction?: any
    WMDA_SDK_CONFIG?: any
    WMDA_REPORT?: any
    Tracker?: Tracker
  }
}
