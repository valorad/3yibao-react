import React from 'react';

import "./dashboard.scss";

// interfaces
import { MasterState } from "../interface/index.interface";
import { lineChartConfig } from '../interface/lineChartConfig.interface';

// elements
import ChartLine from "./charts/chartLine";


interface lineChartCreationConfig {
  chart: lineChartConfig,
  nextValue: number,
  minValue?: number,
  maxLength?: number
}

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

      // chart config
      let chartConfig: lineChartConfig = {
        caption: exp.name,
        yaxisname: "点数"
      }

      // console.log(exp.level.minValue);

      return (

        <div key={exp.name}>
          <p>{exp.name}：</p>
          <p>当前值：{exp.currentValue} / {nextThreshold}</p>
          <p>当前等级: {exp.level.now}</p>
          {this.createLineChart({
            chart: chartConfig,
            nextValue: exp.currentValue,
            minValue: exp.level.minValue
          })}
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

  placeLineCharts = () => {

    let lineCharts = [];
    let config: any = {};

    for (let prob of this.props.masterState.probabilities) {
      config.caption = prob.name;
      config.yaxisname = "概率(%)";
      lineCharts.push(        <ChartLine key={prob.name} config={config} nextValue={prob.currentProb} />      );
    }

    return lineCharts;
  };

  createLineChart = (config: lineChartCreationConfig) => {

    // config.caption = prob.name;
    // config.yaxisname = "概率(%)";
    // console.log(config.minValue);
    return ( <ChartLine key={config.chart.caption} config={config.chart} nextValue={config.nextValue} minValue={config.minValue} /> );
  };
  
  render() {
    return (
      <section className="dashboard">
        { this.placeExps() }
        { this.placeProbs() }
        <hr/>
        {/* { this.placeLineCharts() } */}
        
      </section>
    );
  }
}