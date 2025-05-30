import type { FC } from "react";
import type { Move } from '../../hooks/useChessGame';

interface Props { moves: Move[] }

const COLOR_EMO = { white: '⬜', black: '⬛' } as const;
const PIECE_EMO: Record<string,string> = {
  king:'♔', queen:'♕', rook:'♖', bishop:'♗', knight:'♘', pawn:'♙',
};

const MoveLogPanel: FC<Props> = ({ moves }) => (
  <section style={{
    width: '100%', height: '100%', overflowY: 'auto',
    background: '#1a1a1a', color: '#f0f0f0',
    border:'1px solid #555', borderRadius:'.5rem', padding:'.5rem',
    fontSize: '.85rem',
  }}>
    <h3 style={{ textAlign:'center', marginTop:'0.8rem', marginBottom:'0.8rem' }}>Move Log</h3>
    <ol style={{ paddingLeft:'1.2rem' }}>
      {moves.map(mv => (
        <li key={mv.no}>
          {COLOR_EMO[mv.color]}  ⮞  {PIECE_EMO[mv.piece]}  {mv.san}  {`${mv.from ? `${String.fromCharCode(97+mv.from.col)}${mv.from.row+1}` : ''}→${String.fromCharCode(97+mv.to.col)}${mv.to.row+1}`}
          {mv.captured && (
            <div style={{ marginLeft:'0.3rem' }}>
              ⮞ ❌{COLOR_EMO[mv.captured.color]} {PIECE_EMO[mv.captured.piece]} ❌
            </div>
          )}
        </li>
      ))}
    </ol>
  </section>
);

export default MoveLogPanel;