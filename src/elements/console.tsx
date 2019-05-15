import React from 'react';

import "./console.scss";

export default class Console extends React.Component<any> {

  consoleOpened = false;

  componentDidUpdate(prevProps: any) {
    this.consoleOpened =  this.props.open
  }

  state = {
    consoleOpened: false
  }

  render() {
    return (
      <section className="console">
        <main className={`console ${this.consoleOpened? "opened": ""}`}>
          <ul>
            <li>Welcome to 3yibao's console</li>
            <li>>>> Begin log</li>
            <li className="success">[20190514190405] 恭喜3怡宝活力升级 </li>
            <li className="error">[20190514190407] 3怡宝的彩票已经没戏了 </li>
            <li className="success">[20190514190405] 恭喜3怡宝活力升级 </li>
            <li className="error">[20190514190407] 3怡宝的彩票已经没戏了 </li>
            <li className="success">[20190514190405] 恭喜3怡宝活力升级 </li>
            <li className="error">[20190514190407] 3怡宝的彩票已经没戏了 </li>
            <li className="success">[20190514190405] 恭喜3怡宝活力升级 </li>
            <li className="error">[20190514190407] 3怡宝的彩票已经没戏了 </li>
            <li className="success">[20190514190405] 恭喜3怡宝活力升级 </li>
            <li className="error">[20190514190407] 3怡宝的彩票已经没戏了 </li>
            <li className="success">[20190514190405] 恭喜3怡宝活力升级 </li>
            <li className="error">[20190514190407] 3怡宝的彩票已经没戏了 </li>
          </ul>
          <footer className="action">
            <span>></span>
            <input type="text" className="cmd"/>
          </footer>
        </main>

      </section>
    );
  }
}