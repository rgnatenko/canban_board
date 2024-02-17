import { IssuesState } from './IssuesState';

type Issues = Omit<IssuesState, 'loading' | 'error' | 'repoLink'>;

export default Issues;
