import React from 'react';
import { DocumentReplica } from 'yorkie-js-sdk';
import Editor from '../components/editor/editor';
import Terminal from '../components/terminal/terminal';

export default function Main(props: { doc: DocumentReplica }) {
  return (
    <div>
      <Editor doc={props.doc}></Editor>
      <Terminal doc={props.doc}></Terminal>
    </div>
  );
}
