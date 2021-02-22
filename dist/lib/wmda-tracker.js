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
var WMDATracker = /** @class */ (function (_super) {
    __extends(WMDATracker, _super);
    /**
     * 初始化时保存扩展参数, 后续的每次发码都会带上扩展参数
     *
     */
    function WMDATracker(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.cachedExtendParameters = options;
        if (!base_1.isUndefined(window.WMDA_REPORT)) {
            // this.sender = (eventData) => window.WMDA_REPORT('custom', eventData)
            _this.sender = function (eventData) { return window.WMDA_REPORT('custom', eventData); };
        }
        return _this;
    }
    /**
     * 依据映射 WMDAParamsEnum 取出关键的key
     * @param params
     */
    WMDATracker.prototype.serializeData = function (params) {
        // data[WMDAParamsEnum.id] = params.id
        var WMDAEventData = {};
        for (var _i = 0, WMDAParamsEnumKeys_1 = base_1.WMDAParamsEnumKeys; _i < WMDAParamsEnumKeys_1.length; _i++) {
            var key = WMDAParamsEnumKeys_1[_i];
            var trackParamKey = base_1.WMDAParamsEnum[key];
            var trackParamValue = params[key];
            if (!base_1.isUndefined(trackParamValue)) {
                WMDAEventData[trackParamKey] = trackParamValue;
            }
        }
        var extendParameters = __assign(__assign({}, params), this.cachedExtendParameters);
        return __assign(__assign({}, WMDAEventData), extendParameters);
    };
    return WMDATracker;
}(base_1.BaseTracker));
exports.WMDATracker = WMDATracker;
