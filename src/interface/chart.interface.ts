export interface lineChartConfig {
  caption: string,
  yaxisname?: string,
  subcaption?: string,
  numbersuffix?: string,
  rotatelabels?: number,
  setadaptiveymin?: number,
  drawAnchors?: number,
  theme?: string
}

export interface gaugeConfig {
  caption?: string,
  subCaption?: string,
  lowerLimit?: number,
  upperLimit?: number,
  showValue?: number,
  numberSuffix?: string,
  showToolTip?: number,
  theme?: string
}

export interface gaugeColor {
  minValue: number,
  maxValue: number,
  code: string
}