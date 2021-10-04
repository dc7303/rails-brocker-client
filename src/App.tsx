import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { DocumentReplica } from 'yorkie-js-sdk';
import './App.css';
import Main from './pages/main';

function App(props: { doc: DocumentReplica }) {
  return (
    <div>
      <Router>
        <Route path='/' exact component={() => <Main doc={props.doc} />} />
      </Router>
    </div>
  );
}

export default App;
