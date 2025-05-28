import type { FC } from "react";
import styles from './ChessBoard.module.css';

export interface Square { col: number; row: number }

interface Props {
  square: Square;
  color: 'light' | 'dark';
  pieceImg?: string;
  selected: boolean;
  onClick: (sq: Square) => void;
}

const BoardSquare: FC<Props> = ({ square, color, pieceImg, selected, onClick }) => (
  <div
    className={`${styles.square} ${styles[color]} ${selected ? styles.selected : ''}`}
    onClick={() => onClick(square)}
  >
    {pieceImg && <img src={pieceImg} className={styles.piece} alt="" />}
  </div>
);

export default BoardSquare;
