import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router
} from "react-router-dom";

import './App.scss';

import AppRoute from "./App.route";

// Elements
import Navbar from "./elements/navbar";

export default class App extends Component {


  render() {

    return (
      <section className="3yibaoReact">
        <Router>
          <Navbar />
          
          <main>
            <AppRoute />
          </main>

          <footer>
            © 2019 Valorad the Oneiroseeker
          </footer>
        </Router>
        <div>
          <ToastContainer />
        </div>
      </section>
    );
  }

}
