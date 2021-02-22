"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
function isUndefined(value) {
    return value === undefined;
}
exports.isUndefined = isUndefined;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
var BaseTag = {
    async: '[object AsyncFunction]',
    func: '[object Function]',
    gen: '[object GeneratorFunction]',
    proxy: '[object Proxy]',
    null: '[object Null]',
    undefined: '[object Undefined]'
};
function isFunction(value) {
    var tag = Object.prototype.toString.call(value);
    return tag === BaseTag.async || tag === BaseTag.func;
}
exports.isFunction = isFunction;
/**
 * 获取埋点字段的唯一标记凭证
 * 依据 key 从参数中取出可以标记一个埋点的对应字段, 返回 JSON.stringify()
 */
function getToolsTrackingCertificate(params) {
    var toolsTrackingCertificate = Object.values(constant_1.ToolsTrackingUniqueKeys).reduce(function (previouse, uniqueKeys) {
        previouse[uniqueKeys] = params[uniqueKeys];
        return previouse;
    }, {});
    return JSON.stringify(toolsTrackingCertificate);
}
exports.getToolsTrackingCertificate = getToolsTrackingCertificate;
