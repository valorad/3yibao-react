import React from 'react';

import fusioncharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";

import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import ReactFC from 'react-fusioncharts';

ReactFC.fcRoot(fusioncharts, charts, FusionTheme);

export default class Chartline extends React.Component {

  dataSource = {
    chart: {
      caption: "Test Chart",
      yaxisname: "points",
      subcaption: "[test lala]",
      numbersuffix: " ",
      rotatelabels: "1",
      setadaptiveymin: "1",
      drawAnchors: "0",
      theme: "fusion"
    },
    data: [
      {
        label: "2005",
        value: "89.45"
      },
      {
        label: "2006",
        value: "89.87"
      },
      {
        label: "2007",
        value: "89.64"
      },
      {
        label: "2008",
        value: "90.13"
      },
      {
        label: "2009",
        value: "90.67"
      },
      {
        label: "2010",
        value: "90.54"
      },
      {
        label: "2011",
        value: "90.75"
      },
      {
        label: "2012",
        value: "90.8"
      },
      {
        label: "2013",
        value: "91.16"
      },
      {
        label: "2014",
        value: "91.37"
      },
      {
        label: "2015",
        value: "91.66"
      },
      {
        label: "2016",
        value: "91.8"
      }
    ]
  };

  state = {
    data: this.dataSource
  }

  getTable = () => {

  };

  componentDidMount() {


  }

  start = 2017;

  addData = () => {

    this.setState((prev: any) => {
      let prevData = prev.data.data;

      prevData.push({
        label: this.start.toString(),
        value: (91.8).toString()
      })

      this.start++;

      return {
        ...prev,
        data: {
          data: prevData
        }
      }
    })
    
  };

  render() {
    return (
      <div className="linechart">
        <button onClick={this.addData}>+++</button>
        <ReactFC
          type="line"
          width="100%"
          height="100%"
          dataFormat="JSON"
          dataSource={this.dataSource}
        />
      </div>
    );
  }

}