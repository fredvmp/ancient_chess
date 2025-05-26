import type { FC } from 'react';
import styles from './ChessBoard.module.css';

export interface Square { col: number; row: number }

interface Props {
  square: Square;
  color: 'light' | 'dark';
}

const BoardSquare: FC<Props> = ({ color }) => (
  <div className={`${styles.square} ${styles[color]}`}></div>
);

export default BoardSquare;
