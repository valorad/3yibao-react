import React from 'react';

// interfaces
import { MasterState } from "../interface/index.interface";

// elements
import Billboard from "../elements/billboard";
import Dashboard from "../elements/dashboard";
import Boom from "../elements/boom";

// import Storm from "../elements/storm";

export default class Index extends React.Component<any, MasterState> {

  state = {
    yibao: 3,
    experiences: [    ],
    probabilities: [    ]
  }

  // tmp input data
  newExperience: any[] = [
    {
      name: "活力",
      
      level: {
        thresholds: [-3000, -2000, -1000, -750, -500, -350, -100, -50, 0, 50, 100, 150, 200, 300, 400, 500, 650, 800, 1000, 1500, 2000, 2500, 3000],
        order: "asc"
      },
      offset: -0.05,
      magnifier: 10,
      chart: {
        minValue: -3000,
        type: "line"
      }
    },
    {
      name: "负能量",
      
      level: {
        thresholds: [100, 0, -100, -200, -300, -400, -500],
        order: "desc"
      },
      offset: -2,
      magnifier: 2,
      chart: {
        minValue: -99999,
        type: "line"
      }
    }
  ];

  // tmp input data
  newProbabilities: any[] = [
    {
      name: "彩票中特等概率",
      offset: 0.323,
      currentProb: 50 ,
      loseMessage: "您没戏了！还不如资助下<%yibao>怡宝的儿！",
      chart: {
        minValue: 0.001,
        type: "gauge"
      }
      
    },
    {
      name: "减肥成功率",
      offset: 0.518,
      currentProb: 30 ,
      loseMessage: "<%yibao>怡宝已经放弃减肥了",
      chart: {
        minValue: 0.001,
        type: "gauge"
      }
      
    }
  ];


  generateGaussianRand = () => {
    // credit: https://jsfiddle.net/ssell/qzzvruc4/

    let result = 0.0;
    
    let x1 = 0.0;
    let x2 = 0.0;
    let w  = 0.0;

    do {
      // Math.random() gives value on range [0, 1) but
      // the Polar Form expects [-1, 1].
      x1 = (2.0 * Math.random()) - 1.0;
      x2 = (2.0 * Math.random()) - 1.0;
      w  = (x1 * x1) + (x2 * x2);
    } while(w >= 1.0);

    w = Math.sqrt((-2.0 * Math.log(w)) / w);

    result = x1 * w;

    return result;
  };

  calcNext = () => {

    this.setState((prev) => {
      return {
        ...prev,
        yibao: this.calcYibao(),
        experiences: this.calcExperiences(prev.experiences),
        probabilities: this.calcProbabilities(prev.probabilities)
      }
    });

  };

  calcYibao = () => {
    return Math.ceil(Math.random() * 9);
  };

  createProbabilities = () => {

    let probs: MasterState["probabilities"] = [];

    for (let prob of this.newProbabilities) {
      probs.push({
        name: prob.name,
        offset: prob.offset || 0,
        currentProb: prob.currentProb || 50, // <-- in percentage %
        loseMessage: prob.loseMessage || `${prob.name}已经很低了`,
        chart: {
          minValue: prob.chart.minValue || 0.00001,
          type: prob.chart.type || "line"
        }
      });
    }

    this.setState((prev) => {
      return {
        ...prev,
        probabilities: probs
      }
    });


  };

  calcProbabilities = (prevProbs: MasterState["probabilities"]) => {

    let nextProbs = prevProbs;

    for (let prob of nextProbs) {
      prob.currentProb *= Math.random() + prob.offset;
      if (prob.currentProb > 100) {
        prob.currentProb = 100;
      }
    }

    return nextProbs;
  };

