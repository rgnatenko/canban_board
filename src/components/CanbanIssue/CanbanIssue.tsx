import React, { CSSProperties } from 'react';
import { Card } from 'react-bootstrap';
import { Issue } from '../../types/Issue';
import getIssueStatus from '../../utils/helpers/getTimeOfOpened';

type Props = {
  issue: Issue
  style: CSSProperties
};

const CanbanIssue: React.FC<Props> = ({ issue, style }) => {
  const openedAt = issue.closed_at
    ? getIssueStatus(issue.closed_at, 'closed')
    : getIssueStatus(issue.updated_at, 'opened');

  return (
    <Card
      className="mb-3 py-3 px-3 rounded-5
      border border-dark d-flex flex-column gap-1"
      style={style}
    >
      <h6>
        {issue.title}
      </h6>

      <p
        className="text-secondary"
      >
        {`#${issue.number} ${openedAt}`}
      </p>

      <p
        className="text-secondary"
      >
        {`${issue.user.login} | Comments: ${issue.comments}`}
      </p>
    </Card>
  );
};

export default CanbanIssue;
