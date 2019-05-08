import React from 'react';

import {
  Link
} from "react-router-dom";

import "./navbar.scss";

export default class Navbar extends React.Component {
  render() {
    return (
      <section className="navbar">
        <div className="strip"></div>
        <nav>
          <h1>3yibao React</h1>
          <main>
            <ul>
              <li>
                <Link to="/index">index</Link>
              </li>
              <li>
                <Link to="/404">404</Link>
              </li>
            </ul>
          </main>
          <div className="flexSpacer"></div>
          <footer>
            <ul>
              <li>
                <a href="##">Github</a>
              </li>
            </ul> 
          </footer>
        </nav>
      </section>
    );
  }
}