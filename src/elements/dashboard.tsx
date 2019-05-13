import React from 'react';

import "./dashboard.scss";

import { MasterState } from "../interface/index.interface";

// elements
import ChartLine from "./charts/chartLine";

export default class Dashboard extends React.Component<any, any> {

  // masterState: MasterState = this.props.masterState;

  placeExps = () => {
    let exps = this.props.masterState.experiences.map((exp: MasterState["experiences"][0]) => {

      if (exp.level.nextPos === undefined) {
        exp.level.nextPos = exp.level.thresholds.length - 1
      }

      if (!exp.level.lv0pos) {
        exp.level.lv0pos = 0;
      }

      if (!exp.level.max) {
        exp.level.max = 0;
      }

      // get next Threshold
      let nextThreshold = "";

      if (
        (exp.level.order === "desc" && exp.level.now > exp.level.max) ||
        (exp.level.order === "asc" && exp.level.now < exp.level.max)
        ) {
          nextThreshold = `${exp.level.thresholds[exp.level.nextPos]}`;
        } else {
          nextThreshold = "满级";
        }

      return (

        <div key={exp.name}>
          <p>{exp.name}：</p>
          <p>当前值：{exp.currentValue} / {nextThreshold}</p>
          <p>当前等级: {exp.level.now}</p>
        </div>
        
      );
    });

    return exps;
  };

  placeProbs = () => {

    let probs = this.props.masterState.probabilities.map((prob: MasterState["probabilities"][0]) => {
      
      let loseMessage = prob.loseMessage.replace(/<%yibao>/g, this.props.masterState.yibao);
      
      return (

        <div key={prob.name}>
          <p>{prob.name}：{prob.currentProb > 0.00001 ? prob.currentProb + " % ": loseMessage}</p>
        </div>
        
      );
    });

    return probs;

  };

  componentDidMount() {
    this.setState(this.props.masterState);
  }
  
  render() {
    return (
      <section className="dashboard">
        { this.placeExps() }
        { this.placeProbs() }
        <ChartLine />
      </section>
    );
  }
}