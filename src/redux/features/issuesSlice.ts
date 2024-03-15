/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IssuesState } from '../../types/IssuesState';
import { client } from '../../utils/fetchClient/fetchClient';
import { Column, Issue } from '../../types/Issue';

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

    setLoading: (
      state, action: PayloadAction<boolean>,
    ) => {
      const isLoading = action.payload;

      state.loading = isLoading;
    },

    setErrorMessage: (
      state, action: PayloadAction<string>,
    ) => {
      const error = action.payload;

      state.error = error;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.newIssues = action.payload.newIssues;
      state.closedIssues = action.payload.closedIssues;
      state.inProgressIssues = action.payload.inProgressIssues;

      state.loading = false;
      state.error = '';
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
      state.error = "Can't load newIssuess";
    });
  },
});

export const {
  updateIssues,
  addRepoLink,
  setLoading,
  setErrorMessage,
} = issueSlice.actions;

export const issueReducer = issueSlice.reducer;

export default issueSlice;
