/* eslint-disable no-useless-return */
/* eslint-disable no-param-reassign */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IssuesState } from '../../types/IssuesState';
import { client } from '../../utils/fetchClient/fetchClient';
import { Column, Issue } from '../../types/Issue';
import getIssuesFromStorage from '../../utils/helpers/getIssuesFromStorage';

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
      state.error = '';
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';

      localStorage.setItem('repoLink', state.repoLink);

      const {
        issuesFromStorage,
        newIssuesToSet,
        closedIssuesToSet,
        inProgressIssuesToSet,
      } = getIssuesFromStorage(state.repoLink);

      if (issuesFromStorage) {
        Object.assign(state, {
          newIssues: newIssuesToSet,
          closedIssues: closedIssuesToSet,
          inProgressIssues: inProgressIssuesToSet,
        });

        return;
      }

      Object.assign(state, action.payload);
    });

    builder.addCase(init.rejected, (state) => {
      const example = 'https://github.com/organization/repository';
      const errorMessage = `Invalid link,
        please try again, here's example, how your link should look: ${example}`;

      state.loading = false;
      state.error = errorMessage;
    });
  },
});

export const {
  updateIssues,
  addRepoLink,
} = issueSlice.actions;

export const issueReducer = issueSlice.reducer;

export default issueSlice;
