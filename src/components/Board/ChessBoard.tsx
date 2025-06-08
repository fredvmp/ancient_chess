import type { FC, ReactNode } from "react";
import { useState, useCallback, useMemo } from "react";
import BoardSquare, { type Square } from "./BoardSquare";
import styles from "./ChessBoard.module.css";
import type { Piece } from "./createInitialPieces";

interface Props {
  pieces: Piece[];
  currentTurn: "white" | "black";
  move: (from: Square, to: Square) => void;
  legalMoves: (from: Square) => Square[];
  gameOver: { ended: boolean };
}

const ChessBoard: FC<Props> = ({
  pieces,
  currentTurn,
  move,
  legalMoves,
  gameOver,
}) => {
  const [selected, setSelected] = useState<Square | null>(null);
  const squares: ReactNode[] = [];
  const legalSqList = useMemo(
    () => (selected ? legalMoves(selected) : []),
    [selected, legalMoves]
  );

  const handleClick = useCallback(
    (sq: Square) => {
      // Fin de partida
      if (gameOver.ended) return;

      const clickedPiece = pieces.find(
        (p) => p.square.col === sq.col && p.square.row === sq.row
      );

      if (selected) {
        // Cancelar selección
        if (selected.col === sq.col && selected.row === sq.row) {
          setSelected(null);
          return;
        }
        // Cambiar a otra pieza del mismo color
        if (clickedPiece && clickedPiece.color === currentTurn) {
          setSelected(sq);
          return;
        }
        // Intentar mover
        move(selected, sq);
        setSelected(null);
      } else {
        if (clickedPiece && clickedPiece.color === currentTurn) {
          setSelected(sq);
        }
      }
    },
    [selected, pieces, currentTurn, move, gameOver]
  );

  // row 7 -> 0 para que (0,0) quede en la esquina inf-izda.
  for (let row = 7; row >= 0; row--) {
    for (let col = 0; col < 8; col++) {
      const sq: Square = { col, row };
      const color = (row + col) % 2 === 0 ? "dark" : "light";
      const piece = pieces.find(
        (p) => p.square.col === col && p.square.row === row
      );

      squares.push(
        <BoardSquare
          key={`${col}${row}`}
          square={sq}
          color={color}
          pieceImg={piece?.img}
          selected={selected?.col === col && selected?.row === row}
          isLegal={legalSqList.some((s) => s.col === col && s.row === row)}
          onClick={handleClick}
        />
      );
    }
  }

  /* 
  return <div className={styles.board}>{squares}</div>;
  */

  return (
    <div className={styles["board-wrap"]}>
      <div className={styles.board}>{squares}</div>
    </div>
  );
};

export default ChessBoard;
