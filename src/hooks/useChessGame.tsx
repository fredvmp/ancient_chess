import { useState, useCallback, useRef } from "react";
import { Chess, type Square as AlgSq, type PieceSymbol } from "chess.js";
import {
  createInitialPieces,
  type Piece,
  type Kind,
} from "../components/Board/createInitialPieces";
import type { Square } from "../components/Board/BoardSquare";

export interface Move {
  no: number;
  color: "white" | "black";
  piece: Kind;
  from: Square;
  to: Square;
  san: string;
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
  legalMoves: (from: Square) => Square[];
  gameOver: { ended: boolean; winner: "white" | "black" | null };
  resetGame: () => void;
}

const files = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const toAlg = ({ col, row }: Square): AlgSq =>
  `${files[col]}${row + 1}` as AlgSq;
const fromAlg = (alg: AlgSq): Square => ({
  col: files.indexOf(alg[0] as any),
  row: Number(alg[1]) - 1,
});
const mapKind: Record<PieceSymbol, Kind> = {
  k: "king",
  q: "queen",
  r: "rook",
  b: "bishop",
  n: "knight",
  p: "pawn",
};

export default function useChessGame(): Return {
  const [pieces, setPieces] = useState<Piece[]>(createInitialPieces);
  const [captured, setCaptured] = useState<Captured>({ white: [], black: [] });
  const [moves, setMoves] = useState<Move[]>([]);
  const [currentTurn, setCurrentTurn] = useState<"white" | "black">("white");
  const [gameOver, setGameOver] = useState<{
    ended: boolean;
    winner: null | "white" | "black";
  }>({ ended: false, winner: null });

  const chessRef = useRef(new Chess());

  const resetGame = useCallback(() => {
    chessRef.current.reset();
    setPieces(createInitialPieces());
    setCaptured({ white: [], black: [] });
    setMoves([]);
    setCurrentTurn("white");
    setGameOver({ ended: false, winner: null });
  }, []);

  const legalMoves = useCallback(
    (from: Square): Square[] => {
      if (gameOver.ended) return [];
      const list = chessRef.current.moves({
        square: toAlg(from),
        verbose: true,
      }) as any[];
      return list.map((m) => fromAlg(m.to as AlgSq));
    },
    [gameOver]
  );

  const move = useCallback(
    (fromSq: Square, toSq: Square) => {
      if (gameOver.ended) return;

      const chess = chessRef.current;
      // const fromAlg = toAlg(fromSq);
      // const toAlgSq = toAlg(toSq);

      // Verificar movimiento en la libreria
      const result = chessRef.current.move(
        { from: toAlg(fromSq), to: toAlg(toSq), promotion: "q" },
        { sloppy: true }
      ) as any | null;

      if (!result) return;

      const mover = pieces.find(
        (p) => p.square.col === fromSq.col && p.square.row === fromSq.row
      )!;
      const capturedPiece = result.captured
        ? pieces.find(
            (p) => p.square.col === toSq.col && p.square.row === toSq.row
          )
        : undefined;

      setPieces((prev) => {
        let next = capturedPiece
          ? prev.filter((p) => p.id !== capturedPiece.id)
          : prev;
        return next.map((p) =>
          p.id === mover.id
            ? { ...p, square: toSq, kind: mapKind[result.piece as PieceSymbol] }
            : p
        );
      });

      if (capturedPiece) {
        setCaptured((prev) => ({
          ...prev,
          [mover.color]: [...prev[mover.color], capturedPiece],
        }));
      }

      // Registrar eliminaciones
      if (result.captured) {
        const victimColor = currentTurn === "white" ? "black" : "white";
        const victimKind = constMap[result.captured as PieceSymbol];
        setCaptured((prev) => ({
          ...prev,
          [currentTurn]: [
            ...prev[currentTurn],
            {
              id: `cap${Date.now()}`,
              color: victimColor,
              kind: victimKind,
              img: `/figures/${victimKind}_${victimColor}.png`,
              square: { col: -1, row: -1 },
            },
          ],
        }));
      }

      setMoves((prev) => [
        ...prev,
        {
          no: prev.length + 1,
          color: mover.color,
          piece: mover.kind,
          from: fromSq,
          to: toSq,
          san: result.san,
          captured: capturedPiece
            ? { piece: capturedPiece.kind, color: capturedPiece.color }
            : undefined,
        },
      ]);

      // Saber si hay Jaque Mate
      const isMate =
        // chess.js v2 (ESM)
        (typeof (chess as any).isCheckmate === "function" &&
          (chess as any).isCheckmate()) ||
        // chess.js v1 (CommonJS)
        (typeof (chess as any).in_checkmate === "function" &&
          (chess as any).in_checkmate());

      // Finalizar partida o cambiar turno
      if (isMate) {
        setGameOver({ ended: true, winner: mover.color });
        return;
      } else if (capturedPiece?.kind === "king") {
        setGameOver({ ended: true, winner: mover.color });
      } else {
        setCurrentTurn((t) => (t === "white" ? "black" : "white"));
      }
    },
    [pieces, gameOver]
  );

  return {
    pieces,
    captured,
    moves,
    currentTurn,
    gameOver,
    move,
    legalMoves,
    resetGame,
  };
}

// Transformarr los simbolos de chess.js a kind
const constMap: Record<PieceSymbol, Kind> = {
  k: "king",
  q: "queen",
  r: "rook",
  b: "bishop",
  n: "knight",
  p: "pawn",
};
