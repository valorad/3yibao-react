import React from 'react';

// interfaces
import { MasterState } from "../interface/index.interface";

// elements
import Billboard from "../elements/billboard";
import Dashboard from "../elements/dashboard";
import Console from "../elements/console";
import Notification from "../elements/notification";


import "./index.scss";

// import Storm from "../elements/storm";

export default class Index extends React.Component<any, MasterState> {

  newLog = {
    type: "",
    log: "Begin log >>>>>"
  }

  nextMessageId = 0;

  calcTimer: any = null;

  defaultIcon = "iconhuoguo";

  newMessage = {
    id: 0,
    content: "",
    type: ""
  }

  state = {
    yibao: 3,
    experiences: [    ],
    probabilities: [    ]
  }

  // tmp input data
  newExperience: any[] = [
    {
      name: "活力",
      icon: "iconhuoli",
      level: {
        thresholds: [-1000, -500, -300, -200, -150, -100, -50, 0, 100, 200, 300, 500, 750, 1000, 1500, 2000, 3000, 5000],
        order: "asc"
      },
      offset: -0.05,
      magnifier: 10,
      chart: {
        minValue: -1050,
        type: "line"
      },
      message: {
        upgrade: {
          chart: "",  // <- display beside chart
          notification: "恭喜<%yibao>怡宝活力升级！"  // <- to notification and console
        },
        downgrade: {
          chart: "",  // <- display beside chart
          notification: "哎呀<%yibao>怡宝失去了活力"  // <- to notification and console
        }
      }

    },
    {
      name: "负能量",
      icon: "iconfunengliang",
      level: {
        thresholds: [500, 300, 200, 100, 0, -100, -200, -300, -400, -500, -750, -1000],
        order: "desc"
      },
      offset: -1,
      magnifier: 15,
      chart: {
        minValue: -1500,
        type: "line"
      },
      message: {
        upgrade: {
          chart: "",  // <- display beside chart
          notification: "<%yibao>怡宝的负能量爆炸了！"  // <- to notification and console
        },
        downgrade: {
          chart: "",  // <- display beside chart
          notification: "<%yibao>怡宝正能量成功上线"  // <- to notification and console
        }
      }
    }
  ];

  // tmp input data
  newProbabilities: any[] = [
    {
      name: "彩票中特等概率",
      icon: "iconcaipiao",
      offset: 0.523,
      currentValue: 50 ,
      chart: {
        minValue: 0.001,
        type: "gauge"
      },
      message: {
        peak: {
          chart: "",  // <- display beside chart
          notification: ""  // <- to notification and console
        },
        valley: {
          chart: "您没戏了！还不如资助下<%yibao>怡宝的儿！",  // <- display beside chart
          notification: "<%yibao>怡宝的彩票已经打水漂了"  // <- to notification and console
        }
      }
      
    },
    {
      name: "减肥成功率",
      icon: "iconjianfei",
      offset: 0.518,
      currentValue: 30 ,
      chart: {
        minValue: 0.001,
        type: "gauge"
      },
      message: {
        peak: {
          chart: "",  // <- display beside chart
          notification: ""  // <- to notification and console
        },
        valley: {
          chart: "<%yibao>怡宝已经放弃减肥了",  // <- display beside chart
          notification: "<%yibao>怡宝已经放弃减肥了"  // <- to notification and console
        }
      }
      
    },
    {
      name: "咖啡飘香指数",
      icon: "iconkafei",
      offset: 0.505,
      currentValue: 10 ,
      chart: {
        minValue: 0.001,
        type: "gauge"
      },
      message: {
        peak: {
          chart: "",  // <- display beside chart
          notification: ""  // <- to notification and console
        },
        valley: {
          chart: "<%yibao>怡宝的咖啡中有一股💩味",  // <- display beside chart
          notification: "<%yibao>怡宝的咖啡中有一股💩味"  // <- to notification and console
        }
      }
      
    }
  ];

