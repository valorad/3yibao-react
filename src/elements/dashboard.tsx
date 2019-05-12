import React from 'react';

import "./dashboard.scss";

import { MasterState } from "../interface/index.interface";

export default class Dashboard extends React.Component<any, any> {

  // masterState: MasterState = this.props.masterState;

  placeExps = () => {
    let exps = this.props.masterState.experiences.map((exp: MasterState["experiences"][0]) => {
      return (

        <div key={exp.name}>
          <p>{exp.name}：</p>
          <p>当前值：{exp.currentValue} / 200</p>
          <p>当前等级: {exp.currentLevel}</p>
        </div>
        
      );
    });

    return exps;
  };

  placeProbs = () => {

     let probs = this.props.masterState.probabilities.map((prob: MasterState["probabilities"][0]) => {
      return (

        <div key={prob.name}>
          <p>{prob.name}：{prob.currentProb}</p>
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
      </section>
    );
  }
}