import type { Square } from './BoardSquare';

export interface Piece {
  id: string;
  img: string;
  square: Square;
}

const imgPath = (kind: string, color: 'white' | 'black') =>
  `/figures/${kind}_${color}.png`;

// Devuelve todas las piezas colocadas en su casilla inicial
export function createInitialPieces(): Piece[] {
  const pieces: Piece[] = [];

  // Organizar peones
  for (let c = 0; c < 8; c++) {
    pieces.push({ id: `wp${c}`, img: imgPath('pawn', 'white'), square: { col: c, row: 1 } });
    pieces.push({ id: `bp${c}`, img: imgPath('pawn', 'black'), square: { col: c, row: 6 } });
  }

  // Organizar el resto de piezas 
  const back = ['rook','knight','bishop','queen','king','bishop','knight','rook'];

  back.forEach((kind, c) => {
    pieces.push({ id: `w${kind[0]}${c}`, img: imgPath(kind, 'white'), square: { col: c, row: 0 } });
    pieces.push({ id: `b${kind[0]}${c}`, img: imgPath(kind, 'black'), square: { col: c, row: 7 } });
  });

  return pieces;
}
