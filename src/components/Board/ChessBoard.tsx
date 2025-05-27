import type { FC, ReactNode } from 'react';
import BoardSquare, { type Square } from './BoardSquare';
import styles from './ChessBoard.module.css';
import { CreateInitialPieces } from './CreateInitialPieces';

const pieces = CreateInitialPieces();

const ChessBoard: FC = () => {
  const squares: ReactNode[] = [];

  /*  row 7 -> 0 para que (0,0) quede en la esquina inf-izda. */
  for (let row = 7; row >= 0; row--) {
    for (let col = 0; col < 8; col++) {
      const square: Square = { col, row };
      const color = (row + col) % 2 === 0 ? 'dark' : 'light';
      const piece = pieces.find(p => p.square.col === col && p.square.row === row);

      squares.push(
        <BoardSquare
          key={`${col}${row}`}
          square={square}
          color={color}
          pieceImg={piece?.img}
        />,
      );
    }
  }

  return <div className={styles.board}>{squares}</div>;
};

export default ChessBoard;
