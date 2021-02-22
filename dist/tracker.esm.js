import _Object$defineProperties from '@babel/runtime-corejs3/core-js-stable/object/define-properties';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _forEachInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/for-each';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Reflect$construct from '@babel/runtime-corejs3/core-js-stable/reflect/construct';
import _inherits from '@babel/runtime-corejs3/helpers/inherits';
import _possibleConstructorReturn from '@babel/runtime-corejs3/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime-corejs3/helpers/getPrototypeOf';
import _Object$defineProperty from '@babel/runtime-corejs3/core-js-stable/object/define-property';
import _regeneratorRuntime from '@babel/runtime-corejs3/regenerator';
import _asyncToGenerator from '@babel/runtime-corejs3/helpers/asyncToGenerator';
import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import _JSON$stringify from '@babel/runtime-corejs3/core-js-stable/json/stringify';
import _Object$values from '@babel/runtime-corejs3/core-js-stable/object/values';
import _reduceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/reduce';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _Object$assign from '@babel/runtime-corejs3/core-js-stable/object/assign';
import _toConsumableArray from '@babel/runtime-corejs3/helpers/toConsumableArray';
import _assertThisInitialized from '@babel/runtime-corejs3/helpers/assertThisInitialized';
import _setTimeout from '@babel/runtime-corejs3/core-js-stable/set-timeout';
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';
import _Map from '@babel/runtime-corejs3/core-js-stable/map';
import _getIterator from '@babel/runtime-corejs3/core-js/get-iterator';
import _Array$isArray from '@babel/runtime-corejs3/core-js-stable/array/is-array';
import _getIteratorMethod from '@babel/runtime-corejs3/core-js/get-iterator-method';
import _Symbol from '@babel/runtime-corejs3/core-js-stable/symbol';
import _Array$from from '@babel/runtime-corejs3/core-js-stable/array/from';
import _sliceInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/slice';

var CommonParamsEnum = {
  /** 这个值比较特殊, 如果用户输入的是字符串时, 则会转成对应工具的 key  */
  Key: '',

  /** 用户当此进入页面的唯一标识符, 建议使用 [用户ID + time] */
  Uuid: 'uuid',

  /** from 码 */
  From: 'from'
};
/** wmda 使用的参数 */

var WMDAParamsEnum = {
  Key: 'event_id',
  EventId: 'event_id'
};
/** soj 使用的参数 */

var SOJParamsEnum = {
  Key: 'action',
  Action: 'action',
  ActionType: 'action_type',
  ActionName: 'action_name',
  Site: 'site',
  Plat: 'plat',
  Type: 'type',
  Page: 'page',
  PageName: 'pageName',
  Referer: 'referer',
  Screen: 'screen',
  Href: 'href',
  CustomParam: 'customparam'
};
/** 每个工具的埋点唯一标识符所对应的 key */

var ToolsTrackingUniqueKeys = {
  Common: 'Key',
  WMDA: 'EventId',
  SOJ: 'Action'
};
_Object$keys(CommonParamsEnum);
var WMDAParamsEnumKeys = _Object$keys(WMDAParamsEnum);
var SOJParamsEnumKeys = _Object$keys(SOJParamsEnum);

function isUndefined(value) {
  return value === undefined;
}
function isString(value) {
  return typeof value === 'string';
}
var BaseTag = {
  async: '[object AsyncFunction]',
  func: '[object Function]',
  gen: '[object GeneratorFunction]',
  proxy: '[object Proxy]',
  "null": '[object Null]',
  undefined: '[object Undefined]'
};
function isFunction(value) {
  var tag = Object.prototype.toString.call(value);
  return tag === BaseTag.async || tag === BaseTag.func;
}
/**
 * 获取埋点字段的唯一标记凭证
 * 依据 key 从参数中取出可以标记一个埋点的对应字段, 返回 JSON.stringify()
 */

function getToolsTrackingCertificate(params) {
  var _context;

  var toolsTrackingCertificate = _reduceInstanceProperty(_context = _Object$values(ToolsTrackingUniqueKeys)).call(_context, function (previouse, uniqueKeys) {
    previouse[uniqueKeys] = params[uniqueKeys];
    return previouse;
  }, {});

  return _JSON$stringify(toolsTrackingCertificate);
}

/**
 * Tracker
 * 需要子类自行实现 [ sernder, serializeData ]
 * sernder (EventData)=>void 发码的实际执行方法, 入参为 serializeData 的返回值
 * serializeData: (TrackerParamsUnion)=>EventData 格式化发送的数据格式, 返回值作为 sender 的入参
 */
