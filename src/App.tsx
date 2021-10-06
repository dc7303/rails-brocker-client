import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import {
  activateClient,
  attachDoc,
  createDocument,
  deactivateClient,
  detachDocument,
} from './features/yorkieSlice';
import Main from './pages/main';
import { RootState } from './store';

function App() {
  const client = useSelector((state: RootState) => state.yorkie.client);
  const doc = useSelector((state: RootState) => state.yorkie.doc);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activateClient());
    return () => {
      dispatch(deactivateClient());
    };
  });

  useEffect(() => {
    dispatch(createDocument());
    return () => {
      dispatch(detachDocument());
    };
  });

  useEffect(() => {
    async function attachDocAsync() {
      if (!client || !doc) {
        return;
      }

      await dispatch(attachDoc({ client, doc }));
    }
    attachDocAsync();
  }, [client, doc]);

  if (!client || !doc) {
    return <div>loading......................</div>;
  }
  return (
    <div>
      <Main />
    </div>
  );
}

export default App;
