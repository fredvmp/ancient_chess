import type { FC } from "react";
import type { Piece } from '../Board/createInitialPieces';

interface Props {
  whitePieces: Piece[];
  blackPieces: Piece[];
}

const columnStyle = {
  flex: 1,
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '12px',
  justifyItems: 'center' as const,
};

const CapturedPiecesPanel: FC<Props> = ({ whitePieces, blackPieces }) => (
  <section style={{
    display: 'flex',
    gap: '16px',
    width: '100%',
    justifyContent: 'center',
  }}>

    {/* Columna piezas negras */}
    <div style={columnStyle}>
      <h1 style={{ gridColumn: '1 / -1', margin: 0, textAlign: 'center' }}>
        Black
      </h1>
      {whitePieces.length === 0
        ? <span style={{ gridColumn: '1 / -1' }}>—</span>
        : whitePieces.map(p => (
            <img key={p.id} src={p.img} alt="" style={{ height: '50px' }} />
          ))}
    </div>

    {/* Separador */}
    <div style={{ width: '2px', background: 'rgba(30, 30, 30)' }} />

    {/* Columna piezas blancas */}
    <div style={columnStyle}>
      <h1 style={{ gridColumn: '1 / -1', margin: 0, textAlign: 'center' }}>
        White
      </h1>
      {blackPieces.length === 0
        ? <span style={{ gridColumn: '1 / -1' }}>—</span>
        : blackPieces.map(p => (
            <img key={p.id} src={p.img} alt="" style={{ height: '50px' }} />
          ))}
    </div>
  </section>
);

export default CapturedPiecesPanel;
