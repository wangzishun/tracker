export declare const CommonParamsEnum: {
    /** 这个值比较特殊, 如果用户输入的是字符串时, 则会转成对应工具的 key  */
    readonly Key: "";
    /** 用户当此进入页面的唯一标识符, 建议使用 [用户ID + time] */
    readonly Uuid: "uuid";
    /** from 码 */
    readonly From: "from";
};
/** wmda 使用的参数 */
export declare const WMDAParamsEnum: {
    readonly Key: "event_id";
    readonly EventId: "event_id";
};
/** soj 使用的参数 */
export declare const SOJParamsEnum: {
    readonly Key: "action";
    readonly Action: "action";
    readonly ActionType: "action_type";
    readonly ActionName: "action_name";
    readonly Site: "site";
    readonly Plat: "plat";
    readonly Type: "type";
    readonly Page: "page";
    readonly PageName: "pageName";
    readonly Referer: "referer";
    readonly Screen: "screen";
    readonly Href: "href";
    readonly CustomParam: "customparam";
};
/** 每个工具的埋点唯一标识符所对应的 key */
export declare const ToolsTrackingUniqueKeys: {
    readonly Common: "Key";
    readonly WMDA: "EventId";
    readonly SOJ: "Action";
};
export declare type CommonParamsEnumKeysUnion = keyof typeof CommonParamsEnum;
export declare type WMDAParamsEnumKeysUnion = keyof typeof WMDAParamsEnum;
export declare type SOJParamsEnumKeysUnion = keyof typeof SOJParamsEnum;
export declare const CommonParamsEnumKeys: ("Key" | "Uuid" | "From")[];
export declare const WMDAParamsEnumKeys: ("Key" | "EventId")[];
export declare const SOJParamsEnumKeys: ("Key" | "Action" | "ActionType" | "ActionName" | "Site" | "Plat" | "Type" | "Page" | "PageName" | "Referer" | "Screen" | "Href" | "CustomParam")[];
declare type UniqueKeyUnion = CommonParamsEnumKeysUnion | WMDAParamsEnumKeysUnion | SOJParamsEnumKeysUnion;
export declare type TrackerParamsUnion = Partial<Record<UniqueKeyUnion, any>> & Record<string, any>;
export {};
