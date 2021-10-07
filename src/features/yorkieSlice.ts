import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import yorkie, { Client, DocumentReplica } from 'yorkie-js-sdk';
import anonymous from 'anonymous-animals-gen';

type ActivateClientResult = { client: Client };
type AttachDocArgs = { doc: DocumentReplica; client: Client };
type AttachDocResult = { doc: DocumentReplica; client: Client };

export interface YorkieState {
  doc?: DocumentReplica;
  client?: Client;
}

const initialState: YorkieState = {};

export const activateClient = createAsyncThunk<
  ActivateClientResult,
  undefined,
  { rejectValue: string }
>('doc/activate', async (_: undefined, thunkApi) => {
  try {
    const { name } = anonymous.generate();
    const client = yorkie.createClient('http://localhost:8080', {
      metadata: {
        username: name,
      },
    });

    await client.activate();
    return { client };
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export const attachDoc = createAsyncThunk<
  AttachDocResult,
  AttachDocArgs,
  { rejectValue: string }
>('doc/attach', async ({ client, doc }, thunkApi) => {
  try {
    await client.attach(doc);

    // doc.update((root) => {
    //   if (!root.code) {
    //     root.createText('code');
    //   }
    // });
    await client.sync();
    return { doc, client };
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.message);
  }
});

export const yorkieSlice = createSlice({
  name: 'yorkie',
  initialState,
  reducers: {
    deactivateClient(state) {
      const { client } = state;
      state.client = undefined;
      client?.deactivate();
    },
    createDocument(state) {
      state.doc = yorkie.createDocument('test-collection', 'doc');
    },
    detachDocument(state) {
      const { doc, client } = state;
      state.doc = undefined;
      client?.detach(doc as DocumentReplica);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(activateClient.fulfilled, (state, { payload }) => {
      state.client = payload.client;
    });
    builder.addCase(attachDoc.fulfilled, (state, { payload }) => {
      state.doc = payload.doc;
      state.client = payload.client;
    });
  },
});

export const { deactivateClient, createDocument, detachDocument } =
  yorkieSlice.actions;
export default yorkieSlice.reducer;
