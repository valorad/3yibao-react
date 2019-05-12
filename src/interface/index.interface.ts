interface probability {
  name: string,
  offset: number,
  currentProb: number // <-- in percentage %
  loseMessage: string
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
  currentValue: number
}

export interface MasterState {
  yibao?: number,
  experiences: experience[],
  probabilities: probability[]
}