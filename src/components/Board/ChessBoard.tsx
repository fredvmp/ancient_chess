import type { FC, ReactNode } from "react";
import BoardSquare, { type Square } from './BoardSquare';
import styles from './ChessBoard.module.css';
import useChessGame from '../../hooks/useChessGame';
import { useState } from "react";

const ChessBoard: FC = () => {
  const { pieces, move } = useChessGame();
  const [selected, setSelected] = useState<Square | null>(null);
  const squares: ReactNode[] = [];

  const handleClick = (sq: Square) => {
    if (selected) {
      // segundo clic -> intenta mover la pieza si se ha seleccionado una
      move(selected, sq); 
      setSelected(null);
    } else {
      // primer clic: selecciona solo si hay una pieza en la casilla
      const hasPiece = pieces.some(p => p.square.col === sq.col && p.square.row === sq.row);
      if (hasPiece) setSelected(sq);
    }
  };

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
