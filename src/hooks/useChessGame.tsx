import { useState, useCallback } from "react";
import { createInitialPieces } from "../components/Board/createInitialPieces";
import type { Square } from "../components/Board/BoardSquare";
import type { Piece, Kind } from "../components/Board/createInitialPieces";

export interface Move {
  no: number;
  color: "white" | "black";
  piece: Kind;
  from: Square;
  to: Square;
  captured?: { piece: Kind; color: "white" | "black" };
}

interface Captured {
  white: Piece[];
  black: Piece[];
}

interface Return {
  pieces: Piece[];
  captured: Captured;
  moves: Move[];
  currentTurn: "white" | "black";
  move: (from: Square, to: Square) => void;
}

export default function useChessGame(): Return {
  const [pieces, setPieces] = useState<Piece[]>(createInitialPieces);
  const [captured, setCaptured] = useState<Captured>({ white: [], black: [] });
  const [moves, setMoves] = useState<Move[]>([]);
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
      if (occupant && occupant.color === mover.color) return; // aliado bloquea

      // Captura la pieza si hay una del equipo contrario
      let capturedPiece: Piece | undefined;
      if (occupant && occupant.color !== mover.color) {
        capturedPiece = occupant;
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

      // Registrar movimiento
      setMoves((prev) => [
        ...prev,
        {
          no: prev.length + 1,
          color: mover.color,
          piece: mover.kind,
          from,
          to,
          captured: capturedPiece
            ? { piece: capturedPiece.kind, color: capturedPiece.color }
            : undefined,
        },
      ]);

      // Cambiar turno
      setCurrentTurn((t) => (t === "white" ? "black" : "white"));
    },
    [pieces, currentTurn]
  );

  return { pieces, captured, moves, currentTurn, move };
}
