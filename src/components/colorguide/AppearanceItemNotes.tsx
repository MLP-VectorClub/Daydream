import classNames from 'classnames';
import { colorGuide } from 'src/strings';
import { useMemo, VFC } from 'react';
import { Appearance } from 'src/types';
import { processAppearanceNotes } from 'src/utils/html-parsers/appearance-notes-parser';
import styles from 'modules/AppearanceNotes.module.scss';
import { AppearanceNotesText } from 'src/components/colorguide/AppearanceNotesText';

const AppearanceItemNotes: VFC<Pick<Appearance, 'notes' | 'hasCutieMarks'>> = ({ notes, hasCutieMarks }) => {
  const processedNotes = useMemo(() => (notes ? processAppearanceNotes(notes) : null), [notes]);

  return (
    <section className={styles.appearanceNotes} aria-label="Notes">
      <AppearanceNotesText>
        {processedNotes}
        {hasCutieMarks && (
          <span className={classNames({ 'ml-2 pl-2 border-left': processedNotes !== null })}>
            {colorGuide.appearances.cmAvailable}
          </span>
        )}
      </AppearanceNotesText>
    </section>
  );
};

export default AppearanceItemNotes;
