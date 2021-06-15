import { ShowTableColumnDefinition } from 'src/types/show';
import { episodeToString, seasonEpisodeToString } from 'src/utils/show';
import styles from 'src/scss/modules/ShowPage.module.scss';
import { useRef, VFC } from 'react';
import { ShowListItem } from 'src/types';
import { useAuth } from 'src/hooks';
import Link from 'next/link';
import { PATHS } from 'src/paths';
import InlineIcon from 'src/components/shared/InlineIcon';
import { UncontrolledTooltip } from 'reactstrap';
import { show } from 'src/strings';
import { format } from 'date-fns';
import { GuideIcon } from 'src/components/shared/GuideIcon';

export const EpisodeColumn: ShowTableColumnDefinition['renderContent'] = ({ entry }) => <>{episodeToString(entry)}</>;

export const GenerationColumn: ShowTableColumnDefinition['renderContent'] = ({ entry }) => (
  <div className={styles.generationImage}>
    <GuideIcon guide={entry.generation} />
  </div>
);

export const SeasonColumn: ShowTableColumnDefinition['renderContent'] = ({ entry }) => <>{entry.season}</>;

export const EpisodeNumberColumn: ShowTableColumnDefinition['renderContent'] = ({ entry }) => <>{seasonEpisodeToString(entry)}</>;

export const ShowNumberColumn: ShowTableColumnDefinition['renderContent'] = ({ entry }) => <>{entry.no}</>;

export const TitleAirDateColumn: VFC<{ entry: ShowListItem }> = ({ entry }) => {
  const { isStaff } = useAuth();
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <div>
        <Link href={PATHS.EPISODE(entry)}>
          <a>{entry.title}</a>
        </Link>
        {isStaff && (
          <span className="ml-2">
            <span className="p-2 text-info faded" ref={editButtonRef}>
              <InlineIcon icon="pencil-alt" />
            </span>
            <UncontrolledTooltip target={editButtonRef} fade={false} placement="top">
              {show.index.edit} {entry.type}
            </UncontrolledTooltip>
            <span className="p-2 text-danger faded" ref={deleteButtonRef}>
              <InlineIcon icon="times" />
            </span>
            <UncontrolledTooltip target={deleteButtonRef} fade={false} placement="top">
              {show.index.delete} {entry.type}
            </UncontrolledTooltip>
          </span>
        )}
      </div>
      {entry.airs && <time dateTime={entry.airs}>{format(new Date(entry.airs), 'EEEE, do MMMM yyyy, H:mm:ss')}</time>}
    </>
  );
};
