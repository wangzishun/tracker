export const CommonParamsEnum = <const>{
  /** 这个值比较特殊, 如果用户输入的是字符串时, 则会转成对应工具的 key  */
  Key: '',
  /** 用户当此进入页面的唯一标识符, 建议使用 [用户ID + time] */
  Uuid: 'uuid',
  /** from 码 */
  From: 'from',
}

/** wmda 使用的参数 */
export const WMDAParamsEnum = <const>{
  Key: 'event_id',
  EventId: 'event_id',
}

/** soj 使用的参数 */
export const SOJParamsEnum = <const>{
  Key: 'action',
  Action: 'action',
  Site: 'site',
  Plat: 'plat',
  Type: 'type',
}

/** 每个工具的埋点唯一标识符所对应的 key */
export const ToolsTrackingUniqueKeys = <const>{
  Common: 'Key',
  WMDA: 'EventId',
  SOJ: 'Action',
}

export type CommonParamsEnumKeysUnion = keyof typeof CommonParamsEnum
export type WMDAParamsEnumKeysUnion = keyof typeof WMDAParamsEnum
export type SOJParamsEnumKeysUnion = keyof typeof SOJParamsEnum

export const CommonParamsEnumKeys = Object.keys(
  CommonParamsEnum,
) as CommonParamsEnumKeysUnion[]
export const WMDAParamsEnumKeys = Object.keys(
  WMDAParamsEnum,
) as WMDAParamsEnumKeysUnion[]
export const SOJParamsEnumKeys = Object.keys(
  SOJParamsEnum,
) as SOJParamsEnumKeysUnion[]

type UniqueKeyUnion =
  | CommonParamsEnumKeysUnion
  | WMDAParamsEnumKeysUnion
  | SOJParamsEnumKeysUnion
export type TrackerParamsUnion = Partial<Record<UniqueKeyUnion, any>> &
  Record<string, any>
