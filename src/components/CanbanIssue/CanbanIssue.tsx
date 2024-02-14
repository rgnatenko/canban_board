import React from 'react';
import { Card } from 'react-bootstrap';
import { Issue } from '../../types/Issue';

type Props = {
  issue: Issue
};

const CanbanIssue: React.FC<Props> = ({ issue }) => {
  return (
    <Card
      className="mb-2 py-2 px-3 rounded-4"
    >
      <h6>
        {issue.title}
      </h6>
    </Card>
  );
};

export default CanbanIssue;
