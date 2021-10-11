import React, { useEffect, useState } from 'react';
import 'styled-components';
import 'javascript-terminal';
// @ts-ignore
import { EmulatorState, OutputFactory, Outputs } from 'javascript-terminal';
// @ts-ignore
import ReactTerminal from 'react-terminal-component';
// @ts-ignore
import { ReactThemes } from 'react-terminal-component';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function Terminal() {
  const doc = useSelector((state: RootState) => state.yorkie.doc)!;
  const client = useSelector((state: RootState) => state.yorkie.client)!;

  let emulatorState = EmulatorState.createEmpty();
  const [log, setLog] = useState(emulatorState);
  const [activateSubscriber, setActivateSubscriber] = useState(false);

  useEffect(() => {
    const root = doc.getRoot();
    if (!root?.log || activateSubscriber) {
      return;
    }
    const text = root.log.getValue();
    if (text) {
      const newOutputs = Outputs.addRecord(
        emulatorState.getOutputs(),
        OutputFactory.makeTextOutput(text)
      );
      setLog((l: any) => {
        const newState = l.setOutputs(newOutputs);
        emulatorState = newState;
        return newState;
      });
    }

    root.log.onChanges((changes: any) => {
      changes.forEach((change: any) => {
        if (change.content) {
          const newOutputs = Outputs.addRecord(
            emulatorState.getOutputs(),
            OutputFactory.makeTextOutput(change.content)
          );
          setLog((l: any) => {
            const newState = l.setOutputs(newOutputs);
            emulatorState = newState;
            return newState;
          });
        }
      });
    });
    setActivateSubscriber(() => true);
  }, []);
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
