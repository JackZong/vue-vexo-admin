

// declare namespace TerminalApi {
interface ListQueryRequest {
  clientId?: number
  country?: string
  /**
   * 当前页码
   */
  current?: number
  endTime?: Date
  model?: string
  /**
   * 是否进行count查询
   */
  searchCount?: boolean
  /**
   * 每页条数
   */
  size?: number
  sn?: string
  startTime?: Date
  warrantyStatus?: string
}

/**
 * Request
 *
 * 终端 创建对象，终端信息表
 */
interface TerminalAddRequest {
  /**
   * 关联客户ID
   */
  clientId?: number
  /**
   * 国家, 长度: 64
   */
  country: string
  /**
   * 发货日期
   */
  deliveryDate?: Date
  /**
   * 终端型号, 长度: 32
   */
  model: string
  /**
   * 备注信息
   */
  note?: string
  /**
   * 结束号段
   */
  snEnd?: string
  /**
   * 开始号段
   */
  snStart?: string
  /**
   * 保修期（月）
   */
  warrantyPeriod?: number
}

/**
 * Request
 *
 * 终端 修改对象，终端信息表
 */
interface TerminalEditRequest {
  /**
   * 关联客户ID
   */
  clientId?: number
  /**
   * 国家, 长度: 64
   */
  country: string
  /**
   * 发货日期
   */
  deliveryDate: Date
  /**
   * 终端型号, 长度: 32
   */
  model: string
  /**
   * 备注信息
   */
  note?: string
  /**
   * 终端序列号，唯一, 长度: 64
   */
  sn: string
  /**
   * 保修期（月）
   */
  warrantyPeriod?: number
  [property: string]: any
}

/**
 * 终端 VO对象，终端信息表
 */
interface TerminalVO {
  /**
   * 关联客户ID
   */
  clientId?: number
  /**
   * 关联客户名称
   */
  clientName?: string
  /**
   * 国家code
   */
  country: string
  /**
   * 国家名称
   */
  countryName: string
  /**
   * 创建人, length: 64
   */
  createdBy?: string
  /**
   * 创建时间
   */
  createdTime: Date
  /**
   * 发货日期
   */
  deliveryDate: Date
  /**
   * 主键ID
   */
  id: number
  /**
   * 逻辑删除标志：0=未删除，1=已删除
   */
  isDeleted: boolean
  /**
   * 终端型号, length: 32
   */
  model: string
  /**
   * 备注信息
   */
  note?: string
  /**
   * 终端序列号，唯一, length: 64
   */
  sn: string
  /**
   * 修改人, length: 64
   */
  updatedBy?: string
  /**
   * 修改时间
   */
  updatedTime: Date
  /**
   * 保修期（月）
   */
  warrantyPeriod?: number
  /**
   * 保修状态
   */
  warrantyStatus: string
}

// }
