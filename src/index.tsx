import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import yorkie from 'yorkie-js-sdk';

const init = async () => {
  const client = yorkie.createClient('http://localhost:8080', {
    metadata: { username: 'scott' },
    syncLoopDuration: 50,
    reconnectStreamDelay: 1000,
  });
  await client.activate();

  const doc = yorkie.createDocument('test-collection', 'doc');
  await client.attach(doc);
  doc.update((root) => {
    if (!root.code) {
      root.createText('code');
    }
  });
  await client.sync();

  ReactDOM.render(
    <React.StrictMode>
      <App doc={doc} client={client} />
    </React.StrictMode>,
    document.getElementById('root')
  );
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

init();
