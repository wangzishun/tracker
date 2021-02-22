import { TrackerParamsUnion } from './constant';
declare type STATUS = 'PREPARE' | 'READY';
/**
 * Tracker
 * 需要子类自行实现 [ sernder, serializeData ]
 * sernder (EventData)=>void 发码的实际执行方法, 入参为 serializeData 的返回值
 * serializeData: (TrackerParamsUnion)=>EventData 格式化发送的数据格式, 返回值作为 sender 的入参
 */
export declare abstract class BaseTracker {
    /**
     * 发送序列化后的数据
     */
    send(params: TrackerParamsUnion): void;
    STATUS: STATUS;
    isReady(): boolean;
    isPrepare(): boolean;
    abstract sender: any;
    abstract serializeData(params: TrackerParamsUnion): any;
}
export {};
