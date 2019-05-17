import React from 'react';

import "./billboard.scss";

export default class Billboard extends React.Component<any> {

  settings = {
    numRow: 5,
    numColumn: 20,
    lightInterval: 50,
    lightActive: false
  };

  timers: any = {
    top: null,
    left: null,
    bottom: null,
    right: null
  }

  refresh = () => {
    this.setState(
      (prevState: any) => (
        {
          update: !prevState.update
        }
      )
    );
  };

  formLightMatrix = () => {

    let lightMatrix: any[][] = [];

    for (let i = 0; i < this.settings.numRow; i++) {
      let row = [];
      for (let j = 0; j < this.settings.numColumn; j++) {
        row.push({active: false});
      }
      lightMatrix.push(row);
    }

    return lightMatrix;

  };

  placeBulbs = () => {
    let bulbs = this.state.lightMatrix.map((rows, rowIndex) => {
      let row = rows.map((col, colIndex) => {

        return (<td className={col.active? 'active': ''} key={rowIndex + "-" + colIndex}>{"O"}</td>)
      });

      return (<tr key={rowIndex}>{ row }</tr>)
    });

    return <tbody>{bulbs}</tbody>;
  };

  lightManager = () => {
    return new Promise((resolve, reject) => {
      this.lightbottom().then( () => {
          this.lightRight().then();
        }
      );

      this.lighttop().then( () => {

        this.lightLeft().then( () => {

          resolve(); // exit
        });
      });

    })
  };

  lightCarousel = async () => {

    while (this.settings.lightActive) {
      await this.lightManager();
    }

  };

  lightbottom = () => {

    // lightings of the bottom row, from left to right

    return new Promise((resolve, reject)=>{

      let bottomRow = this.state.lightMatrix[this.state.lightMatrix.length - 1];

      let bulbIndex = 0;

      // clear the last exec state
      bottomRow[bottomRow.length - 1].active = false;
  
      this.timers.bottom = setInterval(
        () => {

          bottomRow[bulbIndex].active = true;
          if (bulbIndex > 0) {
            bottomRow[bulbIndex-1].active = false;
          }
          bulbIndex++;
          this.refresh();
          if (bulbIndex >= bottomRow.length) {
            clearInterval(this.timers.bottom)
            resolve();
          }
        },
        this.settings.lightInterval
      );
    });

  };

  lighttop = () => {

    // lightings of the top row, from right to left
    return new Promise((resolve, reject)=>{
      
      let bottomRow = this.state.lightMatrix[0];

      let bulbIndex = bottomRow.length - 1;

      // clear the last exec state
      bottomRow[0].active = false;

      this.timers.top = setInterval(
        () => {

          bottomRow[bulbIndex].active = true;
          if (bulbIndex < bottomRow.length - 1) {
            bottomRow[bulbIndex + 1].active = false;
          }
          bulbIndex--;
          this.refresh();
          if (bulbIndex < 0) {
            clearInterval(this.timers.top);
            resolve();
          }
        },
        this.settings.lightInterval
      );
    });

  };

  lightRight = () => {
    return new Promise((resolve, reject)=>{

      let lastCell = this.state.lightMatrix.length - 1;

      let bulbIndex = lastCell;

      let lastColumn: any[] = [];

      for (let row of this.state.lightMatrix) {
        lastColumn.push(row[this.state.lightMatrix[0].length - 1])
      }


      // clear the last exec state
      lastColumn[0].active = false;

      // console.log(lastColumn);

      this.timers.right = setInterval(
        () => {

          lastColumn[bulbIndex].active = true;
          if (bulbIndex < lastColumn.length - 1) {
            lastColumn[bulbIndex + 1].active = false;
          }
          bulbIndex--;
          this.refresh();
          if (bulbIndex < 0) {
            clearInterval(this.timers.right);
            resolve();
          }
        },
        this.settings.lightInterval
      );


    });
  };

  lightLeft = () => {
    return new Promise((resolve, reject)=>{

      let bulbIndex = 0;

      let firstColumn: any[] = [];

      let lastCell = this.state.lightMatrix.length - 1;

      for (let row of this.state.lightMatrix) {
        firstColumn.push(row[0])
      }

      // clear the last exec state
      firstColumn[lastCell].active = false;

      this.timers.left = setInterval(
        () => {

          firstColumn[bulbIndex].active = true;
          if (bulbIndex > 0) {
            firstColumn[bulbIndex - 1].active = false;
          }
          bulbIndex++;
          this.refresh();
          if (bulbIndex >= this.state.lightMatrix.length) {
            clearInterval(this.timers.left);
            resolve();
          }
        },
        this.settings.lightInterval
      );


    });
  };

  state = {
    update: true,
    lightMatrix: this.formLightMatrix()
  }


  componentDidMount() {
    this.settings.lightActive = true;
    this.lightCarousel();
  }

  componentWillUnmount() {
    this.settings.lightActive = false;
    for (let key in this.timers) {
      clearInterval(this.timers[key]);
    }
  }

  render() {

    return (
      <section className="billboard">
        <div className="screen">
          <table>
            { this.placeBulbs() }
          </table>
        </div>
        <div className="contents">
          <h1> <p className="zmLight">恭喜<span>{this.props.yibao || 3}</span>怡宝</p> </h1>
        </div>

      </section>
    );
  }

}