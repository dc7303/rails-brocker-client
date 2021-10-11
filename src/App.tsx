import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import {
  activateClient,
  attachDoc,
  attachDocLoading,
  createDocument,
  deactivateClient,
  detachDocument,
} from './features/yorkieSlice';
import Main from './pages/main';
import { RootState } from './store';

function App() {
  const client = useSelector((state: RootState) => state.yorkie.client);
  const doc = useSelector((state: RootState) => state.yorkie.doc);
  const loading = useSelector((state: RootState) => state.yorkie.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activateClient());
    return () => {
      dispatch(deactivateClient());
    };
  }, []);

  useEffect(() => {
    dispatch(createDocument());
    return () => {
      dispatch(detachDocument());
    };
  }, []);

  useEffect(() => {
    async function attachDocAsync() {
      if (!client || !doc) {
        return;
      }

      dispatch(attachDocLoading(true));
      await dispatch(attachDoc({ client, doc }));
      dispatch(attachDocLoading(false));
    }

    attachDocAsync();
    return () => {
      dispatch(attachDocLoading(true));
    };
  }, [client, doc]);

  if (loading || !client || !doc) {
    return <div>loading......................</div>;
  }

  return (
    <div>
      <Main />
    </div>
  );
}

export default App;
