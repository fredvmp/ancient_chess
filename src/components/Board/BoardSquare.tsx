import type { FC } from "react";
import styles from "./ChessBoard.module.css";

export interface Square {
  col: number;
  row: number;
}

interface Props {
  square: Square;
  color: "light" | "dark";
  pieceImg?: string;
}

const BoardSquare: FC<Props> = ({ color, pieceImg }) => (
  <div className={`${styles.square} ${styles[color]}`}>
    {pieceImg && <img src={pieceImg} className={styles.piece} />}
  </div>
);

export default BoardSquare;
