import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from 'react-bootstrap/Nav'
import About from './pages/About/About'
import Home from './pages/Home/Home'

export default function App() {
  return (
    <Router>
      <div>
        <Nav className="fixed-bottom justify-content-center py-1 bg-dark">
          <Nav.Item>
            <Nav.Link href="/" className="text-white" style={{ fontFamily: 'Pacifico' }}>
              COVID-19 Data go pew pew 📊
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/about" className="text-white">
              About
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
