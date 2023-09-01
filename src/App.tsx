import React from 'react';
import './App.css';
import { BrowserRouter, NavLink } from "react-router-dom"
import RouterView from './router/index';
import routes from './router/router';

function App(): JSX.Element {
  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          <li> <NavLink to="/counter" exact>counter</NavLink> </li>
          <li> <NavLink to="/home" exact>home</NavLink> </li>
        </ul>
        <RouterView routes={routes} />
      </BrowserRouter>
    </div>
  );
}

export default App;
