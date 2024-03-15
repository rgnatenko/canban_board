import { Dispatch, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import {
  addRepoLink,
  init,
  setErrorMessage,
  setLoading,
  updateIssues,
} from '../../redux/features/issuesSlice';
import { IssuesState } from '../../types/IssuesState';
import normalizeUrl from './normalizeUrl';
import validateGitHubAPI from './validateGithubApiUrl';
import parseDataFromStorage from './parseDataFromStorage';
import { Issue } from '../../types/Issue';
import Issues from '../../types/Issues';

interface Arguments {
  setIsWriting: (arg: boolean) => void,
  repoLink: string,
  dispatch: ThunkDispatch<{
    issues: IssuesState;
  }, undefined, UnknownAction> & Dispatch<UnknownAction>
}

type LoadIssues = (arg: Arguments) => void;

const loadIssues: LoadIssues = ({
  setIsWriting,
  repoLink,
  dispatch,
}) => {
  setIsWriting(false);

  if (repoLink) {
    const { fullLink } = normalizeUrl(repoLink);

    dispatch(setLoading(true));

    validateGitHubAPI(fullLink)
      .then(result => {
        localStorage.setItem('repoLink', repoLink);

        if (result) {
          dispatch(addRepoLink(repoLink));

          const issuesFromStorage
            = parseDataFromStorage<Issues, boolean>(repoLink, false);

          const newIssuesToSet: Issue[]
            = issuesFromStorage.newIssues
              ? issuesFromStorage.newIssues.map(issue => {
                const sortIndex = issuesFromStorage.newIssues.indexOf(issue);

                return { ...issue, column: 'newIssues', sortIndex };
              }) : [];

          const closedIssuesToSet: Issue[]
            = issuesFromStorage.closedIssues ? issuesFromStorage.closedIssues
              .map(issue => {
                const sortIndex = issuesFromStorage
                  .closedIssues.indexOf(issue);

                return { ...issue, column: 'closedIssues', sortIndex };
              }) : [];

          const inProgressIssuesToSet: Issue[]
            = issuesFromStorage.inProgressIssues
              ? issuesFromStorage.inProgressIssues.map(issue => {
                const sortIndex = issuesFromStorage.inProgressIssues
                  .indexOf(issue);

                return { ...issue, column: 'inProgressIssues', sortIndex };
              }) : [];

          if (issuesFromStorage) {
            dispatch(updateIssues({
              issues: newIssuesToSet,
              columnName: 'newIssues',
            }));

            dispatch(updateIssues({
              issues: inProgressIssuesToSet,
              columnName: 'inProgressIssues',
            }));

            dispatch(updateIssues({
              issues: closedIssuesToSet,
              columnName: 'closedIssues',
            }));

            dispatch(setLoading(false));
            dispatch(setErrorMessage(''));

            return;
          }

          dispatch(init(fullLink));
        } else {
          const example = 'https://github.com/organization/repository';
          const errorMessage = `Invalid link,
            please try again, here's example, how your link should look: ${example}`;

          dispatch(setLoading(false));
          dispatch(setErrorMessage(errorMessage));
        }
      });
  }
};

export default loadIssues;
