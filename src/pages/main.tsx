import React from 'react';
import { Client, DocumentReplica } from 'yorkie-js-sdk';
import Editor from '../components/editor/editor';
import Terminal from '../components/terminal/terminal';

export default function Main(props: { doc: DocumentReplica; client: Client }) {
  return (
    <div>
      <Editor client={props.client} doc={props.doc}></Editor>
      <Terminal client={props.client} doc={props.doc}></Terminal>
    </div>
  );
}
