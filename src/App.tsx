import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import Main from './pages/main';

function App() {
  return (
    <div>
      <Router>
        <Route path='/' exact render={Main} />
      </Router>
    </div>
  );
}

export default App;
