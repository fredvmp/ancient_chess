import type { Square } from './BoardSquare';
import pawnWhite from '/figures/pawn_white.png';

export type Color = "white" | "black";
export type Kind = "pawn" | "rook" | "knight" | "bishop" | "queen" | "king";

export interface Piece {
    id: String;
    kind: Kind;
    color: Color;
    square: Square;
    img: string;
}

/* Devuelve todas las piezas colocadas en su casilla inicial */
export function CreateInitialPieces(): Piece[]{

    const pieces: Piece[] = [];

    /* Organizar peones */
    for (let col = 0; col < 8; col++) {
        pieces.push({
            id: `wp${col}`,
            kind: "pawn",
            color: "white",
            square: {col, row: 1},
            img: pawnWhite
        })

        pieces.push({
            id: `wp${col}`, 
            kind: "pawn",
            color: "black",
            square: {col, row: 6},
            img: '/figures/pawn_black.png'
        })
    }

    const backRank: Kind[] = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];

    backRank.forEach((kind, col) => {
    
        pieces.push({
            id: `w${kind[0]}${col}`,
            kind,
            color: "white",
            square: {col, row: 0},
            img: `/figures/${kind}_white.png`
        });

        pieces.push({
            id: `b${kind[0]}${col}`,
            kind,
            color: "black",
            square: {col, row: 7},
            img: `/figures/${kind}_black.png`
        });
    });

    return pieces;

}




