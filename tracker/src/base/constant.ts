

export const CommonParamsEnum = <const>{
  /** 这个值比较特殊, 如果用户输入的是字符串时, 则会转成对应工具的 key  */
  key: '',
  /** 用户当此进入页面的唯一标识符, 建议使用 [用户ID + time] */
  uuid: 'uuid',
  /** from 码 */
  from: 'from'
}

/** wmda 使用的参数 */
export const WMDAParamsEnum = <const>{
  key: 'event_id',
  id: 'event_id'
}

/** soj 使用的参数 */
export const SOJParamsEnum = <const>{
  key: 'action',
  action: 'action',
  site: 'site',
  plat: 'plat',
  type: 'type'
}

export type CommonParamsEnumKeysUnion = keyof typeof CommonParamsEnum
export type WMDAParamsEnumKeysUnion = keyof typeof WMDAParamsEnum
export type SOJParamsEnumKeysUnion = keyof typeof SOJParamsEnum

export const CommonParamsEnumKeys = Object.keys(CommonParamsEnum) as CommonParamsEnumKeysUnion[]
export const WMDAParamsEnumKeys = Object.keys(WMDAParamsEnum) as WMDAParamsEnumKeysUnion[]
export const SOJParamsEnumKeys = Object.keys(SOJParamsEnum) as SOJParamsEnumKeysUnion[]

type UniqueKeyUnion = CommonParamsEnumKeysUnion | WMDAParamsEnumKeysUnion | SOJParamsEnumKeysUnion
export type TrackerParamsUnion = Partial<Record<UniqueKeyUnion, any>> & Record<string, any>

/** 埋点唯一标识符 */
export const TrackingUuidKeysEnum = <const>{
  WMDA: 'id',
  /** from 码 */
  SOJ: 'action'
}
