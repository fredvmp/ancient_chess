import type { FC, ReactNode } from 'react';
import styles from './AppLayout.module.css';

interface Props {
  children?: ReactNode;
}

const AppLayout: FC<Props> = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
);

export default AppLayout;
