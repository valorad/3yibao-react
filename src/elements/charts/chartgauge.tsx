import React from 'react';

import FusionCharts from 'fusioncharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import { gaugeConfig, gaugeColor } from "../../interface/chart.interface";

import "./chartgauge.scss";

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

interface gaugeDial {
  value: number
}

interface chartdataSource {
  chart: gaugeConfig,
  colorRange: {
    color: gaugeColor[]
  },
  dials: {
    dial: gaugeDial[]
  }
}

interface chartstate {
  dataSource: chartdataSource
}

interface chartprop {
  config: {}
  nextValue: number,
  colors?: gaugeColor[],
  minValue?: number
}

export default class ChartGauge extends React.Component<chartprop, chartstate> {

  graphDisabled = false; // if true: stop adding new data, and graph grey out
  
  minValue = 0;

  dataSource: chartdataSource = {
    chart: {
      caption: "Gauge",
      subCaption: "the gauge",
      lowerLimit: 0,
      upperLimit: 100,
      showValue: 1,
      numberSuffix: "%",
      showToolTip: 0,
      theme: "fusion"
    },
    colorRange: {
      color: [
        {
          minValue: 0,
          maxValue: 50,
          code: "#F2726F"
        },
        {
          minValue: 50,
          maxValue: 75,
          code: "#FFC533"
        },
        {
          minValue: 75,
          maxValue: 100,
          code: "#62B58F"
        }
      ]
    },
    dials: {
      dial: [
        {
          value: 66
        }
      ]
    }
  };

  state = {
    dataSource: this.dataSource
  }

  componentDidUpdate(prevProps: chartprop) {

    this.dataSource.chart = {
      ...this.dataSource.chart,
      ...prevProps.config
    }

    // if ( prevProps.nextValue <= this.minValueToDisplay ) {
    //   this.graphDisabled = true;
    // } else {
    //   this.graphDisabled = false;
    //   this.insertData(prevProps.nextValue.toString());
    // }

    if (prevProps.minValue) {
      this.minValue = prevProps.minValue;
    }

    if (prevProps.colors) {
      this.dataSource.colorRange.color = prevProps.colors;
    }

    if (this.props.nextValue <= this.minValue) {

        this.graphDisabled = true;
      } else {
        this.graphDisabled = false;
        this.dataSource.dials.dial[0].value = prevProps.nextValue;
    }
    
  }

  render() {
    return (
      <section className="chartgauge">

        <div className={`chart ${this.graphDisabled? "disabled": ""}`}>
          <ReactFC
            type="angulargauge"
            // width="100%"
            // height="100%"
            dataFormat="JSON"
            dataSource={this.state.dataSource}
          />
        </div>


      </section>
    );
  }
}
