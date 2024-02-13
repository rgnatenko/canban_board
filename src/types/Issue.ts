export interface Issue {
  id: number;
  title: string;
  state: string;
  assignee: string | null;
}
