import { FC, PropsWithChildren } from 'react';
import styles from 'modules/AppearanceNotesText.module.scss';

export const AppearanceNotesText: FC<PropsWithChildren> = ({ children }) => <span className={styles.notesText}>{children}</span>;
