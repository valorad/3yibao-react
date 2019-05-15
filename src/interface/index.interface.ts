interface message {
  chart: string,  // <- display beside chart
  notification: string  // <- to notification and console
}


interface probability {
  name: string,
  offset: number,
  currentProb: number, // <-- in percentage %
  message: {
    peak: message, // message to send when reach 95%
    valley: message // message to send console when drop below minValue
  }
  chart: {
    minValue: number,
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
    minValue: number,
    type: string
  },
  message: {
    upgrade: message,
    downgrade: message
  }
}

export interface MasterState {
  yibao?: number,
  experiences: experience[],
  probabilities: probability[]
}