import React from 'react';
import { Col } from 'react-bootstrap';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Column, Issue } from '../../types/Issue';
import CanbanIssue from '../CanbanIssue/CanbanIssue';

type Props = {
  issues: Issue[]
  columnName: Column,
  title: string,
};

const CanbanIssuesList: React.FC<Props> = ({ issues, columnName, title }) => {
  return (
    <Col
      xl={4}
      className="mt-5"
    >
      <Col className="text-center mb-4"><h4>{title}</h4></Col>

      <Droppable droppableId={columnName}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            id="droppable-area"
            className="px-4 py-4 bg-secondary-subtle border border-dark"
          >
            {issues.map((issue, index) => (
              <Draggable
                key={`${issue.id}/${issue.sortIndex}`}
                draggableId={issue.id.toString()}
                index={index}
              >
                {(draggProvided) => (
                  <div
                    id="draggable-item"
                    ref={draggProvided.innerRef}
                    {...draggProvided.draggableProps}
                    {...draggProvided.dragHandleProps}
                  >
                    <CanbanIssue
                      issue={issue}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );
};

export default CanbanIssuesList;
