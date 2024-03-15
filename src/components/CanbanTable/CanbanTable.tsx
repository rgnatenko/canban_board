import React, { useEffect, useMemo } from 'react';
import { Container, Row } from 'react-bootstrap';
import {
  DragDropContext,
  DropResult,
} from 'react-beautiful-dnd';
import { Column, Issue } from '../../types/Issue';
import {
  useAppDispatch,
} from '../../redux/reduxHooks/reduxHooks';
import drag from '../../utils/helpers/drag';
import CanbanIssuesList from '../CanbanIssuesList/CanbanIssuesList';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import normalizeUrl from '../../utils/helpers/normalizeUrl';
import { updateIssues } from '../../redux/features/issuesSlice';
import { useIssues } from '../../redux/selectors';

const CanbanTable: React.FC = () => {
  const {
    newIssues,
    inProgressIssues,
    closedIssues,
    repoLink,
  }
    = useIssues();
  const dispatch = useAppDispatch();

  const issues = useMemo(() => ({
    newIssues,
    inProgressIssues,
    closedIssues,
  }), [closedIssues, inProgressIssues, newIssues]);

  useEffect(() => {
    const issuesToSet = JSON.stringify(issues);

    localStorage.setItem(repoLink, issuesToSet);
  }, [issues, repoLink]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    const updateColumnIssues = (column: Column, updatedIssues: Issue[]) => {
      dispatch(updateIssues({ issues: updatedIssues, columnName: column }));
    };

    drag({
      source,
      destination,
      issues,
      updateColumnIssues,
    });
  };

  const link = normalizeUrl(repoLink);

  return (
    <Container
      className="mx-auto mt-3"
      id="issues"
    >
      {link && (
        <BreadCrumbs
          orgLink={link.organizationLink}
          repoLink={link.repositoryLink}
        />
      )}
      <Row>
        <DragDropContext onDragEnd={handleDragEnd}>
          <CanbanIssuesList
            title="Todo"
            columnName="newIssues"
            issues={newIssues}
          />

          <CanbanIssuesList
            title="In Progress"
            columnName="inProgressIssues"
            issues={inProgressIssues}
          />

          <CanbanIssuesList
            title="Closed"
            columnName="closedIssues"
            issues={closedIssues}
          />
        </DragDropContext>
      </Row>
    </Container>
  );
};

export default CanbanTable;
