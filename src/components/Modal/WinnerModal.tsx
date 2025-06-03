import type { FC } from "react";

/* Emojis de color para que coincida con el Move-Log */
const COLOR_EMO = { white: "⬜", black: "⬛" } as const;

interface Props {
  winner: "white" | "black";
  onReset: () => void;
}

const WinnerModal: FC<Props> = ({ winner, onReset }) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2000,
    }}
  >
    <div
      style={{
        background: "rgba(30,30,30,0.85)",
        color: "#fff",
        padding: "2rem 3rem",
        borderRadius: ".8rem",
        textAlign: "center",
        backdropFilter: "blur(6px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        minWidth: "240px",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Game Over</h2>

      <p style={{ fontSize: "1.25rem", margin: "1.2rem 0 2rem" }}>
        Winner: {COLOR_EMO[winner]}
      </p>

      <button
        onClick={onReset}
        style={{
          padding: ".5rem 1.5rem",
          fontSize: "1rem",
          borderRadius: ".5rem",
          border: "none",
          cursor: "pointer",
          background: "#4caf50",
          color: "#fff",
        }}
      >
        Play again
      </button>
    </div>
  </div>
);

export default WinnerModal;
