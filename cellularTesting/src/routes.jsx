import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './app';
import Index from './components/pages/Index';
import Automaton1D from './components/pages/Automaton1D';
import Automaton2D from './components/pages/Automaton2D';
import 'styles/index.scss';

const Routes = () => (
  <Router>
    <div>
      <Route
        exact
        path="/"
        render={() => (
          <App>
            <Index />
          </App>
        )}
      />
      <Route
        path="/1d"
        render={() => (
          <App>
            <Automaton1D />
          </App>
        )}
      />
      <Route
        path="/2d"
        render={() => (
          <App>
            <Automaton2D />
          </App>
        )}
      />
    </div>
  </Router>
);

export default Routes;
