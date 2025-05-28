import type { FC, ReactNode } from "react";
import { useState, useCallback } from "react";
import BoardSquare, { type Square } from './BoardSquare';
import styles from './ChessBoard.module.css';
import type { Piece } from './createInitialPieces';

interface Props {
  pieces: Piece[];
  currentTurn: 'white' | 'black';
  move: (from: Square, to: Square) => void;
}

const ChessBoard: FC<Props> = ({ pieces, currentTurn, move }) => {
  const [selected, setSelected] = useState<Square | null>(null);
  const squares: ReactNode[] = [];

  const handleClick = useCallback((sq: Square) => {

    // segundo clic -> intenta mover la pieza si se ha seleccionado una
    if (selected) {
      move(selected, sq);
      setSelected(null);
    } else {
      // primer clic -> selecciona solo si hay una pieza en la casilla
      const piece = pieces.find(p => p.square.col === sq.col && p.square.row === sq.row);
      if (piece && piece.color === currentTurn) setSelected(sq);  // selecciona solo pieza del turno

    }
  }, [selected, pieces, currentTurn, move]);

  // row 7 -> 0 para que (0,0) quede en la esquina inf-izda. 
  for (let row = 7; row >= 0; row--) {
    for (let col = 0; col < 8; col++) {
      const sq: Square = { col, row };
      const color = (row + col) % 2 === 0 ? 'dark' : 'light';
      const piece = pieces.find(p => p.square.col === col && p.square.row === row);

      squares.push(
        <BoardSquare
          key={`${col}${row}`}
          square={sq}
          color={color}
          pieceImg={piece?.img}
          selected={selected?.col === col && selected?.row === row}
          onClick={handleClick}
        />,
      );
    }
  }

  return <div className={styles.board}>{squares}</div>;
};

export default ChessBoard;
