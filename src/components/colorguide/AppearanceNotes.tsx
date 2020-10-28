import classNames from 'classnames';
import { colorGuide } from 'src/strings';
import React, { useMemo } from 'react';
import { Appearance } from 'src/types';
import { processAppearanceNotes } from 'src/utils/html-parsers/appearance-notes-parser';
import styles from 'modules/AppearanceNotes.module.scss';

export interface AppearanceNotesProps {
  appearance: Appearance;
}

const AppearanceNotes: React.FC<AppearanceNotesProps> = ({ appearance }) => {
  const notes = useMemo(() => (appearance.notes ? processAppearanceNotes(appearance.notes) : null), [appearance.notes]);

  return (
    <div className={styles.appearanceNotes}>
      {notes}
      {appearance.hasCutieMarks && (
        <span className={classNames({ 'ml-2 pl-2 border-left': notes !== null })}>
          {colorGuide.appearances.cmAvailable}
        </span>
      )}
    </div>
  );
};

export default AppearanceNotes;
