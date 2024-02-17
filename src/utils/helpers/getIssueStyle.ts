import { CSSProperties } from 'react';

const getItemStyle
: (isDragging: boolean) => CSSProperties
  = (isDragging) => ({
    background: isDragging ? '#FAFBFC' : 'white',
    border: isDragging ? '1px solid blue' : '1px solid #E2E6E9',
  });

export default getItemStyle;
