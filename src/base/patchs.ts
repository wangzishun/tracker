

import { getToolsTrackingCertificate, isUndefined } from './utils'
import { TrackerParamsUnion } from './constant'

// const sleep = () => new Promise((resolve) => setTimeout(resolve, Interval))
const map = new Map<any, InstanceType<typeof TimeSpan>>()

const Interval = 666 as const
class TimeSpanBase {
  timer

  sleepDebouncing(interval) {
    this.clearTimeout()
    return new Promise((resolve) => {
      this.timer = setTimeout(() => {
        resolve(this.timer)
        this.clearTimeout()
      }, interval)
    })
  }

  /** 释放 resolve */
  clearTimeout() {
    clearTimeout(this.timer)
    this.timer = null
  }
}

class TimeSpan extends TimeSpanBase {
  span

  constructor() {
    super()
    this.span = new Date().getTime()
  }

  async getSpan() {
    await this.sleepDebouncing(Interval)

    this.span = new Date().getTime() - this.span

    if (this.span > Interval + 50) {
      return this.span
    }
  }

}

/**
 * 时间间隔的补丁字段
 */
const timeSpanPatch = async (params: TrackerParamsUnion) => {

  const key = getToolsTrackingCertificate(params)
  let timeSpan = map.get(key)

  if (isUndefined(timeSpan)) {
    timeSpan = new TimeSpan()
    map.set(key, timeSpan)
  }

  const span = await timeSpan.getSpan()
  map.delete(key)

  if (span) {
    return { timeSpan: span }
  }
}


export async function patches(params, options?) {
  try {
    const result = await Promise.all([timeSpanPatch(params)])

    return Object.assign({}, params, ...result)
  } catch (error) {
    console.error('[tracker] tracker patch error.. ', error)
  }
}
