import type { FC } from "react";
import layoutStyles from "./components/Layout/AppLayout.module.css";
import AppLayout from "./components/Layout/AppLayout";
import CapturedPiecesPanel from "./components/Panels/CapturedPiecesPanel";
import MoveLogPanel from "./components/Panels/MoveLogPanel";
import ChessBoard from "./components/Board/ChessBoard";
import useChessGame from "./hooks/useChessGame";

const App: FC = () => {
  const game = useChessGame();

  return (
    <AppLayout>
      {/* Panel izquierdo -> piezas eliminadas */}
      <aside className={layoutStyles.panel}>
        <CapturedPiecesPanel
          whitePieces={game.captured.white}
          blackPieces={game.captured.black}
        />
      </aside>

      {/* Centro -> tablero */}
      <main style={{ display: "flex", justifyContent: "center" }}>
        <ChessBoard
          pieces={game.pieces}
          currentTurn={game.currentTurn}
          move={game.move}
        />
      </main>

      {/* Panel derecho -> Registro de movimientos */}
      <aside className={layoutStyles.panel}>
        <MoveLogPanel moves={game.moves} />
      </aside>
    </AppLayout>
  );
};

export default App;
