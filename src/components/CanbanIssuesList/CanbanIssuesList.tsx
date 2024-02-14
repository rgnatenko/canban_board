import React from 'react';
import { Col } from 'react-bootstrap';
import { Issue } from '../../types/Issue';
import CanbanIssue from '../CanbanIssue/CanbanIssue';

type Props = {
  issues: Issue[]
  columnName: string,
};

const CanbanIssuesList: React.FC<Props> = ({ issues, columnName }) => {
  return (
    <Col>
      <Col><h4 className="mb-2">{columnName}</h4></Col>
      {issues.map(
        issue => (
          <CanbanIssue
            key={issue.id}
            issue={issue}
          />
        ),
      )}
    </Col>
  );
};

export default CanbanIssuesList;
