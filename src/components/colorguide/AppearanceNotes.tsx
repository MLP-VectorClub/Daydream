import classNames from 'classnames';
import { colorGuide } from 'src/strings';
import React, { useMemo } from 'react';
import { Appearance } from 'src/types';
import { processAppearanceNotes } from 'src/utils/html-parsers/appearance-notes-parser';

export interface AppearanceNotesProps {
  appearance: Appearance;
}

const AppearanceNotes: React.FC<AppearanceNotesProps> = ({ appearance }) => {
  const notes = useMemo(() => (appearance.notes ? processAppearanceNotes(appearance.notes) : null), [appearance.notes]);

  return (
    <div className="notes">
      {notes}
      {appearance.hasCutieMarks && (
        <span className={classNames({ 'ml-2 pl-2 border-left': appearance.notes })}>
          {colorGuide.appearances.cmAvailable}
        </span>
      )}
    </div>
  );
};

export default AppearanceNotes;
