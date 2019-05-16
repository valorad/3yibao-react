import React from 'react';

import "./about.scss";

import reactLogo from "../assets/img/logo.svg";


export default class About extends React.Component {

  render() {
    return (
      <section className="about">
        <div className="mainContent">
          {/* <h1><span>三怡宝</span> <span>X</span> <span>(react)</span> </h1> */}
          <header>
            <div className="logo">
              <div className="holder">
                <h1>三怡宝</h1>
                <p>Troisième C'est bon</p>
              </div>
              <div className="react">
                <img className="reactLogo" src={reactLogo} alt="reactLogo"/>
              </div>
            </div>

            <div className="descr">
              <h2>
                三怡宝的日常放松专属屏保
              </h2>
            </div>

          </header>
          <main className="descr">

            <p>by<img src="https://github.com/valorad.png" alt="va" className="avatar"/> valorad @ xmj-alliance</p>

          </main>

        </div>
      </section>
    );
  }

}