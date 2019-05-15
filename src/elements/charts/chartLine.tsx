import React from 'react';

import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";

import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';

import "./chartline.scss";

import { lineChartConfig } from "../../interface/chart.interface";

ReactFC.fcRoot(fusioncharts, charts, FusionTheme);

interface chartData {
  label: string,
  value: string
}

interface chartdataSource {
  chart: lineChartConfig,
  data: chartData[],
  maxLength: number
}

interface chartstate {
  dataSource: chartdataSource
}

interface chartprop {
  config: {}
  nextValue: number,
  minValue?: number
}

export default class Chartline extends React.Component<chartprop, chartstate> {

  graphDisabled = false; // if true: stop adding new data, and graph grey out
  minValueToDisplay = 0;

  dataSource: chartdataSource = {
    chart: {
      caption: "Line Chart",
      yaxisname: "unit",
      subcaption: " ",
      numbersuffix: " ",
      rotatelabels: 1,
      setadaptiveymin: 1,
      drawAnchors: 0,
      theme: "fusion"
    },
    data: [    ],
    maxLength: 30
  };



  insertData = (nextValue: string) => {

    this.dataSource.data.push({
      label: " ",
      value: nextValue
    })

    if (this.dataSource.data.length > this.dataSource.maxLength) {
      this.dataSource.data.shift();
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

    this.minValueToDisplay = this.props.minValue || 0;

    if ( prevProps.nextValue <= this.minValueToDisplay ) {
      this.graphDisabled = true;
    } else {
      this.graphDisabled = false;
      this.insertData(prevProps.nextValue.toString());
    }
 
  }


  render() {

    return (
      <section className="linechart">

        <div className={`chart ${this.graphDisabled? "disabled": ""}`}>
          <ReactFC
            type="line"
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