import { FC, useMemo } from 'react';
import { AppearanceOnly } from '@mlp-vectorclub/api-types';
import InlineIcon from 'src/components/shared/InlineIcon';
import styles from 'modules/AppearancePage.module.scss';
import { AppearanceNotesText } from 'src/components/colorguide/AppearanceNotesText';
import { processAppearanceNotes } from 'src/utils/html-parsers/appearance-notes-parser';

export const AppearanceNotes: FC<Pick<Partial<AppearanceOnly>, 'notes'>> = ({ notes }) => {
  const processedNotes = useMemo(() => (notes ? processAppearanceNotes(notes) : null), [notes]);

  if (processedNotes === null) return null;

  return (
    <>
      <h2>
        <InlineIcon icon="sticky-note" first size="xs" />
        Additional notes
      </h2>
      <div className={styles.notes}>
        <AppearanceNotesText>{processedNotes}</AppearanceNotesText>
      </div>
    </>
  );
};
