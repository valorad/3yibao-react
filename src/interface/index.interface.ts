interface probability {
  name: string,
  offset: number,
  currentProb: number // <-- in percentage %
  loseMessage: string,
  minValue?: number // the min value to display in line chart
}

interface experience {
  name: string,
  
  offset: number,
  magnifier: number,
  level: {
    thresholds: number[],
    minValue?: number // the min value to display in line chart
    order: "asc" | "desc",
    max?: number,
    lv0pos?: number,
    nextPos?: number
    now: number
  }
  currentValue: number
}

export interface MasterState {
  yibao?: number,
  experiences: experience[],
  probabilities: probability[]
}