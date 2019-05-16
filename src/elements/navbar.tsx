import React from 'react';

import {
  Link
} from "react-router-dom";

import reactLogo from "../assets/img/logo.svg";

import "./navbar.scss";

export default class Navbar extends React.Component {
  render() {
    return (
      <section className="navbar">
        <div className="strip"></div>
        <nav>
          <header>
            <h1>3yibao</h1>
            <img className="reactLogo" src={reactLogo} alt="reactLogo"/>
          </header>
          <main>
            <ul>
              <li>
                <Link to="/index">首页</Link>
              </li>
              <li>
                <Link to="/about">关于</Link>
              </li>
            </ul>
          </main>
          <div className="flexSpacer"></div>
          <footer>
            <ul>
              <li>
                <a target="_blank" href="https://github.com/valorad/3yibao-react" rel="noopener noreferrer"> <i className="iconfont icongithub"></i> 给特哈布</a>
              </li>
            </ul> 
          </footer>
        </nav>
      </section>
    );
  }
}