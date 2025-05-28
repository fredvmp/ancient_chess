import type { FC } from "react";
import layoutStyles from "./components/Layout/AppLayout.module.css";
import AppLayout from "./components/Layout/AppLayout";
import CapturedPiecesPanel from "./components/Panels/CapturedPiecesPanel";
import MoveLogPanel from "./components/Panels/MoveLogPanel";
import ChessBoard from "./components/Board/ChessBoard";

const App: FC = () => (
    
    <AppLayout>
       
      <aside className={layoutStyles.panel}>
        <CapturedPiecesPanel />
      </aside>

      <main style={{ display: "flex", justifyContent: "center" }}>
        <ChessBoard />
      </main> 

      <aside className={layoutStyles.panel}>
        <MoveLogPanel />
      </aside>
      
    </AppLayout>

);

export default App;
