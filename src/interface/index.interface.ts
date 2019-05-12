export interface probability {
  name: string,
  offset: number,
  currentProb: number // <-- in percentage %
}

export interface experience {
  name: string,
  thresholds: number[],
  offset: number,
  magnifier: number,
  currentLevel: number,
  currentValue: number
}

export interface MasterState {
  yibao?: number,
  experiences: experience[],
  probabilities: probability[]
}