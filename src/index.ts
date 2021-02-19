import { TrackerParamsUnion, patches, isUndefined, isFunction, isString } from './base'

import { SOJTracker } from './soj-tracker'
import { WMDATracker } from './wmda-tracker'
import { trackerForAntdvForm } from './tracker-for-antdv-form'

type TrackerProps = ConstructorParameters<typeof WMDATracker>[number] & ConstructorParameters<typeof SOJTracker>[number]

type AspectFunction<T extends (args?, result?) => any> = (args: Parameters<T>, result: ReturnType<T>) => TrackerParamsUnion

type TrackerParams = string | TrackerParamsUnion

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

  static track(params: TrackerParams | AspectFunction<any>) {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
      /** 是构造函数, 装饰在类上 */
      // target === target.prototype.constructor &&

      if (isUndefined(propertyKey) && isUndefined(descriptor)) {
        return TrackClass(params)
      }

      return TrackClassMethod(params, descriptor)
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
    result.then ? result.then(tracking) : tracking(result)

    return result
  }
  return descriptor
}

function TrackClass(params: any) {
  console.log(params)

  // return function <T extends { new (...args: any[]): {} }>(constructor: T) {
  //   console.log(constructor)
  //   return class extends constructor {
  //     constructor(...rest){
  //       super(rest)

  //     }
  //   }
  // }
}

function getChangeHandler(fieldsMapping: Record<string, string | number>, onValuesChange?: (name, action, event) => TrackerParamsUnion) {
  return (name, action, event) => {
    const params = isFunction(onValuesChange) ? onValuesChange(name, action, event) : {}
    const Key = fieldsMapping[name]

    Tracker.send({ Key, name, ...params })
  }
}

interface TrackOptions {
  onValuesChange?: (name, value, old) => TrackerParamsUnion
  fieldsMapping?: Record<string, string | number>
}
function trackForm(context, options: TrackOptions = {}) {
  const { fieldsMapping = {}, onValuesChange } = options

  if (trackerForAntdvForm.isAntdvForm(context)) {
    const handleChange = getChangeHandler(fieldsMapping, onValuesChange)
    trackerForAntdvForm(context, handleChange)
  }
}

// function trackData(context, options: TrackOptions = {}) {
//   const { fieldsMapping, onValuesChange } = options
//   const data = isString(options.data) ? [options.data] : options.data

//   if (trackerForVueData.isVueData(context, data)) {
//     const handleChange = getChangeHandler(fieldsMapping, onValuesChange)
//     trackerForVueData(context, data, handleChange)
//   }
// }
export default Tracker
window.Tracker = Tracker

declare global {
  interface Window {
    logger?: any
    loggerAction?: any
    WMDA_SDK_CONFIG?: any
    WMDA_REPORT?: any
    Tracker?: Tracker
  }
}
