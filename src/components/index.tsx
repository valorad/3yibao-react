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
      thresholds: [-300, -200, -100, 0, 100, 200, 500, 1000],
      offset: 1,
      magnifier: 1,
    }
  ];

  // tmp input data
  newProbabilities: any[] = [
    {
      name: "彩票中特等概率",
      offset: 0.523,
      currentProb: 50 
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
        currentProb: prob.currentProb || 50 // <-- in percentage %
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
    }

    return nextProbs;
  };

  createExperiences = () => {
    let exps: MasterState["experiences"] = [];

    for (let exp of this.newExperience) {
      exps.push({
        name: exp.name,
        thresholds: exp.thresholds,
        offset: exp.offset || 0,
        magnifier: exp.magnifier || 1,
        currentLevel: 0, // don't need to provide since is auto generated
        currentValue: exp.currentValue || 0 // <-- acts as iniitial value
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
      exp.currentValue += (exp.magnifier * this.generateGaussianRand() + exp.offset); // random walk with linear combination

      // current level
      // e.g threshold [-100, -50, 0, 10, 100, 1000]
      // position of exp = 0 should be "level 0". exp > 0, currentLv > 0; exp < 0, currentLv < 0
      let lv0Pos = exp.thresholds.findIndex( ele => ele >= 0 );
      if (!lv0Pos || lv0Pos === -1) {
        // possibly the thresholds are all negative (e.g. Funengliang), then the last threshold is lv 0
        lv0Pos = exp.thresholds.length - 1;
      } 

      // e.g threshold [-100, -50, 0, 10, 100, 1000]
      //                 ->0  ->1 ->2 ->3 ->4   ->5
      // say current value is 7, then it should belone to level 0; 11 should be lv 1; -129 is lv. -2
      let ceilingPos = exp.thresholds.findIndex( ele => ele > exp.currentValue ) || exp.thresholds.length - 1; // <-- fallback
      
      exp.currentLevel = ceilingPos - lv0Pos;

      console.log(ceilingPos, lv0Pos, exp.currentLevel);

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