export interface StyleProp {
  color: string
}

export interface LegendProp {
  name: string
  itemStyle: StyleProp
}

export interface AreaStyle {
  opacity: number
  color: any
}

export interface LineStyle {
  width: number
  color: string
}

export interface SeriesDateProp {
  name: string
  type: string
  stack: string
  smooth: boolean
  lineStyle: LineStyle
  showSymbol: boolean
  areaStyle: AreaStyle
  data: number[]
}
