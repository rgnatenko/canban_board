import React from 'react';
import { Issue } from '../types/Issue';

type Props = {
  newIssues: Issue[],
  doneIssues: Issue[],
  closedIssues: Issue[],
};

export const CanbanTable: React.FC<Props> = ({
  newIssues,
  doneIssues,
  closedIssues,
}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Todo</th>
          <th>In Progress</th>
          <th>Done</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <ul>
              {newIssues.map(issue => (
                <li key={issue.id}>{issue.title}</li>
              ))}
            </ul>
          </td>
          <td>
            <ul>
              {doneIssues.map(issue => (
                <li key={issue.id}>{issue.title}</li>
              ))}
            </ul>
          </td>
          <td>
            <ul>
              {closedIssues.map(issue => (
                <li key={issue.id}>{issue.title}</li>
              ))}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
