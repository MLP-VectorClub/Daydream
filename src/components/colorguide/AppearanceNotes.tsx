import classNames from 'classnames';
import { colorGuide } from 'src/strings';
import { useMemo, VFC } from 'react';
import { Appearance } from 'src/types';
import { processAppearanceNotes } from 'src/utils/html-parsers/appearance-notes-parser';
import styles from 'modules/AppearanceNotes.module.scss';
import { AppearanceNotesText } from 'src/components/colorguide/AppearanceNotesText';

export interface AppearanceNotesProps {
  appearance: Appearance;
}

const AppearanceNotes: VFC<AppearanceNotesProps> = ({ appearance }) => {
  const notes = useMemo(() => (appearance.notes ? processAppearanceNotes(appearance.notes) : null), [appearance.notes]);

  return (
    <section className={styles.appearanceNotes} aria-label="Notes">
      <AppearanceNotesText>
        {notes}
        {appearance.hasCutieMarks && (
          <span className={classNames({ 'ml-2 pl-2 border-left': notes !== null })}>
            {colorGuide.appearances.cmAvailable}
          </span>
        )}
      </AppearanceNotesText>
    </section>
  );
};

export default AppearanceNotes;
