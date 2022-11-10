import classNames from 'classnames';
import { FC, useMemo } from 'react';
import { Appearance } from '@mlp-vectorclub/api-types';
import { processAppearanceNotes } from 'src/utils/html-parsers/appearance-notes-parser';
import styles from 'modules/AppearanceNotes.module.scss';
import { AppearanceNotesText } from 'src/components/colorguide/AppearanceNotesText';
import { useTranslation } from 'next-i18next';

const cmSpacingClasses = 'ml-2 pl-2 border-left';

const AppearanceItemNotes: FC<Pick<Appearance, 'notes' | 'hasCutieMarks'>> = ({ notes, hasCutieMarks }) => {
  const { t } = useTranslation();
  const processedNotes = useMemo(() => (notes ? processAppearanceNotes(notes) : null), [notes]);

  return (
    <section className={styles.appearanceNotes} aria-label="Notes">
      <AppearanceNotesText>
        {processedNotes}
        {hasCutieMarks && (
          <span
            className={classNames({
              [cmSpacingClasses]: processedNotes !== null,
            })}
          >
            {t('colorGuide:appearances.cmAvailable')}
          </span>
        )}
      </AppearanceNotesText>
    </section>
  );
};

export default AppearanceItemNotes;
