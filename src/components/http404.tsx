import React from 'react';

import {
  Link
} from "react-router-dom";

import "./http404.scss";

export default class Http404 extends React.Component {

  render() {
    return (
        <section className="http404">
        <div>
          <h1>404 Page Not Found</h1>
          <div>
            <p>很抱歉让您走丢了，快回到 </p>
            <p><Link to="/index"> 首页</Link></p>
          </div>
        </div>
        </section>
    );
  }

}