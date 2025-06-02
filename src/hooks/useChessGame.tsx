import { useState, useCallback, useRef } from "react";
import { Chess, type Square as AlgSq, type PieceSymbol } from "chess.js";
import { createInitialPieces, type Piece, type Kind } from '../components/Board/createInitialPieces';
import type { Square } from '../components/Board/BoardSquare';

export interface Move {
  no: number;
  color: 'white' | 'black';
  piece: Kind;
  from: Square;
  to: Square;
  san: string;
  captured?: { piece: Kind; color: 'white' | 'black' };
}

interface Captured { white: Piece[]; black: Piece[] }

interface Return {
  pieces: Piece[];
  captured: Captured;
  moves: Move[];
  currentTurn: 'white' | 'black';
  move: (from: Square, to: Square) => void;
  legalMoves: (from: Square) => Square[];
}

const files = ['a','b','c','d','e','f','g','h'] as const;
const toAlg = ({ col, row }: Square): AlgSq => `${files[col]}${row + 1}` as AlgSq;
const fromAlg = (alg: AlgSq): Square => ({ col: files.indexOf(alg[0] as any), row: Number(alg[1]) - 1 });

export default function useChessGame(): Return {
  const [pieces, setPieces]   = useState<Piece[]>(createInitialPieces);
  const [captured, setCaptured] = useState<Captured>({ white: [], black: [] });
  const [moves, setMoves]     = useState<Move[]>([]);
  const [currentTurn, setCurrentTurn] = useState<'white' | 'black'>('white');

  const chessRef = useRef(new Chess());

  const move = useCallback((fromSq: Square, toSq: Square) => {
    const chess = chessRef.current;
    const fromAlg = toAlg(fromSq);
    const toAlgSq = toAlg(toSq);

    // Verificar movimiento en la libreria
    const result = chess.move({ from: fromAlg, to: toAlgSq, promotion:'q' }, { sloppy:true });

    if (!result) return;

    setPieces(prev => {
      const withoutCaptured = result.captured
        ? prev.filter(p => !(p.square.col === toSq.col && p.square.row === toSq.row))
        : prev;

      return withoutCaptured.map(p =>
        p.square.col === fromSq.col && p.square.row === fromSq.row
          ? { ...p, square: toSq, kind: result.piece as Kind }
          : p,
      );
    });

    // Registrar eliminaciones
    if (result.captured) {
      const victimColor = currentTurn === 'white' ? 'black' : 'white';
      const victimKind  = constMap[result.captured as PieceSymbol];
      setCaptured(prev => ({
        ...prev,
        [currentTurn]: [...prev[currentTurn], { id: `cap${Date.now()}`, color: victimColor, kind: victimKind, img: `/figures/${victimKind}_${victimColor}.png`, square: { col: -1, row: -1 } }],
      }));
    }

    setMoves(prev => [...prev, {
      no: prev.length + 1,
      color: currentTurn,
      piece: constMap[result.piece],
      from: fromSq,
      to: toSq,
      san: result.san,
      captured: result.captured ? { piece: constMap[result.captured], color: currentTurn === 'white' ? 'black' : 'white' } : undefined,
    }]);

    // Cambiar turno
    setCurrentTurn(t => (t === 'white' ? 'black' : 'white'));
  }, [currentTurn]);

  const legalMoves = useCallback((from: Square): Square[] => {
    const chess = chessRef.current;
    const movesVerbose = chess.moves({ square: toAlg(from), verbose: true });
    return movesVerbose.map(m => fromAlg(m.to as AlgSq));
  }, []);

  return { pieces, captured, moves, currentTurn, move, legalMoves };
}

// Transformarr los simbolos de chess.js a kind
const constMap: Record<PieceSymbol, Kind> = {
  k:'king', q:'queen', r:'rook', b:'bishop', n:'knight', p:'pawn',
};
