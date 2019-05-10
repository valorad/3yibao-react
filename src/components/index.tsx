import React from 'react';

// elements
import Billboard from "../elements/billboard";
import Boom from "../elements/boom";
import Storm from "../elements/storm";

export default class Index extends React.Component {
  render() {
    return (
      <section className="index">
        <header>
          <Billboard />
        </header>
        <main>
          <Storm />
        </main>
      </section>
    );
  }
}