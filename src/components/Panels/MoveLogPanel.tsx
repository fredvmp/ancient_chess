import type { FC } from "react";
import type { Move } from "../../hooks/useChessGame";

interface Props {
  moves: Move[];
  currentTurn: "white" | "black";
}

const COLOR_EMO = { white: "⬜", black: "⬛" } as const;
const PIECE_EMO: Record<string, string> = {
  king: "♔",
  queen: "♕",
  rook: "♖",
  bishop: "♗",
  knight: "♘",
  pawn: "♙",
};

const TurnIndicator: FC<{ turn: 'white' | 'black' }> = ({ turn }) => (
  <div style={{
    border: '3px solid rgb(218, 218, 218)', borderRadius: '.8rem',
    padding: '.25rem .5rem', marginBottom: '.5rem',
    textAlign:'center', fontSize:'.9rem',
    background: 'rgba(255, 255, 255, 0.2)',
  }}>
    Current turn: {COLOR_EMO[turn]}
  </div>
);

const MoveLogPanel: FC<Props> = ({ moves, currentTurn }) => (
  <section
    style={{
      width: "100%",
      height: "100%",
      overflowY: "auto",
      background: "#1a1a1a",
      color: "#f0f0f0",
      border: "3px solid rgba(0, 0, 0, 0.42)",
      borderRadius: ".5rem",
      padding: ".5rem",
      fontSize: ".85rem",
    }}
  >
    <h3
      style={{
        textAlign: "center",
        marginTop: "0.8rem",
        marginBottom: "0.8rem",
      }}
    >
      Move Log
    </h3>
    <TurnIndicator turn={currentTurn} />
    <ol 
      className="hide-scrollbar" 
      style={{
        paddingLeft:'1.2rem',
        overflowY:'auto',
        flex:1,
      }}
      >
      {moves.map((mv) => (
        <li key={mv.no}>
          {COLOR_EMO[mv.color]} ⮞ {PIECE_EMO[mv.piece]}{" "}
          {`${
            mv.from
              ? `${String.fromCharCode(97 + mv.from.col)}${mv.from.row + 1}`
              : ""
          }→${String.fromCharCode(97 + mv.to.col)}${mv.to.row + 1}`}
          {mv.captured && (
            <div style={{ marginLeft: "0.3rem" }}>
              ⮞ ❌{COLOR_EMO[mv.captured.color]} {PIECE_EMO[mv.captured.piece]}{" "}
              ❌
            </div>
          )}
        </li>
      ))}
    </ol>
  </section>
);

export default MoveLogPanel;