var BaseTracker = /*#__PURE__*/function () {
  function BaseTracker() {
    _classCallCheck(this, BaseTracker);

    _defineProperty(this, "STATUS", 'PREPARE');

    _defineProperty(this, "sender", void 0);
  }

  _createClass(BaseTracker, [{
    key: "send",
    value:
    /**
     * 发送序列化后的数据
     */
    function send(params) {
      if (isUndefined(this.sender)) {
        // this.sender = console.log
        return;
      }

      if (isUndefined(this.serializeData)) {
        throw new Error('需要实现 serializeData 方法');
      }

      var serializeData = this.serializeData(params);
      this.sender(serializeData);
    }
  }, {
    key: "isReady",
    value: function isReady() {
      if (this.STATUS === 'READY') {
        return true;
      }

      if (isUndefined(this.sender)) {
        return false;
      }

      this.STATUS = 'READY';
      return true;
    }
  }, {
    key: "isPrepare",
    value: function isPrepare() {
      return !this.isReady();
    }
  }]);

  return BaseTracker;
}();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }
// const sleep = () => new Promise((resolve) => setTimeout(resolve, Interval))
var map = new _Map();
var Interval = 666;

var TimeSpanBase = /*#__PURE__*/function () {
  function TimeSpanBase() {
    _classCallCheck(this, TimeSpanBase);

    _defineProperty(this, "timer", void 0);
  }

  _createClass(TimeSpanBase, [{
    key: "sleepDebouncing",
    value: function sleepDebouncing(interval) {
      var _this = this;

      this.clearTimeout();
      return new _Promise(function (resolve) {
        _this.timer = _setTimeout(function () {
          resolve(_this.timer);

          _this.clearTimeout();
        }, interval);
      });
    }
    /** 释放 resolve */

  }, {
    key: "clearTimeout",
    value: function (_clearTimeout) {
      function clearTimeout() {
        return _clearTimeout.apply(this, arguments);
      }

      clearTimeout.toString = function () {
        return _clearTimeout.toString();
      };

      return clearTimeout;
    }(function () {
      clearTimeout(this.timer);
      this.timer = null;
    })
  }]);

  return TimeSpanBase;
}();

var TimeSpan = /*#__PURE__*/function (_TimeSpanBase) {
  _inherits(TimeSpan, _TimeSpanBase);

  var _super = _createSuper(TimeSpan);

  function TimeSpan() {
    var _this2;

    _classCallCheck(this, TimeSpan);

    _this2 = _super.call(this);

    _defineProperty(_assertThisInitialized(_this2), "span", void 0);

    _this2.span = new Date().getTime();
    return _this2;
  }

  _createClass(TimeSpan, [{
    key: "getSpan",
    value: function () {
      var _getSpan = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.sleepDebouncing(Interval);

              case 2:
                this.span = new Date().getTime() - this.span;

                if (!(this.span > Interval + 50)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", this.span);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getSpan() {
        return _getSpan.apply(this, arguments);
      }

      return getSpan;
    }()
  }]);

  return TimeSpan;
}(TimeSpanBase);
/**
 * 时间间隔的补丁字段
 */


var timeSpanPatch = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(params) {
    var key, timeSpan, span;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            key = getToolsTrackingCertificate(params);
            timeSpan = map.get(key);

            if (isUndefined(timeSpan)) {
              timeSpan = new TimeSpan();
              map.set(key, timeSpan);
            }

            _context2.next = 5;
            return timeSpan.getSpan();

          case 5:
            span = _context2.sent;
            map["delete"](key);

            if (!span) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", {
              timeSpan: span
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function timeSpanPatch(_x) {
    return _ref.apply(this, arguments);
  };
}();

function patches(_x2, _x3) {
  return _patches.apply(this, arguments);
}

function _patches() {
  _patches = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(params, options) {
    var _context3, result;

    return _regeneratorRuntime.wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _Promise.all([timeSpanPatch(params)]);

          case 3:
            result = _context4.sent;
            return _context4.abrupt("return", _Object$assign.apply(Object, _concatInstanceProperty(_context3 = [{}, params]).call(_context3, _toConsumableArray(result))));

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.error('[tracker] tracker patch error.. ', _context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee3, null, [[0, 7]]);
  }));
  return _patches.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context2; _forEachInstanceProperty(_context2 = ownKeys(Object(source), true)).call(_context2, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context3; _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof _Symbol === "undefined" || _getIteratorMethod(o) == null) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = _getIterator(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context = Object.prototype.toString.call(o)).call(_context, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var SOJTracker = /*#__PURE__*/function (_BaseTracker) {
  _inherits(SOJTracker, _BaseTracker);

  var _super = _createSuper$1(SOJTracker);

  function SOJTracker() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SOJTracker);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "cachedExtendParameters", void 0);

    _defineProperty(_assertThisInitialized(_this), "sender", void 0);

    _this.cachedExtendParameters = options;
    var SOJ = window.logger || window.loggerAction;

    if (!isUndefined(SOJ)) {
      _this.sender = function (eventData) {
        return SOJ.sendpv(eventData);
      };
    }

    return _this;
  }
  /** 初始化过程缓存的扩展参数 */


  _createClass(SOJTracker, [{
    key: "serializeData",
    value: function serializeData(params) {
      // data[SOJParamsEnum.id] = params.id
      var SOJEventData = {};

      var _iterator = _createForOfIteratorHelper(SOJParamsEnumKeys),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          var trackParamKey = SOJParamsEnum[key];
          var trackParamValue = params[key];

          if (!isUndefined(trackParamValue)) {
            SOJEventData[trackParamKey] = trackParamValue;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      SOJEventData.ep = _objectSpread(_objectSpread({}, this.cachedExtendParameters), params);
      return SOJEventData;
    }
  }]);

  return SOJTracker;
}(BaseTracker);