  consoleOpened = false;
  


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
        icon: prob.icon || this.defaultIcon,
        offset: prob.offset || 0,
        currentValue: prob.currentValue || 50, // <-- in percentage %
        chart: {
          minValue: prob.chart.minValue || 0.00001,
          type: prob.chart.type || "line"
        },
        message: {
          peak: {
            chart: prob.message.peak.chart || `高到爆表！`,  // <- display beside chart
            notification: prob.message.peak.notification || `${prob.name}达到巅峰！`  // <- to notification and console
          },
          valley: {
            chart: prob.message.valley.chart || `可以忽略不计`,  // <- display beside chart
            notification: prob.message.valley.notification || `${prob.name}已经很低了`  // <- to notification and console
          }
        },
        state: "normal"
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

      let prevProb = prob.currentValue;
      prob.state = "normal";

      prob.currentValue *= Math.random() + prob.offset;
      if (prob.currentValue > 100) {
        prob.currentValue = 100;
      }
      if (!(prevProb > 95) && prob.currentValue > 95) {
        this.logToConsole(prob.message.peak.notification, "success");
        this.notify(prob.message.peak.notification, "success");
        prob.state = "peak";

      } else if (!(prevProb < prob.chart.minValue) && prob.currentValue < prob.chart.minValue){
        this.logToConsole(prob.message.valley.notification, "error");
        this.notify(prob.message.valley.notification, "error");
        prob.state = "valley";
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
        icon: exp.icon || this.defaultIcon,
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
        },
        message: {
          upgrade: {
            chart: exp.message.upgrade.chart || `恭喜您的${exp.name}升级了！`,  // <- display beside chart
            notification: exp.message.upgrade.notification || `${exp.name}升级了`  // <- to notification and console
          },
          downgrade: {
            chart: exp.message.downgrade.chart || `哎呀您的${exp.name}降级了`,  // <- display beside chart
            notification: exp.message.downgrade.notification || `${exp.name}降级了`  // <- to notification and console
          }
        },
        state: "normal"
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

      let prevLevel = exp.level.now;
      exp.state = "normal";// reset to normal on each state beginning

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

        if (exp.level.now < prevLevel) {
          this.logToConsole(exp.message.upgrade.notification, "error");
          this.notify(exp.message.upgrade.notification, "error");
          exp.state = "upgrade";
        } else if (exp.level.now > prevLevel) {
          this.logToConsole(exp.message.downgrade.notification, "success");
          this.notify(exp.message.downgrade.notification, "success");
          exp.state = "downgrade";
        }
        

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


        if (exp.level.now > prevLevel) {
          this.logToConsole(exp.message.upgrade.notification, "success");
          this.notify(exp.message.upgrade.notification, "success");
          exp.state = "upgrade";
        } else if (exp.level.now < prevLevel) {
          this.logToConsole(exp.message.downgrade.notification, "error");
          this.notify(exp.message.downgrade.notification, "error");
          exp.state = "downgrade";
        }

      }


    } // <-- for

    

    return nextExps;

  };

  toggleConsole = (e: React.KeyboardEvent) => {
    if (e.key === ("`" || "~")) {
      this.consoleOpened = !this.consoleOpened;
    }
  };

  toggleConsoleClick = (e: React.MouseEvent) => {
    this.consoleOpened = !this.consoleOpened;
  };

  logToConsole = (log: string, type?: string) => {
    // type: error, success
    this.newLog = {
      type: type || "",
      log
    }
  };

  notify = (content: string, type: string) => {
    this.nextMessageId++;
    this.newMessage = {
      id: this.nextMessageId,
      content: content,
      type: type
    }
  };

  componentDidMount() {

    this.createExperiences();
    this.createProbabilities();
    
    this.calcTimer = setInterval(() => {
      this.calcNext();
    }, 200);
    
  }

  componentWillUnmount() {
    clearInterval(this.calcTimer);
  }


  render() {

    return (
      <section className="index" onKeyUp={this.toggleConsole} tabIndex={0}>
        <header onClick={this.toggleConsoleClick}>
          <Billboard yibao={this.state.yibao} />
        </header>
        <main>
          <h2>提示：按下"~"键或点击上方“恭喜{this.state.yibao}怡宝”打开控制台查看历史记录</h2>
          {/* <Boom /> */}
          <Dashboard masterState={this.state} />
        </main>
        <Console open={this.consoleOpened} log={this.newLog} yibao={this.state.yibao} />
        <Notification nextMessage={this.newMessage} yibao={this.state.yibao} />

      </section>
    );
  }
}