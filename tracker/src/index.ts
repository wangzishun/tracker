import { TrackerParamsUnion, patches } from './base'
import { isUndefined, isFunction, isString } from './base'
import { SOJTracker } from './soj-tracker'
import { WMDATracker } from './wmda-tracker'
import { formTrackerForAntdVueV1 } from './form-tracker-for-vue2-antd'

export * from './form-tracker-for-vue2-antd'
type TrackerProps = ConstructorParameters<typeof WMDATracker>[number] & ConstructorParameters<typeof SOJTracker>[number]

type AspectFunction<T extends (args?, result?) => any> = (args: Parameters<T>, result: ReturnType<T>) => TrackerParamsUnion

type TrackerParams = string | TrackerParamsUnion
export class Tracker {
  private static WMDATracker: WMDATracker
  private static SOJTracker: SOJTracker

  /**
   * @param params
   * @WMDA { id: event_id 事件id }
   * @SOJ { action: action }
   */
  static async send(params: TrackerParams, ...options) {
    /** 这里把参数变成对象 */
    const refactoredParams = isString(params) ? { key: params } : params
    const data = await patches(refactoredParams)

    new Tracker()

    Tracker.WMDATracker && Tracker.WMDATracker.send(data)
    Tracker.SOJTracker && Tracker.SOJTracker.send(data)
  }

  static track(params?: TrackerParams | AspectFunction<any>) {
    return function (target, propertyKey?: string, descriptor?: PropertyDescriptor) {
      /** 是构造函数, 装饰在类上 */
      // target === target.prototype.constructor &&

      if (isUndefined(propertyKey) && isUndefined(descriptor)) {
        return TrackClass(params, target)
      }

      return TrackClassMethod(params, descriptor)
    }
  }

  static form(form, mapping?, before?) {
    if (form._isVue === true) {
      formTrackerForAntdVueV1(form, function (fieldsName, fieldsValue, oldVal) {
        if (isFunction(before)) {
          const params = before(fieldsName, fieldsValue, oldVal)
          if (!isUndefined(params)) {
            Tracker.send(params)
            return
          }
        }
        Tracker.send({ Key: '1', fieldsName, fieldsValue })
      })
    }
  }

  constructor(options?: TrackerProps) {
    if (isUndefined(Tracker.WMDATracker)) {
      Tracker.WMDATracker = new WMDATracker(options)
    }

    if (isUndefined(Tracker.SOJTracker)) {
      Tracker.SOJTracker = new SOJTracker(options)
    }
  }
}

/**
 * 返回一个目标"类方法"的 descriptor
 */
export function TrackClassMethod<T>(params: TrackerParams | AspectFunction<any>, descriptor: PropertyDescriptor) {
  const originalValue = descriptor.value

  descriptor.value = function () {
    const args = arguments
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
    result instanceof Promise ? result.then(tracking) : tracking(result)

    return result
  }
  return descriptor
}

export function TrackClass(params: any, target) {
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
