import React from 'react';

import { 
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// components
import Index from './components/index';
import Http404 from './components/http404';

export default class AppRoute extends React.Component {
  render() {
    return (

      <Switch>

        <Route exact path="/" render={() => ( <Redirect to="/index"/> )}/>
        <Route path="/index" component={Index} />
        <Route component={Http404} />
        
      </Switch>


    );
  }
}