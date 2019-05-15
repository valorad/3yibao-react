import React from 'react';

import "./console.scss";

export default class Console extends React.Component<any> {

  consoleOpened = false;

  logs: any[] = [];

  logIndex = -1;

  placeLogs = () => {
    let lis = this.logs.map((log)=>{
      this.logIndex++;
      return (< li key={this.logIndex} className={log.type}>[{log.time}] {log.parselog} </li> )
    });

    return lis;
  };

  componentDidUpdate(prevProps: any) {
    this.consoleOpened =  prevProps.open;
    if (prevProps.log !== this.props.log) {

      let now = new Date();
      this.props.log.time = now.toLocaleTimeString();
      this.props.log.parselog = this.props.log.log.replace(/<%yibao>/g, this.props.yibao);
      this.logs.push(this.props.log)

      this.logIndex++;

    }

  }

  state = {
    logs: this.logs,
    consoleOpened: false
  }

  render() {
    return (
      <section className="console">
        <main className={`console ${this.consoleOpened? "opened": ""}`}>
          <ul>
            <li>Welcome to 3yibao's console</li>
            <li>>>> Begin log</li>
            {this.placeLogs()}
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