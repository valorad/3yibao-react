interface probability {
  name: string,
  offset: number,
  currentProb: number // <-- in percentage %
  loseMessage: string,
  chart: {
    minValue: number, // the min value to display in line chart
    type: string
  }
  
}

interface experience {
  name: string,
  
  offset: number,
  magnifier: number,
  level: {
    thresholds: number[],
    order: "asc" | "desc",
    max?: number,
    lv0pos?: number,
    nextPos?: number
    now: number
  }
  currentValue: number,
  chart: {
    minValue: number, // the min value to display in line chart
    type: string
  }
}

export interface MasterState {
  yibao?: number,
  experiences: experience[],
  probabilities: probability[]
}