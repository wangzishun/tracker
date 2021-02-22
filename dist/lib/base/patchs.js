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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
// const sleep = () => new Promise((resolve) => setTimeout(resolve, Interval))
var map = new Map();
var Interval = 666;
var TimeSpanBase = /** @class */ (function () {
    function TimeSpanBase() {
    }
    TimeSpanBase.prototype.sleepDebouncing = function (interval) {
        var _this = this;
        this.clearTimeout();
        return new Promise(function (resolve) {
            _this.timer = setTimeout(function () {
                resolve(_this.timer);
                _this.clearTimeout();
            }, interval);
        });
    };
    /** 释放 resolve */
    TimeSpanBase.prototype.clearTimeout = function () {
        clearTimeout(this.timer);
        this.timer = null;
    };
    return TimeSpanBase;
}());
var TimeSpan = /** @class */ (function (_super) {
    __extends(TimeSpan, _super);
    function TimeSpan() {
        var _this = _super.call(this) || this;
        _this.span = new Date().getTime();
        return _this;
    }
    TimeSpan.prototype.getSpan = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sleepDebouncing(Interval)];
                    case 1:
                        _a.sent();
                        this.span = new Date().getTime() - this.span;
                        if (this.span > Interval + 50) {
                            return [2 /*return*/, this.span];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return TimeSpan;
}(TimeSpanBase));
/**
 * 时间间隔的补丁字段
 */
var timeSpanPatch = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var key, timeSpan, span;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = utils_1.getToolsTrackingCertificate(params);
                timeSpan = map.get(key);
                if (utils_1.isUndefined(timeSpan)) {
                    timeSpan = new TimeSpan();
                    map.set(key, timeSpan);
                }
                return [4 /*yield*/, timeSpan.getSpan()];
            case 1:
                span = _a.sent();
                map.delete(key);
                if (span) {
                    return [2 /*return*/, { timeSpan: span }];
                }
                return [2 /*return*/];
        }
    });
}); };
function patches(params, options) {
    return __awaiter(this, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Promise.all([timeSpanPatch(params)])];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, Object.assign.apply(Object, __spreadArrays([{}, params], result))];
                case 2:
                    error_1 = _a.sent();
                    console.error('[tracker] tracker patch error.. ', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.patches = patches;
