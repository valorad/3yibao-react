import React from 'react';

import "./dashboard.scss";

// interfaces
import { MasterState } from "../interface/index.interface";
import { lineChartConfig, gaugeConfig, gaugeColor } from '../interface/chart.interface';

// elements
import ChartLine from "./charts/chartLine";
import ChartGauge from "./charts/chartgauge";
import Boom from "./boom";

interface animState {
  name: string,
  upperAnimOn: boolean,
  bottomAnimOn: boolean
}

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

  animationStates: animState[] = [];
  animationLoaded = false;
  animationLoadRetryTime = 0;

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
          type: "line"
        },
        nextValue: exp.currentValue,
        minValue: exp.chart.minValue
      }

      // animstate configs
      let animState = this.animationStates.find((ams) => {return ams.name === exp.name});

      if (animState) {
        if (exp.state === "upgrade") {
          this.showBoom(animState);
        }
      }

      return (

        <div className="chartHolder exp" key={exp.name}>
          <div className="chartTitle">
            <h3><i className={`iconfont ${exp.icon}`}></i>{exp.name}</h3>
            <div className="flexSpacer"></div>
            <div>
              <p>当前值：{exp.currentValue} / {nextThreshold}</p>
              <p>当前等级: {exp.level.now}</p>
            </div>

          </div>

          {this.createChart(chartConfig)}

          {
            animState && animState.upperAnimOn &&
            <div className="stateAnim">
              <Boom />
            </div>
          }
        </div>
        
      );
    });

    return exps;
  };

  boomming = () => {
    return new Promise((resolve) => {
      setTimeout(
        () => {resolve("done")},
        500
      )
    })
  };

  showBoom = async (animState: animState) => {
    animState.upperAnimOn = true;
    await this.boomming();
    animState.upperAnimOn = false;
  };

  placeProbs = () => {

    let probs = this.props.masterState.probabilities.map((prob: MasterState["probabilities"][0]) => {

      let chartMessage = {
        peak: prob.message.peak.chart,
        valley: prob.message.valley.chart
      }

      let probToDisplay = "";
      if (prob.currentValue > prob.chart.minValue) {

        if (prob.currentValue > 95) {
          probToDisplay = chartMessage.peak.replace(/<%yibao>/g, this.props.masterState.yibao);
        } else {
          probToDisplay = prob.currentValue.toFixed(2) + " % ";
        }
        
      } else {
        probToDisplay = chartMessage.valley.replace(/<%yibao>/g, this.props.masterState.yibao);
      }

      let chartConfig = {
        chart: {
          type: prob.chart.type,
          name: prob.name,
          lowerLimit: 0,
          upperLimit: 100,
          numberSuffix: " %",
          caption: "",
          subcaption: "",
          // subcaption: prob.currentValue > prob.chart.minValue ? "当前值：" + prob.currentValue + " % ": loseMessage,
          // yaxisname: "概率 (%)",
        },
        nextValue: prob.currentValue,
        minValue: prob.chart.minValue
      };

      // animstate configs
      let animState = this.animationStates.find((ams) => {return ams.name === prob.name});

      if (animState) {
        if (prob.state === "peak") {
          this.showBoom(animState);
        }
      }

      return (

        <div className="chartHolder prob" key={prob.name}>

          <div className="chartTitle">
            <h3><i className={`iconfont ${prob.icon}`}></i>{prob.name}</h3>
            <div className="flexSpacer"></div>
            <p>{probToDisplay}</p>
          </div>

          {this.createChart(chartConfig)}

          {
            animState && animState.upperAnimOn &&
            <div className="stateAnim">
              <Boom />
            </div>
          }
        </div>
        
      );
    });

    return probs;

  };

  state = {
    animationStates: this.animationStates
  }

  componentDidMount() {

    this.setState((prevState: any) => {
        return {
          ...prevState,
          masterState: this.props.masterState
        }
      }
    );
  }

  componentDidUpdate() {

    if (!this.animationLoaded) {
      // push anim states
      for (let exp of this.props.masterState.experiences) {
        this.animationStates.push({
          name: exp.name,
          upperAnimOn: false,
          bottomAnimOn: false
        });
      }

      for (let prob of this.props.masterState.probabilities) {
        this.animationStates.push({
          name: prob.name,
          upperAnimOn: false,
          bottomAnimOn: false
        });
      }
      if (this.animationStates.length >= 0 || this.animationLoadRetryTime > 5) {
        this.animationLoaded = true;
      } else {
        this.animationLoadRetryTime++;
      }
    }

  }

  createChart = (inputConfig: any) => {
    let config: any = {
      chart: {},
      nextValue: 0
    };
    switch (inputConfig.chart.type) {
      case "gauge":
        // config is of type "gaugeCreationConfig"
        config.chart = {
          caption: inputConfig.chart.caption,
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
    return ( <ChartLine key={config.chart.caption} config={config.chart} nextValue={config.nextValue} minValue={config.minValue} /> );
  };

  createGauge = (config: gaugeCreationConfig) => {
    return ( <ChartGauge key={config.chart.caption} config={config.chart} nextValue={config.nextValue} minValue={config.minValue} colors={config.ranges} /> );
  };
  
  render() {
    return (
      <section className="dashboard">
        <main>
        { this.placeExps() }
        { this.placeProbs() }
        </main>
      </section>
    );
  }
}