/* eslint-disable no-console */
import React from 'react';
import { Col } from 'react-bootstrap';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Column, Issue } from '../../types/Issue';
import CanbanIssue from '../CanbanIssue/CanbanIssue';
import getItemStyle from '../../utils/helpers/getIssueStyle';

type Props = {
  issues: Issue[]
  columnName: Column,
  title: string,
};

const CanbanIssuesList: React.FC<Props> = ({ issues, columnName, title }) => {
  return (
    <div style={{ width: '33%' }}>
      <Droppable droppableId={columnName}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Col><h4>{title}</h4></Col>

            {issues.map((issue, index) => (
              <Draggable
                key={`${issue.id}/${issue.sortIndex}`}
                draggableId={issue.id.toString()}
                index={index}
              >
                {(draggProvided, snapshot) => (
                  <div
                    ref={draggProvided.innerRef}
                    {...draggProvided.draggableProps}
                    {...draggProvided.dragHandleProps}
                  >
                    <CanbanIssue
                      issue={issue}
                      style={getItemStyle(snapshot.isDragging)}
                    />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default CanbanIssuesList;
