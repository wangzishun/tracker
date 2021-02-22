/**
 * 表单埋点, 基于 [ant design vue ^1.x] 版本的form表单埋点 [Vue version ^2.x]
 * @param formContext
 * @param onValuesChange 字段变更时执行的回调
 */
export declare const trackerForAntdvForm: {
    (formContext: any, onValuesChange: any): void;
    isAntdvForm(form: any): boolean;
};
