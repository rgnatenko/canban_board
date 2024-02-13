import { Issue } from './Issue';

export interface IssuesState {
  newIssues: Issue[];
  doneIssues: Issue[];
  closedIssues: Issue[];
  loading: boolean,
  error: string,
}
