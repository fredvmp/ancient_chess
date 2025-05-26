import type { FC } from 'react';
import layoutStyles from './components/Layout/AppLayout.module.css';
import AppLayout from './components/Layout/AppLayout';
import BoardPlaceholder from './components/Board/BoardPlaceholder';
import CapturedPiecesPanel from './components/Panels/CapturedPiecesPanel';
import MoveLogPanel from './components/Panels/MoveLogPanel';

const App: FC = () => (
  <AppLayout>
    <aside className={layoutStyles.panel}>
      <CapturedPiecesPanel />
    </aside>

    <main style={{ display: 'flex', justifyContent: 'center' }}>
      <BoardPlaceholder />
    </main>

    <aside className={layoutStyles.panel}>
      <MoveLogPanel />
    </aside>
  </AppLayout>
);

export default App;
