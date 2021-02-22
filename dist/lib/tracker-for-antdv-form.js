"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
/**
 * 表单埋点, 基于 [ant design vue ^1.x] 版本的form表单埋点 [Vue version ^2.x]
 * @param formContext
 * @param onValuesChange 字段变更时执行的回调
 */
exports.trackerForAntdvForm = function (formContext, onValuesChange) {
    var cachedOnCollectCommon = formContext.onCollectCommon;
    formContext.onCollectCommon = function (name, action, args) {
        try {
            if (onValuesChange) {
                onValuesChange(name, action, args);
            }
        }
        catch (error) {
        }
        finally {
            return cachedOnCollectCommon(name, action, args);
        }
    };
};
exports.trackerForAntdvForm.isAntdvForm = function (form) {
    return form._isVue === true && !base_1.isUndefined(form.fieldsStore) && !base_1.isUndefined(form.formItems);
};
