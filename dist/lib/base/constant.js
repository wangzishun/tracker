"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonParamsEnum = {
    /** 这个值比较特殊, 如果用户输入的是字符串时, 则会转成对应工具的 key  */
    Key: '',
    /** 用户当此进入页面的唯一标识符, 建议使用 [用户ID + time] */
    Uuid: 'uuid',
    /** from 码 */
    From: 'from'
};
/** wmda 使用的参数 */
exports.WMDAParamsEnum = {
    Key: 'event_id',
    EventId: 'event_id'
};
/** soj 使用的参数 */
exports.SOJParamsEnum = {
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
exports.ToolsTrackingUniqueKeys = {
    Common: 'Key',
    WMDA: 'EventId',
    SOJ: 'Action'
};
exports.CommonParamsEnumKeys = Object.keys(exports.CommonParamsEnum);
exports.WMDAParamsEnumKeys = Object.keys(exports.WMDAParamsEnum);
exports.SOJParamsEnumKeys = Object.keys(exports.SOJParamsEnum);
