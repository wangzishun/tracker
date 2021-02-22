import { BaseTracker, TrackerParamsUnion } from './base';
declare type SOJTrackerProps = Record<string, any>;
export declare class SOJTracker extends BaseTracker {
    constructor(options?: SOJTrackerProps);
    /** 初始化过程缓存的扩展参数 */
    cachedExtendParameters: any;
    sender: any;
    serializeData(params: TrackerParamsUnion): Partial<Record<"Key" | "Action" | "ActionType" | "ActionName" | "Site" | "Plat" | "Type" | "Page" | "PageName" | "Referer" | "Screen" | "Href" | "CustomParam" | "ep", any>>;
}
export {};
