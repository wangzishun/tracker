/**
 * 表单埋点
 * 通过 watch 监听表单的每个字段变更
 * @param form
 * @param onValuesChange 字段变更时执行的回调
 */
export declare const trackerForVueData: {
    (context: any, properties: string[], onValuesChange: any): void;
    isVueData(context: any, properties: any): boolean;
};
