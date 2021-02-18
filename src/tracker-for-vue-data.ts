/**
 * 表单埋点
 * @see 通过 watch 监听表单的每个字段变更
 * @param form
 * @param onValuesChange 字段变更时执行的回调
 */
export const trackerForVueData = (
  context,
  properties: string[],
  onValuesChange,
) => {
  /** 保存一下引用, 否则无法监听里面的fields字段 */
  console.log(context)

  const Vue = context.$options._base
  let data = context.$data
  if (properties.length > 0) {
    data = properties.reduce((previouse: any, property) => {
      previouse[property] = context.$data[property]
      return previouse
    }, {})
  }

  const dataWatcher = new Vue({
    data() {
      return {
        data,
        unwatchMap: new Map<string, Function>(),
      }
    },
    /** 组件卸载后解除 watch */
    beforeDestroy() {
      this.unwatchMap.forEach(unwatch => unwatch())
    },
  })

  dataWatcher.$watch(
    'data',
    function (newestFields) {
      console.log(newestFields)

      const addedFields = []

      for (const name in newestFields) {
        if (!Object.prototype.hasOwnProperty.call(newestFields, name)) continue

        if (this.unwatchMap.has(name)) continue

        addedFields.push(name)
      }

      if (addedFields.length === 0) return

      // addedFields.forEach((name) => {
      //   /**
      //    * 监听目标表单字段值 fieldsStore.fields.XXXXXXXXX.value
      //    */
      //   // const path = [WATCH_PATH, name, 'value'].join('.')
      //   const unwatch = dataWatcher.$watch(
      //     function () {
      //       return this.fieldsStore.fields[name]['value']
      //     },
      //     (newVal, oldVal) => onValuesChange(name, newVal, oldVal),
      //     { immediate: true }
      //   )
      //   this.unwatchMap.set(name, unwatch)
      // })
    },
    { deep: true },
  )
  ;(window as any).dataWatcher = dataWatcher
  // return dataWatcher
}

trackerForVueData.isVueData = function (context, properties) {
  return context._isVue === true && true
}
