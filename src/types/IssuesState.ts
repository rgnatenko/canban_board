import { Issue } from './Issue';

export interface IssuesState {
  newIssues: Issue[];
  inProgressIssues: Issue[];
  closedIssues: Issue[];
  loading: boolean,
  error: string,
}
