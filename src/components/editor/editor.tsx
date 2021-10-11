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

import { RootState } from '../../store';
import { useSelector } from 'react-redux';

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

export default function Editor() {
  const doc = useSelector((state: RootState) => state.yorkie.doc)!;
  const client = useSelector((state: RootState) => state.yorkie.client)!;

  if (!client || !doc) {
    return null;
  }

  return (
    <CodeMirror
      options={option}
      editorDidMount={(editor: codemirror.Editor) => {
        editor.focus();
        const root = doc.getRoot();

        root.code.onChanges((changes: any) => {
          changes.forEach((change: any) => {
            const { actor, from, to } = change;
            if (change.type === 'content') {
              const content = change.content || '';

              if (actor !== client.getID()) {
                const fromPos = editor.posFromIndex(from);
                const toPos = editor.posFromIndex(to);
                editor.replaceRange(content, fromPos, toPos, 'yorkie');
              }
            }
          });
        });
        editor.setValue(root.code.getValue());
      }}
      onBeforeChange={(
        editor: codemirror.Editor,
        change: codemirror.EditorChange
      ) => {
        if (change.origin === 'yorkie' || change.origin === 'setValue') {
          return;
        }

        const from = editor.indexFromPos(change.from);
        const to = editor.indexFromPos(change.to);
        const content = change.text.join('\n');

        doc.update((root) => {
          if (root?.code) {
            root.code.edit(from, to, content);
          }
        });
      }}
    />
  );
}
