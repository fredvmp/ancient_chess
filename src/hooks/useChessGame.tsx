import { useState, useCallback } from "react";
import {
  createInitialPieces,
  type Piece,
} from "../components/Board/createInitialPieces";
import type { Square } from "../components/Board/BoardSquare";

interface Captured {
  white: Piece[];
  black: Piece[];
}

interface Return {
  pieces: Piece[];
  captured: Captured;
  currentTurn: "white" | "black";
  move: (from: Square, to: Square) => void;
}

export default function useChessGame(): Return {
  const [pieces, setPieces] = useState<Piece[]>(createInitialPieces);
  const [captured, setCaptured] = useState<Captured>({ white: [], black: [] });
  const [currentTurn, setCurrentTurn] = useState<"white" | "black">("white");

  const move = useCallback(
    (from: Square, to: Square) => {
      const mover = pieces.find(
        (p) => p.square.col === from.col && p.square.row === from.row
      );
      if (!mover || mover.color !== currentTurn) return;

      const occupant = pieces.find(
        (p) => p.square.col === to.col && p.square.row === to.row
      );
      if (occupant && occupant.color === mover.color) return;

      // Captura la pieza si hay una del equipo contrario
      if (occupant && occupant.color !== mover.color) {
        setCaptured((prev) => ({
          ...prev,
          [mover.color]: [...prev[mover.color], occupant],
        }));
        setPieces((prev) => prev.filter((p) => p.id !== occupant.id));
      }

      // Mover pieza
      setPieces((prev) =>
        prev.map((p) => (p.id === mover.id ? { ...p, square: to } : p))
      );

      // Cambiar turno
      setCurrentTurn((t) => (t === "white" ? "black" : "white"));
    },
    [pieces, currentTurn]
  );

  return { pieces, captured, currentTurn, move };
}
