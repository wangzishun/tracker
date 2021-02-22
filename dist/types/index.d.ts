import { TrackerParamsUnion } from './base';
import { SOJTracker } from './soj-tracker';
import { WMDATracker } from './wmda-tracker';
declare type TrackerProps = ConstructorParameters<typeof WMDATracker>[number] & ConstructorParameters<typeof SOJTracker>[number];
declare type AspectFunction<T extends (args?: any, result?: any) => any> = (args: Parameters<T>, result: ReturnType<T>) => TrackerParamsUnion;
declare type TrackerParams = string | TrackerParamsUnion;
declare type FieldsMapping = Record<string, TrackerParams>;
export declare class Tracker {
    private static WMDATracker;
    private static SOJTracker;
    /**
     * @param params 发码参数
     * WMDA { id: event_id 事件id }
     * SOJ { action: action }
     */
    static send(params?: TrackerParams): Promise<void>;
    /**
     * 装饰器工厂函数 确定是 参数, 属性, 方法, 类
     */
    static track(params: TrackerParams | AspectFunction<any>): (target: any, name?: string | number | symbol, descriptor?: PropertyDescriptor) => any;
    static form(context: any, options?: TrackOptions): void;
    constructor(trackerProps?: TrackerProps);
}
interface TrackOptions {
    onValuesChange?: (name: any, action: any, event: any) => TrackerParamsUnion;
    fieldsMapping?: FieldsMapping;
}
export default Tracker;
declare global {
    interface Window {
        logger?: any;
        loggerAction?: any;
        WMDA_SDK_CONFIG?: any;
        WMDA_REPORT?: any;
        Tracker?: Tracker;
    }
}
