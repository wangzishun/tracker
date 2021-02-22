import { BaseTracker, TrackerParamsUnion } from './base';
declare type WMDATrackerProps = Record<string, any>;
export declare class WMDATracker extends BaseTracker {
    /**
     * 初始化时保存扩展参数, 后续的每次发码都会带上扩展参数
     *
     */
    constructor(options?: WMDATrackerProps);
    /** 扩展参数 */
    cachedExtendParameters: any;
    sender: any;
    /**
     * 依据映射 WMDAParamsEnum 取出关键的key
     * @param params
     */
    serializeData(params: TrackerParamsUnion): any;
}
export {};
