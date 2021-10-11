import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import * as codemirror from 'codemirror';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/comment/comment';

import 'codemirror/mode/ruby/ruby';

import 'codemirror/keymap/sublime';
import 'codemirror/keymap/vim';
import 'codemirror/keymap/emacs';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/rubyblue.css';
import 'codemirror/theme/xq-light.css';
import 'axios';

import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { changeCodeKeyMap, EditorKeyMap } from '../../features/yorkieSlice';

export default function Editor() {
  const doc = useSelector((state: RootState) => state.yorkie.doc)!;
  const client = useSelector((state: RootState) => state.yorkie.client)!;
  const editorKeyMap = useSelector(
    (state: RootState) => state.yorkie.editorKeyMap
  );

  const dispatch = useDispatch();

  if (!client || !doc) {
    return null;
  }

  return (
    <div>
      <div>
        <span style={{ fontSize: '25px' }}>Editor mode:</span>
        <select
          style={{ fontSize: '25px' }}
          value={editorKeyMap}
          onChange={(event: any) => {
            dispatch(changeCodeKeyMap(event.target.value));
          }}
        >
          <option value={EditorKeyMap.Sublime}>sublime</option>
          <option value={EditorKeyMap.Vim}>vim</option>
          <option value={EditorKeyMap.Emacs}>emacs</option>
        </select>
      </div>
      <div>
        <span style={{ fontSize: '25px' }}>Code runner:</span>
        <button
          style={{ fontSize: '25px' }}
          onClick={() => {
            const headers = {
              'Content-Type': 'application/json',
            };

            const payload = {
              code: doc.getRoot().code.getValue(),
            };
            axios
              .post('http://localhost:10000', payload, { headers })
              .then(console.log)
              .catch(console.error);
          }}
        >
          Click me!
        </button>
      </div>
      <CodeMirror
        options={{
          mode: 'ruby',
          theme: 'rubyblue',
          tabSize: 2,
          lineNumbers: true,
          lineWrapping: true,
          autoCloseTags: true,
          autoCloseBrackets: true,
          keyMap: editorKeyMap,
        }}
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
    </div>
  );
}
