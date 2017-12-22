import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = () => (
  <div className="navigation">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/1d">1D automata</Link></li>
      <li><Link to="/2d">2D automata</Link></li>
    </ul>
  </div>
);

export default Navigation;
