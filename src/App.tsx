import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  HashRouter as Router
} from "react-router-dom";

import './App.scss';

import AppRoute from "./App.route";

// Elements
import Navbar from "./elements/navbar";

export default class App extends Component {


  render() {

    return (
      <section className="t3yibaoReact">
        <Router>
          <Navbar />
          
          <main>
            <AppRoute />
          </main>

          <footer>
            © 2019 Valorad the Oneiroseeker
          </footer>
        </Router>
        <div className="notificationHolder">
          <ToastContainer autoClose={2000} />
        </div>
      </section>
    );
  }

}
