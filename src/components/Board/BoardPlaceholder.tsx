import type { FC } from 'react';

const BoardPlaceholder: FC = () => (
  <div
    style={{ // provisional
      width: '80vmin',
      maxWidth: '800px',
      minWidth: '320px', 
      aspectRatio: '1 / 1',
      background: '#f5f5f5',
      borderRadius: '.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1.2rem',
      color: '#666',
    }}
  >
    Chessboard 
  </div>
);

export default BoardPlaceholder;
