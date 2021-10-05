import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Client, DocumentReplica } from 'yorkie-js-sdk';
import './App.css';
import Main from './pages/main';

function App(props: { doc: DocumentReplica; client: Client }) {
  return (
    <div>
      <Router>
        <Route
          path='/'
          exact
          component={() => <Main doc={props.doc} client={props.client} />}
        />
      </Router>
    </div>
  );
}

export default App;
