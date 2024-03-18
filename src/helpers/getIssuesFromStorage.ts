import { Column, Issue } from '../types/Issue';
import Issues from '../types/Issues';
import parseDataFromStorage from './parseDataFromStorage';

const getIssuesFromStorage = (repoLink: string) => {
  const issuesFromStorage
    = parseDataFromStorage<Issues, boolean>(repoLink, false);

  const mapIssues = (issues: Issue[], column: Column): Issue[] => {
    return issues ? issues.map((issue, index) => ({
      ...issue,
      column,
      sortIndex: index,
    })) : [];
  };

  const newIssuesToSet = mapIssues(issuesFromStorage.newIssues, 'newIssues');
  const closedIssuesToSet = mapIssues(
    issuesFromStorage.closedIssues,
    'closedIssues',
  );
  const inProgressIssuesToSet = mapIssues(
    issuesFromStorage.inProgressIssues,
    'inProgressIssues',
  );

  return {
    issuesFromStorage,
    newIssuesToSet,
    closedIssuesToSet,
    inProgressIssuesToSet,
  };
};

export default getIssuesFromStorage;
