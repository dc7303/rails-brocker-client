import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import * as codemirror from 'codemirror';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/comment/comment';

import 'codemirror/mode/ruby/ruby';

import 'codemirror/keymap/sublime';
import 'codemirror/keymap/emacs';
import 'codemirror/keymap/vim';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/rubyblue.css';
import 'codemirror/theme/xq-light.css';

import { Client, DocumentReplica } from 'yorkie-js-sdk';

const option = {
  mode: 'ruby',
  theme: 'rubyblue',
  tabSize: 2,
  lineNumbers: true,
  lineWrapping: true,
  autoCloseTags: true,
  autoCloseBrackets: true,
  keyMap: 'sublime',
};

const initText = `# 안녕하세요`;

export default function Editor(props: {
  client: Client;
  doc: DocumentReplica;
}) {
  props.client.subscribe((event) => {
    console.log('event----', event);
  });

  return (
    <CodeMirror
      value={initText}
      options={option}
      editorDidMount={(editor: codemirror.Editor) => {
        editor.focus();
      }}
      onBeforeChange={(editor, data, value) => {}}
      onChange={(editor, data, value) => {}}
    />
  );
}
