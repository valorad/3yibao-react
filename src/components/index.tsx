import React from 'react';

// elements
import Billboard from "../elements/billboard"

export default class Index extends React.Component {
  render() {
    return (
      <section className="index">
        <header>
          <Billboard />
        </header>
      </section>
    );
  }
}