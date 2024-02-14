/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IssuesState } from '../types/IssuesState';
import { client } from '../utils/fetchClient';
import { Issue } from '../types/Issue';

const initialState: IssuesState = {
  newIssues: [],
  inProgressIssues: [],
  closedIssues: [],
  loading: false,
  error: '',
};

export const init = createAsyncThunk('issues/fetch', (baseUrl: string) => {
  return client.getIssues<Issue[]>(baseUrl);
});

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.newIssues = action.payload.newIssues;
      state.closedIssues = action.payload.closedIssues;
      state.inProgressIssues = action.payload.inProgressIssues;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = "Can't load newIssuess";
    });
  },
});

export const { reducer: issueReducer } = issueSlice;

export default issueSlice;
