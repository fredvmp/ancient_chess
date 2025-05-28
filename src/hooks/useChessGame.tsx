import { useState, useCallback } from "react";
import { createInitialPieces, type Piece } from '../components/Board/createInitialPieces';
import type { Square } from '../components/Board/BoardSquare';

interface Return {
  pieces: Piece[];
  currentTurn: "white" | "black";
  move: (from: Square, to: Square) => void;
}

export default function useChessGame(): Return {
  const [pieces, setPieces] = useState<Piece[]>(createInitialPieces);
  const [currentTurn, setCurrentTurn] = useState<'white' | 'black'>('white');

  const move = useCallback((from: Square, to: Square) => {
    const mover = pieces.find(p => p.square.col === from.col && p.square.row === from.row);
    if (!mover) return;                       // Cuando no hay pieza en la celda de origen
    if (mover.color !== currentTurn) return;  // Turno incorrecto

    const occupant = pieces.find(p => p.square.col === to.col && p.square.row === to.row);
    if (occupant && occupant.color === mover.color) return; // Casilla ocupada por un aliado

    setPieces(prev =>
      prev.map(p =>
        p.id === mover.id ? { ...p, square: to } : p,
      ),
    );

    // Cambiar turno
    setCurrentTurn(t => (t === 'white' ? 'black' : 'white'));
  }, [pieces, currentTurn]);

  return { pieces, currentTurn, move };
}
