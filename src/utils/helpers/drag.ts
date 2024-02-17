import { DraggableLocation } from 'react-beautiful-dnd';
import { Column, Issue } from '../../types/Issue';
import getColumnIssues from './getColumnIssues';

type Params = {
  source: DraggableLocation,
  destination: DraggableLocation | null | undefined,
  issues: {
    newIssues: Issue[];
    inProgressIssues: Issue[];
    closedIssues: Issue[];
  },
  updateColumnIssues: (column: Column, updatedIssues: Issue[]) => void
};

type HandleDragEnd = (arg: Params) => void;

const drag: HandleDragEnd
  = ({
    source,
    destination,
    issues,
    updateColumnIssues,
  }) => {
    const { newIssues, inProgressIssues, closedIssues } = issues;

    const getIssues = (column: Column) => getColumnIssues(column, {
      newIssues,
      inProgressIssues,
      closedIssues,
    });

    if (!destination) {
      return;
    }

    const sourceId = source.droppableId as Column;
    const destinationId = destination.droppableId as Column;

    const sourceIssues = getIssues(sourceId);
    const destIssues = getIssues(destinationId);

    const movedIssue = sourceIssues[source.index];

    const reorderedIssues = [...sourceIssues];
    const updatedDestIssues = [...destIssues];

    if (source.droppableId === destination.droppableId) {
      reorderedIssues.splice(source.index, 1);
      reorderedIssues.splice(destination.index, 0, movedIssue);

      updateColumnIssues(sourceId, reorderedIssues);
    } else {
      reorderedIssues.splice(source.index, 1);
      updateColumnIssues(sourceId, reorderedIssues);

      updatedDestIssues.splice(destination.index, 0, movedIssue);
      updateColumnIssues(destinationId, updatedDestIssues);
    }
  };

export default drag;
