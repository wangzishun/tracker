"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 表单埋点
 * 通过 watch 监听表单的每个字段变更
 * @param form
 * @param onValuesChange 字段变更时执行的回调
 */
exports.trackerForVueData = function (context, properties, onValuesChange) {
    /** 保存一下引用, 否则无法监听里面的fields字段 */
    console.log(context);
    var Vue = context.$options._base;
    var data = context.$data;
    if (properties.length > 0) {
        data = properties.reduce(function (previouse, property) {
            previouse[property] = context.$data[property];
            return previouse;
        }, {});
    }
    var dataWatcher = new Vue({
        data: function () {
            return {
                data: data,
                unwatchMap: new Map()
            };
        },
        /** 组件卸载后解除 watch */
        beforeDestroy: function () {
            this.unwatchMap.forEach(function (unwatch) { return unwatch(); });
        }
    });
    dataWatcher.$watch('data', function (newestFields) {
        console.log(newestFields);
        var addedFields = [];
        for (var name_1 in newestFields) {
            if (!Object.prototype.hasOwnProperty.call(newestFields, name_1))
                continue;
            if (this.unwatchMap.has(name_1))
                continue;
            addedFields.push(name_1);
        }
        if (addedFields.length === 0)
            return;
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
    }, { deep: true });
    window.dataWatcher = dataWatcher;
    // return dataWatcher
};
exports.trackerForVueData.isVueData = function (context, properties) {
    return context._isVue === true && true;
};
