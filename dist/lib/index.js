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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var soj_tracker_1 = require("./soj-tracker");
var wmda_tracker_1 = require("./wmda-tracker");
var tracker_for_antdv_form_1 = require("./tracker-for-antdv-form");
var Tracker = /** @class */ (function () {
    function Tracker(trackerProps) {
        if (base_1.isUndefined(Tracker.WMDATracker) || Tracker.WMDATracker.isPrepare()) {
            Tracker.WMDATracker = new wmda_tracker_1.WMDATracker(trackerProps);
        }
        if (base_1.isUndefined(Tracker.SOJTracker) || Tracker.SOJTracker.isPrepare()) {
            Tracker.SOJTracker = new soj_tracker_1.SOJTracker(trackerProps);
        }
    }
    /**
     * @param params 发码参数
     * WMDA { id: event_id 事件id }
     * SOJ { action: action }
     */
    Tracker.send = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var refactoredParams, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refactoredParams = base_1.isString(params) ? { key: params } : params;
                        return [4 /*yield*/, base_1.patches(refactoredParams)];
                    case 1:
                        data = _a.sent();
                        new Tracker();
                        Tracker.WMDATracker && Tracker.WMDATracker.send(data);
                        Tracker.SOJTracker && Tracker.SOJTracker.send(data);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * 装饰器工厂函数 确定是 参数, 属性, 方法, 类
     */
    Tracker.track = function (params) {
        return function (target, name, descriptor) {
            if (typeof descriptor === 'number') {
                throw new Error('暂不支持参数埋点');
            }
            else if (base_1.isUndefined(name) && base_1.isUndefined(descriptor)) {
                throw new Error('暂不支持装饰class');
            }
            else if (base_1.isUndefined(descriptor) && name) {
                // 装饰属性
                TrackClassProperty.apply(this, [params, target, name]);
            }
            else if (descriptor) {
                // 装饰方法
                return TrackClassMethod.apply(this, [params, descriptor]);
            }
        };
    };
    Tracker.form = function (context, options) {
        try {
            trackForm(context, options);
        }
        catch (error) {
            // console.log(error)
        }
    };
    return Tracker;
}());
exports.Tracker = Tracker;
/**
 * 返回一个目标"类方法"的 descriptor
 */
function TrackClassMethod(params, descriptor) {
    var originalValue = descriptor.value;
    descriptor.value = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = originalValue.apply(this, args);
        var tracking = function (originalValueResult) { return __awaiter(_this, void 0, void 0, function () {
            var AspectFunctionResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!base_1.isFunction(params)) return [3 /*break*/, 2];
                        return [4 /*yield*/, params.apply(this, [args, originalValueResult])];
                    case 1:
                        AspectFunctionResult = _a.sent();
                        Tracker.send(AspectFunctionResult);
                        return [3 /*break*/, 3];
                    case 2:
                        Tracker.send(params);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /** 结果有可能是异步, 异步的时候注册到回调函数上 */
        if (result && result.then) {
            result.then(tracking);
        }
        else {
            tracking(result);
        }
        return result;
    };
    return descriptor;
}
function TrackClassProperty(params, target, name) {
    var value = target[name];
    var setter = function (newProperty) {
        if (base_1.isFunction(newProperty)) {
            value = function () {
                var _this = this;
                var paramsRest = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    paramsRest[_i] = arguments[_i];
                }
                var tracking = function (originalValueResult) { return __awaiter(_this, void 0, void 0, function () {
                    var AspectFunctionResult;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!base_1.isFunction(params)) return [3 /*break*/, 2];
                                console.log(params);
                                return [4 /*yield*/, params.apply(newProperty, [paramsRest, originalValueResult])];
                            case 1:
                                AspectFunctionResult = _a.sent();
                                Tracker.send(AspectFunctionResult);
                                return [3 /*break*/, 3];
                            case 2:
                                Tracker.send(params);
                                _a.label = 3;
                            case 3: return [2 /*return*/];
                        }
                    });
                }); };
                var result = newProperty(paramsRest);
                if (result && result.then) {
                    result.then(tracking);
                }
                else {
                    tracking(result);
                }
            };
            return;
        }
        else {
            Tracker.send(params);
        }
        value = newProperty;
    };
    Object.defineProperty(target, name, {
        enumerable: true,
        configurable: true,
        set: setter,
        get: function () { return value; }
    });
}
function TrackClass(params) {
    console.log(params);
    return function (constructor) {
        console.log(constructor);
        return /** @class */ (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var rest = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    rest[_i] = arguments[_i];
                }
                return _super.call(this, rest) || this;
            }
            class_1.prototype.on = function () { };
            return class_1;
        }(constructor));
    };
}
function getChangeHandler(fieldsMapping, onValuesChange) {
    return function (name, action, event) {
        var paramsFromMapping = fieldsMapping[name];
        paramsFromMapping = base_1.isString(paramsFromMapping) ? { Key: paramsFromMapping } : paramsFromMapping;
        var params = base_1.isFunction(onValuesChange) ? onValuesChange(name, action, event) : {};
        Tracker.send(__assign(__assign(__assign({}, paramsFromMapping), { name: name }), params));
    };
}
function trackForm(context, options) {
    if (options === void 0) { options = {}; }
    var _a = options.fieldsMapping, fieldsMapping = _a === void 0 ? {} : _a, onValuesChange = options.onValuesChange;
    if (tracker_for_antdv_form_1.trackerForAntdvForm.isAntdvForm(context)) {
        var handleChange = getChangeHandler(fieldsMapping, onValuesChange);
        tracker_for_antdv_form_1.trackerForAntdvForm(context, handleChange);
    }
}
exports.default = Tracker;
