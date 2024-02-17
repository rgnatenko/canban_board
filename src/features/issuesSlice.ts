/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IssuesState } from '../types/IssuesState';
import { client } from '../utils/fetchClient/fetchClient';
import { Column, Issue } from '../types/Issue';

const initialState: IssuesState = {
  newIssues: [],
  inProgressIssues: [],
  closedIssues: [],
  loading: false,
  error: '',
  repoLink: '',
};

export const init = createAsyncThunk('issues/fetch', (baseUrl: string) => {
  return client.getIssues<Issue[]>(baseUrl);
});

const issueSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    updateIssues: (
      state, action: PayloadAction<{
        issues: Issue[], columnName: Column
      }>,
    ) => {
      const { issues, columnName } = action.payload;

      state[columnName] = issues;
    },

    addRepoLink: (
      state, action: PayloadAction<string>,
    ) => {
      const link = action.payload;

      state.repoLink = link;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.newIssues = action.payload.newIssues
        .map(issue => {
          const sortIndex = action.payload.newIssues.indexOf(issue);

          return { ...issue, column: 'newIssues', sortIndex };
        });

      state.closedIssues = action.payload.closedIssues
        .map(issue => {
          const sortIndex = action.payload.closedIssues.indexOf(issue);

          return { ...issue, column: 'closedIssues', sortIndex };
        });

      state.inProgressIssues = action.payload.inProgressIssues
        .map(issue => {
          const sortIndex = action.payload.inProgressIssues.indexOf(issue);

          return { ...issue, column: 'inProgressIssues', sortIndex };
        });

      state.loading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = "Can't load newIssuess";
    });
  },
});

// export const { reducer: issueReducer } = issueSlice;

export const { updateIssues, addRepoLink } = issueSlice.actions;

export const issueReducer = issueSlice.reducer;

export default issueSlice;
