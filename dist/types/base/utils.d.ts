import { TrackerParamsUnion } from './constant';
export declare function isUndefined(value: any): value is undefined;
export declare function isString(value: any): value is string;
export declare function isFunction(value: any): value is Function;
/**
 * 获取埋点字段的唯一标记凭证
 * 依据 key 从参数中取出可以标记一个埋点的对应字段, 返回 JSON.stringify()
 */
export declare function getToolsTrackingCertificate(params: TrackerParamsUnion): string;
