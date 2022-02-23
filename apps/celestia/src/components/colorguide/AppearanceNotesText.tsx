import { FC } from 'react';
import styles from 'modules/AppearanceNotesText.module.scss';

export const AppearanceNotesText: FC = ({ children }) => <span className={styles.notesText}>{children}</span>;
