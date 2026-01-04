

interface ApiResponse<T = any> {
  code: number
  message: string
  result: T
  timestamp: number
}

/**
 * Page result«终端 VO对象»
 */
interface PageResult<T = any> {
  /**
   * 当前页码
   */
  current: number
  /**
   * 分页数据
   */
  records: T[]
  /**
   * 每页条数
   */
  size: number
  /**
   * 总记录数
   */
  total: number
}