  createExperiences = () => {
    let exps: MasterState["experiences"] = [];

    for (let exp of this.newExperience) {

      // sort array by given order
      let sortMethod: (a: number, b: number) => number;
      if (exp.level.order === "desc") {
        sortMethod = (a, b) => {return b - a};
      } else {
        sortMethod = (a, b) => {return a - b};
      }

      if (!exp.level.thresholds) {
        exp.level.thresholds = [0];
      }

      exp.level.thresholds.sort(sortMethod);

      if (!exp.chart) {
        exp.chart = {}
      }

      exps.push({
        name: exp.name,
        offset: exp.offset || 0,
        magnifier: exp.magnifier || 1,
        level: {
          thresholds: exp.level.thresholds,
          order: exp.level.order || "asc",
          now: 0 // don't need to provide since is auto generated
        },
        currentValue: exp.currentValue || 0, // <-- acts as iniitial value
        chart: {
          minValue: exp.chart.minValue || 0,
          type: exp.chart.type || "line"
        }
      });
    }

    this.setState((prev) => {
      return {
        ...prev,
        experiences: exps
      }
    });


  };

  calcExperiences = (prevExps: MasterState["experiences"]) => {

    let nextExps = prevExps;

    for (let exp of nextExps) {

      // Calc current value
      exp.currentValue += Math.ceil(exp.magnifier * this.generateGaussianRand() + exp.offset); // random walk with linear combination

      // current level

      // position of exp = 0 should be "level 0". exp < 0, currentLv < 0; exp > 0, currentLv > 0
      let lv0Pos = 0;

      let ceilingPos = 0;

      if (exp.level.order === "desc") {
        // experiences like "负能量" is ordered in desc
        // meaning next level threshold is smaller than current value: e.g. 当前值: -20 / -50

        lv0Pos = exp.level.thresholds.findIndex( ele => ele <= 0 );

        if (!lv0Pos || lv0Pos === -1) {
          // possibly the thresholds are all positive, then the last threshold is lv 0
          lv0Pos = exp.level.thresholds.length - 1;
        } 

        // e.g threshold [100, 0, -100, -200, -300, -400, -500]
        //               ->0  ->1   ->2   ->3   ->4   ->5  ->6
        // say current value is -50, then it should belone to level 0; -111 should be lv -1; 50 is lv. 0 (max)
        ceilingPos = exp.level.thresholds.findIndex( ele => ele < exp.currentValue )

        if (ceilingPos === -1) {
          // this happens when current value is smaller than everyone in the threshold.
          ceilingPos = exp.level.thresholds.length;
        }

        exp.level.lv0pos = lv0Pos;
        exp.level.nextPos = ceilingPos;
        exp.level.now = lv0Pos - ceilingPos + 1;
        exp.level.max = exp.level.lv0pos - (exp.level.thresholds.length - 1);
        

      } else {
        // by default, exp is ordered in asc

        lv0Pos = exp.level.thresholds.findIndex( ele => ele >= 0 );

        if (!lv0Pos || lv0Pos === -1) {
          // possibly the thresholds are all negative, then the last threshold is lv 0
          lv0Pos = exp.level.thresholds.length - 1;
        } 

        // e.g threshold [-100, -50, 0, 10, 100, 1000]
        //                 ->0  ->1 ->2 ->3 ->4   ->5
        // say current value is 7, then it should belone to level 0; 11 should be lv 1; -129 is lv. -2
        ceilingPos = exp.level.thresholds.findIndex( ele => ele > exp.currentValue );

        if (ceilingPos === -1) {
          // this happens when current value is bigger than everyone in the threshold.
          ceilingPos = exp.level.thresholds.length - 1;
        }

        exp.level.lv0pos = lv0Pos;
        exp.level.nextPos = ceilingPos;
        exp.level.now = ceilingPos - lv0Pos;
        exp.level.max = exp.level.thresholds.length - 1 - exp.level.lv0pos;

      }
    }

    

    return nextExps;

  };

  componentDidMount() {

    this.createExperiences();
    this.createProbabilities();
    
    setInterval(() => {
      this.calcNext();
    }, 100);
    
  }

  render() {
    return (
      <section className="index">
        <header>
          <Billboard yibao={this.state.yibao} />
        </header>
        <main>
          {/* <Boom /> */}
          <Dashboard masterState={this.state} />
        </main>
      </section>
    );
  }
}