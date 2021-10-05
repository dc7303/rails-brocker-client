import React, { useState } from 'react';
import 'styled-components';
import 'javascript-terminal';
// @ts-ignore
import { EmulatorState, OutputFactory, Outputs } from 'javascript-terminal';
// @ts-ignore
import ReactTerminal from 'react-terminal-component';
// @ts-ignore
import { ReactThemes } from 'react-terminal-component';
import { Client, DocEvent, DocumentReplica } from 'yorkie-js-sdk';

export default function Terminal(props: {
  client: Client;
  doc: DocumentReplica;
}) {
  const defaultState = EmulatorState.createEmpty();
  const defaultOutputs = defaultState.getOutputs();

  const newOutputs = Outputs.addRecord(
    defaultOutputs,
    OutputFactory.makeTextOutput('terminal is read-only.')
  );
  const emulatorState = defaultState.setOutputs(newOutputs);
  const [log, setLog] = useState(emulatorState);

  const root = props.doc.getRoot();
  root.log.onChanges((changes: any) => {
    changes.forEach((change: any) => {
      if (change.content) {
        const newOutputs = Outputs.addRecord(
          log.getOutputs(),
          OutputFactory.makeTextOutput(change.content)
        );

        setLog(emulatorState.setOutputs(newOutputs));
      }
    });
  });

  return (
    <div>
      <ReactTerminal
        theme={ReactThemes.hacker}
        emulatorState={log}
        acceptInput={false}
        autoFocus={false}
      />
    </div>
  );
}
