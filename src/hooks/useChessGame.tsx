import { useState, useCallback } from "react";
import { createInitialPieces, type Piece } from '../components/Board/createInitialPieces';
import type { Square } from '../components/Board/BoardSquare';

interface Return {
  pieces: Piece[];
  move: (from: Square, to: Square) => void;
}

export default function useChessGame(): Return {
  const [pieces, setPieces] = useState<Piece[]>(createInitialPieces);

  const move = useCallback((from: Square, to: Square) => {
    setPieces(prev =>
      prev.map(p =>
        p.square.col === from.col && p.square.row === from.row
          ? { ...p, square: to }
          : p,
      ),
    );
  }, []);

  return { pieces, move };
}
