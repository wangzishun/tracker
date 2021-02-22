"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
/**
 * Tracker
 * 需要子类自行实现 [ sernder, serializeData ]
 * sernder (EventData)=>void 发码的实际执行方法, 入参为 serializeData 的返回值
 * serializeData: (TrackerParamsUnion)=>EventData 格式化发送的数据格式, 返回值作为 sender 的入参
 */
var BaseTracker = /** @class */ (function () {
    function BaseTracker() {
        this.STATUS = 'PREPARE';
    }
    /**
     * 发送序列化后的数据
     */
    BaseTracker.prototype.send = function (params) {
        if (utils_1.isUndefined(this.sender)) {
            // this.sender = console.log
            return;
        }
        if (utils_1.isUndefined(this.serializeData)) {
            throw new Error('需要实现 serializeData 方法');
        }
        var serializeData = this.serializeData(params);
        this.sender(serializeData);
    };
    BaseTracker.prototype.isReady = function () {
        if (this.STATUS === 'READY') {
            return true;
        }
        if (utils_1.isUndefined(this.sender)) {
            return false;
        }
        this.STATUS = 'READY';
        return true;
    };
    BaseTracker.prototype.isPrepare = function () {
        return !this.isReady();
    };
    return BaseTracker;
}());
exports.BaseTracker = BaseTracker;
