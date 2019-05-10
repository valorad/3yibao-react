import React from 'react';

// elements
import Billboard from "../elements/billboard";
import Boom from "../elements/boom";
// import Storm from "../elements/storm";

interface IndexState {
  yibao: number,
  lottery: number
}

export default class Index extends React.Component<any, IndexState> {

  state = {
    yibao: 3,
    lottery: 50
  }


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
        yibao: Math.ceil(Math.random() * 9),
        lottery: prev.lottery + 5 * this.generateGaussianRand() // random walk
      }
    });
  };

  componentDidMount() {
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
          <Boom />
          彩票中特等概率 {this.state.lottery}
        </main>
      </section>
    );
  }
}