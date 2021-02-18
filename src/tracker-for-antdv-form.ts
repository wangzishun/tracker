import { isUndefined } from './base'

/** 表单字段在 form 对象中的路径, 我们需要依赖这个路径进行 watch */
const WATCH_PATH = 'fieldsStore.fields'

/**
 * 表单埋点, 基于 [ant design vue ^1.x] 版本的form表单埋点 [Vue version ^2.x]
 * @param formContext
 * @param onValuesChange 字段变更时执行的回调
 */
export const trackerForAntdvForm = (formContext, onValuesChange) => {
  const cachedOnCollectCommon = formContext.onCollectCommon
  formContext.onCollectCommon = function (name, action, args) {
    try {
      if (onValuesChange) {
        onValuesChange(name, action, args)
      }
    } catch (error) {
    } finally {
      return cachedOnCollectCommon(name, action, args)
    }
  }

}

trackerForAntdvForm.isAntdvForm = function (form) {
  return (
    form._isVue === true &&
    !isUndefined(form.fieldsStore) &&
    !isUndefined(form.formItems)
  )
}
