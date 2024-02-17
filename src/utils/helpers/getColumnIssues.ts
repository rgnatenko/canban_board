import { Column } from '../../types/Issue';
import Issues from '../../types/Issues';

const getColumnIssues = (column: Column, {
  newIssues,
  inProgressIssues,
  closedIssues,
}: Issues) => {
  switch (column) {
    case 'newIssues':
      return newIssues;

    case 'inProgressIssues':
      return inProgressIssues;

    case 'closedIssues':
      return closedIssues;

    default:
      return [];
  }
};

export default getColumnIssues;
