export interface ContentType {
  id: number
  title: string
  content: string
  arrPos: number
}

export interface ContentPosition {
  /**
   * 当前数据处在allData数组的索引位置
   */
  arrPos: number
  /**
   * 当前数据dom的top位置
   */
  startPos: number
  /**
   * 当前数据dom的bottom位置
   */
  endPos: number
  /**
   * 当前数据dom的高度(初始值为猜测高度【预估高度】)
   */
  height: number
}