function ownKeys$1(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context2; _forEachInstanceProperty(_context2 = ownKeys$1(Object(source), true)).call(_context2, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context3; _forEachInstanceProperty(_context3 = ownKeys$1(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof _Symbol === "undefined" || _getIteratorMethod(o) == null) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = _getIterator(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { var _context; if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = _sliceInstanceProperty(_context = Object.prototype.toString.call(o)).call(_context, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var WMDATracker = /*#__PURE__*/function (_BaseTracker) {
  _inherits(WMDATracker, _BaseTracker);

  var _super = _createSuper$2(WMDATracker);

  /**
   * 初始化时保存扩展参数, 后续的每次发码都会带上扩展参数
   *
   */
  function WMDATracker() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WMDATracker);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "cachedExtendParameters", void 0);

    _defineProperty(_assertThisInitialized(_this), "sender", void 0);

    _this.cachedExtendParameters = options;

    if (!isUndefined(window.WMDA_REPORT)) {
      // this.sender = (eventData) => window.WMDA_REPORT('custom', eventData)
      _this.sender = function (eventData) {
        return window.WMDA_REPORT('custom', eventData);
      };
    }

    return _this;
  }
  /** 扩展参数 */


  _createClass(WMDATracker, [{
    key: "serializeData",
    value:
    /**
     * 依据映射 WMDAParamsEnum 取出关键的key
     * @param params
     */
    function serializeData(params) {
      // data[WMDAParamsEnum.id] = params.id
      var WMDAEventData = {};

      var _iterator = _createForOfIteratorHelper$1(WMDAParamsEnumKeys),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var key = _step.value;
          var trackParamKey = WMDAParamsEnum[key];
          var trackParamValue = params[key];

          if (!isUndefined(trackParamValue)) {
            WMDAEventData[trackParamKey] = trackParamValue;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var extendParameters = _objectSpread$1(_objectSpread$1({}, params), this.cachedExtendParameters);

      return _objectSpread$1(_objectSpread$1({}, WMDAEventData), extendParameters);
    }
  }]);

  return WMDATracker;
}(BaseTracker);

/**
 * 表单埋点, 基于 [ant design vue ^1.x] 版本的form表单埋点 [Vue version ^2.x]
 * @param formContext
 * @param onValuesChange 字段变更时执行的回调
 */

var trackerForAntdvForm = function trackerForAntdvForm(formContext, onValuesChange) {
  var cachedOnCollectCommon = formContext.onCollectCommon;

  formContext.onCollectCommon = function (name, action, args) {
    try {
      if (onValuesChange) {
        onValuesChange(name, action, args);
      }
    } catch (error) {} finally {
      return cachedOnCollectCommon(name, action, args);
    }
  };
};

trackerForAntdvForm.isAntdvForm = function (form) {
  return form._isVue === true && !isUndefined(form.fieldsStore) && !isUndefined(form.formItems);
};

function ownKeys$2(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context4; _forEachInstanceProperty(_context4 = ownKeys$2(Object(source), true)).call(_context4, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context5; _forEachInstanceProperty(_context5 = ownKeys$2(Object(source))).call(_context5, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Tracker = /*#__PURE__*/function () {
  function Tracker(trackerProps) {
    _classCallCheck(this, Tracker);

    if (isUndefined(Tracker.WMDATracker) || Tracker.WMDATracker.isPrepare()) {
      Tracker.WMDATracker = new WMDATracker(trackerProps);
    }

    if (isUndefined(Tracker.SOJTracker) || Tracker.SOJTracker.isPrepare()) {
      Tracker.SOJTracker = new SOJTracker(trackerProps);
    }
  }

  _createClass(Tracker, null, [{
    key: "send",
    value:
    /**
     * @param params 发码参数
     * WMDA { id: event_id 事件id }
     * SOJ { action: action }
     */
    function () {
      var _send = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var params,
            refactoredParams,
            data,
            _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};

                /** 这里把参数变成对象 */
                refactoredParams = isString(params) ? {
                  key: params
                } : params;
                _context.next = 4;
                return patches(refactoredParams);

              case 4:
                data = _context.sent;
                new Tracker();
                Tracker.WMDATracker && Tracker.WMDATracker.send(data);
                Tracker.SOJTracker && Tracker.SOJTracker.send(data);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function send() {
        return _send.apply(this, arguments);
      }

      return send;
    }()
    /**
     * 装饰器工厂函数 确定是 参数, 属性, 方法, 类
     */

  }, {
    key: "track",
    value: function track(params) {
      return function (target, name, descriptor) {
        if (typeof descriptor === 'number') {
          throw new Error('暂不支持参数埋点');
        } else if (isUndefined(name) && isUndefined(descriptor)) {
          throw new Error('暂不支持装饰class');
        } else if (isUndefined(descriptor) && name) {
          // 装饰属性
          TrackClassProperty.apply(this, [params, target, name]);
        } else if (descriptor) {
          // 装饰方法
          return TrackClassMethod.apply(this, [params, descriptor]);
        }
      };
    }
  }, {
    key: "form",
    value: function form(context, options) {
      try {
        trackForm(context, options);
      } catch (error) {// console.log(error)
      }
    }
  }]);

  return Tracker;
}();
/**
 * 返回一个目标"类方法"的 descriptor
 */

_defineProperty(Tracker, "WMDATracker", void 0);

_defineProperty(Tracker, "SOJTracker", void 0);

function TrackClassMethod(params, descriptor) {
  var originalValue = descriptor.value;

  descriptor.value = function () {
    var _this = this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var result = originalValue.apply(this, args);

    var tracking = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(originalValueResult) {
        var AspectFunctionResult;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!isFunction(params)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 3;
                return params.apply(_this, [args, originalValueResult]);

              case 3:
                AspectFunctionResult = _context2.sent;
                Tracker.send(AspectFunctionResult);
                _context2.next = 8;
                break;

              case 7:
                Tracker.send(params);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function tracking(_x) {
        return _ref.apply(this, arguments);
      };
    }();
    /** 结果有可能是异步, 异步的时候注册到回调函数上 */


    if (result && result.then) {
      result.then(tracking);
    } else {
      tracking(result);
    }

    return result;
  };

  return descriptor;
}

function TrackClassProperty(params, target, name) {
  var value = target[name];

  var setter = function setter(newProperty) {
    if (isFunction(newProperty)) {
      value = function value() {
        for (var _len2 = arguments.length, paramsRest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          paramsRest[_key2] = arguments[_key2];
        }

        var tracking = /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3(originalValueResult) {
            var AspectFunctionResult;
            return _regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!isFunction(params)) {
                      _context3.next = 8;
                      break;
                    }

                    console.log(params);
                    _context3.next = 4;
                    return params.apply(newProperty, [paramsRest, originalValueResult]);

                  case 4:
                    AspectFunctionResult = _context3.sent;
                    Tracker.send(AspectFunctionResult);
                    _context3.next = 9;
                    break;

                  case 8:
                    Tracker.send(params);

                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          return function tracking(_x2) {
            return _ref2.apply(this, arguments);
          };
        }();

        var result = newProperty(paramsRest);

        if (result && result.then) {
          result.then(tracking);
        } else {
          tracking(result);
        }
      };

      return;
    } else {
      Tracker.send(params);
    }

    value = newProperty;
  };

  _Object$defineProperty(target, name, {
    enumerable: true,
    configurable: true,
    set: setter,
    get: function get() {
      return value;
    }
  });
}

function getChangeHandler(fieldsMapping, onValuesChange) {
  return function (name, action, event) {
    var paramsFromMapping = fieldsMapping[name];
    paramsFromMapping = isString(paramsFromMapping) ? {
      Key: paramsFromMapping
    } : paramsFromMapping;
    var params = isFunction(onValuesChange) ? onValuesChange(name, action, event) : {};
    Tracker.send(_objectSpread$2(_objectSpread$2({}, paramsFromMapping), {}, {
      name: name
    }, params));
  };
}

function trackForm(context) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$fieldsMappin = options.fieldsMapping,
      fieldsMapping = _options$fieldsMappin === void 0 ? {} : _options$fieldsMappin,
      onValuesChange = options.onValuesChange;

  if (trackerForAntdvForm.isAntdvForm(context)) {
    var handleChange = getChangeHandler(fieldsMapping, onValuesChange);
    trackerForAntdvForm(context, handleChange);
  }
}

export default Tracker;
export { Tracker };
