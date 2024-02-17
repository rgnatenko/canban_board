export type Column = 'newIssues' | 'inProgressIssues' | 'closedIssues';

export interface Issue {
  id: number;
  title: string;
  number: number,
  state: string;
  assignee: string | null;
  'updated_at': string,
  'closed_at': string | null,
  'comments': number

  user: { login: string }

  sortIndex: number,
  column: Column
}
