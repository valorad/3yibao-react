import React from 'react';

import "./storm.scss";

import storm from '../assets/img/storm.svg';

export default class Storm extends React.Component {
  render() {
    return (
      <section className="storm">
        <div className="holder">
          <picture>
            <img className="storm" src={storm} alt="storm" />
          </picture>
        </div>
      </section>
    );
  }
}