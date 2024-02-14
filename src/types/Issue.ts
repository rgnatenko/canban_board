export interface Issue {
  id: number;
  title: string;
  number: number,
  state: string;
  assignee: string | null;
  'updated_at': number,
  'closed_at': number,
  'coments': number

  user: { login: string }
}
