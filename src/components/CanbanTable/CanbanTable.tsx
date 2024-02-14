import React from 'react';
import {
  Container,
  Row,
} from 'react-bootstrap';
import { Issue } from '../../types/Issue';
import CanbanIssuesList from '../CanbanIssuesList/CanbanIssuesList';

type Props = {
  newIssues: Issue[],
  inProgressIssues: Issue[],
  closedIssues: Issue[],
};

const CanbanTable: React.FC<Props> = ({
  newIssues,
  inProgressIssues,
  closedIssues,
}) => {
  return (
    <Container className="mx-auto mt-5">
      <Row>
        <CanbanIssuesList
          issues={newIssues}
          columnName="Todo"
        />
        <CanbanIssuesList
          issues={inProgressIssues}
          columnName="In Progress"
        />
        <CanbanIssuesList
          issues={closedIssues}
          columnName="Done"
        />
      </Row>
    </Container>
  );
};

export default CanbanTable;
