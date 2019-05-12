interface probability {
  name: string,
  offset: number,
  currentProb: number // <-- in percentage %
  loseMessage: string
}

interface experience {
  name: string,
  thresholds: number[],
  offset: number,
  magnifier: number,
  level: {
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