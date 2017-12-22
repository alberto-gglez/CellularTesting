import React from 'react';
import Navigation from './components/Navigation';
import 'normalize.css';
import 'styles/index.scss';

const App = props => (
  <div className="App">
    <Navigation />
    <div className="content">{props.children}</div>
  </div>
);

export default App;
