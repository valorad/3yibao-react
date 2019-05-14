import React from 'react';

import "./dashboard.scss";

// interfaces
import { MasterState } from "../interface/index.interface";
import { lineChartConfig, gaugeConfig, gaugeColor } from '../interface/chart.interface';

// elements
import ChartLine from "./charts/chartLine";
import ChartGauge from "./charts/chartgauge";

interface lineChartCreationConfig {
  chart: lineChartConfig,
  nextValue: number,
  minValue?: number,
  maxLength?: number
}

interface gaugeCreationConfig {
  chart: gaugeConfig,
  nextValue: number,
  minValue?: number
  ranges?: gaugeColor[]
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
      let chartConfig: any = {
        chart: {
          type: "line",
          caption: exp.name,
          subcaption: `当前等级: ${exp.level.now}`,
          yaxisname: "点数"
        },
        nextValue: exp.currentValue,
        minValue: exp.chart.minValue
      }

      return (

        <div key={exp.name}>
          <p>{exp.name}：</p>
          <p>当前值：{exp.currentValue} / {nextThreshold}</p>
          <p>当前等级: {exp.level.now}</p>
          {this.createChart(chartConfig)}
        </div>
        
      );
    });

    return exps;
  };

  placeProbs = () => {

    let probs = this.props.masterState.probabilities.map((prob: MasterState["probabilities"][0]) => {
      
      let loseMessage = prob.loseMessage.replace(/<%yibao>/g, this.props.masterState.yibao);

      let chartConfig = {
        chart: {
          type: prob.chart.type,
          name: prob.name,
          lowerLimit: 0,
          upperLimit: 100,
          numberSuffix: " %",
          subcaption: prob.currentProb > prob.chart.minValue ? "当前值：" + prob.currentProb + " % ": loseMessage,
          yaxisname: "概率 (%)",
        },
        nextValue: prob.currentProb,
        minValue: prob.chart.minValue
      };

      return (

        <div key={prob.name}>
          <p>{prob.name}：{prob.currentProb > 0.00001 ? prob.currentProb + " % ": loseMessage}</p>
          {this.createChart(chartConfig)}
        </div>
        
      );
    });

    return probs;

  };

  componentDidMount() {
    this.setState(this.props.masterState);
  }

  // placeLineCharts = () => {

  //   let lineCharts = [];
  //   let config: any = {};

  //   for (let prob of this.props.masterState.probabilities) {
  //     config.caption = prob.name;
  //     config.yaxisname = "概率(%)";
  //     lineCharts.push(        <ChartLine key={prob.name} config={config} nextValue={prob.currentProb} />      );
  //   }

  //   return lineCharts;
  // };

  createChart = (inputConfig: any) => {
    let config: any = {
      chart: {},
      nextValue: 0
    };
    switch (inputConfig.chart.type) {
      case "gauge":
        // config is of type "gaugeCreationConfig"
        config.chart = {
          caption: inputConfig.chart.name,
          subcaption: inputConfig.chart.subcaption,
          lowerLimit: inputConfig.chart.lowerLimit,
          upperLimit: inputConfig.chart.upperLimit,
          numberSuffix: inputConfig.chart.numberSuffix
        };
        config.nextValue = inputConfig.nextValue;
        config.ranges = inputConfig.chart.colors;
        config.minValue = inputConfig.minValue;
        return this.createGauge(config);
      default: 
        // by default it's lineChart
        config.chart = {
          caption: inputConfig.chart.caption,
          subcaption: inputConfig.chart.subcaption,
          yaxisname: inputConfig.chart.yaxisname
        };
        config.nextValue = inputConfig.nextValue;
        config.minValue = inputConfig.minValue;
        return this.createLineChart(config);
    }
  };

  createLineChart = (config: lineChartCreationConfig) => {

    // config.caption = prob.name;
    // config.yaxisname = "概率(%)";
    // console.log(config.minValue);
    return ( <ChartLine key={config.chart.caption} config={config.chart} nextValue={config.nextValue} minValue={config.minValue} /> );
  };

  createGauge = (config: gaugeCreationConfig) => {
    return ( <ChartGauge key={config.chart.caption} config={config.chart} nextValue={config.nextValue} minValue={config.minValue} colors={config.ranges} /> );
  };
  
  render() {
    return (
      <section className="dashboard">
        { this.placeExps() }
        { this.placeProbs() }
      </section>
    );
  }
}