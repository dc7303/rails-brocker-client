import React from 'react';
import 'styled-components';
import 'javascript-terminal';
// @ts-ignore
import { EmulatorState, OutputFactory, Outputs } from 'javascript-terminal';
// @ts-ignore
import ReactTerminal from 'react-terminal-component';
// @ts-ignore
import { ReactOutputRenderers, ReactThemes } from 'react-terminal-component';
import { DocumentReplica } from 'yorkie-js-sdk';

export default function Terminal(props: { doc: DocumentReplica }) {
  const defaultState = EmulatorState.createEmpty();
  const defaultOutputs = defaultState.getOutputs();

  const newOutputs = Outputs.addRecord(
    defaultOutputs,
    OutputFactory.makeTextOutput('This terminal is read-only.')
  );
  const emulatorState = defaultState.setOutputs(newOutputs);

  return (
    <div>
      <ReactTerminal
        theme={ReactThemes.hacker}
        emulatorState={emulatorState}
        acceptInput={false}
        autoFocus={false}
      />
    </div>
  );
}
