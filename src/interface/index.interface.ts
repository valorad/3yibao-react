interface message {
  chart: string,  // <- display beside chart
  notification: string  // <- to notification and console
}


interface yibaoAttributes {
  name: string,
  icon: string,
  currentValue: number,
  chart: {
    minValue: number,
    type: string
  },
  message: {},
  state: string
}

interface probability extends yibaoAttributes {

  offset: number,
  currentValue: number, // <-- in percentage %
  message: {
    peak: message, // message to send when reach 95%
    valley: message // message to send console when drop below minValue
  }
  chart: {
    minValue: number,
    type: string
  },
  state: "normal" | "peak" | "valley"
  
}

interface experience extends yibaoAttributes {
 
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
  message: {
    upgrade: message,
    downgrade: message
  },
  state: "normal" |"upgrade" | "downgrade",

}

export interface MasterState {
  yibao?: number,
  experiences: experience[],
  probabilities: probability[]
}