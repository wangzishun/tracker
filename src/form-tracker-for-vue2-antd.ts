/*
 * @Date         : 2021-02-03 17:42:38
 * @LastEditors  : wangzishun
 * @LastEditTime : 2021-02-03 18:26:40
 * @Description  :
 */
import { isEmpty, isFunction, isUndefined } from 'lodash-es'

type onValuesChange = (name: string, newValue, oldValue) => void

/** 表单字段在 form 对象中的路径, 我们需要依赖这个路径进行 watch */
const WATCH_PATH = 'fieldsStore.fields'

/**
 * 表单埋点, 基于 [ant design vue ^1.x] 版本的form表单埋点 [Vue version ^2.x]
 * @see 通过 watch 监听表单的每个字段变更
 * @param form
 * @param Vue 需要创建 Vue 实例
 * @param onValuesChange 字段变更时执行的回调
 */
export const formTrackerForAntdVueV1 = (form: any, Vue: any, onValuesChange: onValuesChange) => {
  /** 保存一下引用, 否则无法监听里面的fields字段 */
  const fieldsStore = form.fieldsStore
  const formWatcher = new Vue({
    data() {
      return {
        fieldsStore,
        unwatchMap: new Map<string, Function>()
      }
    },
    /** 组件卸载后解除 watch */
    beforeDestroy() {
      this.unwatchMap.forEach((unwatch) => unwatch())
    }
  })

  formWatcher.$watch(WATCH_PATH, function (newestFields) {
    const addedFields = []

    for (const name in newestFields) {
      if (!Object.prototype.hasOwnProperty.call(newestFields, name)) continue

      if (this.unwatchMap.has(name)) continue

      addedFields.push(name)
    }

    if (isEmpty(addedFields)) return

    addedFields.forEach((name) => {
      /**
       * 监听目标表单字段值 fieldsStore.fields.XXXXXXXXX.value
       */
      const path = [WATCH_PATH, name, 'value'].join('.')
      const unwatch = formWatcher.$watch(
        path,
        function (newVal, oldVal) {
          if (isUndefined(onValuesChange)) {
            return
          }
          onValuesChange(name, newVal, oldVal)
        },
        { immediate: true }
      )
      this.unwatchMap.set(name, unwatch)
    })
  })
  formWatcher
  return formWatcher
}
