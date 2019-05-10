import React from 'react';

import "./boom.scss";

import explosion from '../assets/img/starburst-explosion.svg';

export default class Boom extends React.Component {
  render() {
    return (
      <section className="boom">
        <div className="holder">
          <picture>
            <img src={explosion} className="boom" alt="boom" />
            <h1>Boom!!!</h1>
          </picture>
        </div>
      </section>
    );
  }
}