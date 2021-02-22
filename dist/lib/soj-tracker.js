"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var SOJTracker = /** @class */ (function (_super) {
    __extends(SOJTracker, _super);
    function SOJTracker(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.cachedExtendParameters = options;
        var SOJ = window.logger || window.loggerAction;
        if (!base_1.isUndefined(SOJ)) {
            _this.sender = function (eventData) { return SOJ.sendpv(eventData); };
        }
        return _this;
    }
    SOJTracker.prototype.serializeData = function (params) {
        // data[SOJParamsEnum.id] = params.id
        var SOJEventData = {};
        for (var _i = 0, SOJParamsEnumKeys_1 = base_1.SOJParamsEnumKeys; _i < SOJParamsEnumKeys_1.length; _i++) {
            var key = SOJParamsEnumKeys_1[_i];
            var trackParamKey = base_1.SOJParamsEnum[key];
            var trackParamValue = params[key];
            if (!base_1.isUndefined(trackParamValue)) {
                SOJEventData[trackParamKey] = trackParamValue;
            }
        }
        SOJEventData.ep = __assign(__assign({}, this.cachedExtendParameters), params);
        return SOJEventData;
    };
    return SOJTracker;
}(base_1.BaseTracker));
exports.SOJTracker = SOJTracker;
