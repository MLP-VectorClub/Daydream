import { ShowTableColumnDefinition } from 'src/types/show';
import { episodeToString, seasonEpisodeToString } from 'src/utils/show';
import styles from 'modules/ShowPage.module.scss';
import { FC, useRef } from 'react';
import { ShowListItem } from '@mlp-vectorclub/api-types';
import { useAuth } from 'src/hooks';
import Link from 'next/link';
import { PATHS } from 'src/paths';
import InlineIcon from 'src/components/shared/InlineIcon';
import { UncontrolledTooltip } from 'reactstrap';
import { format } from 'date-fns';
import { GuideIcon } from 'src/components/shared/GuideIcon';
import { useTranslation } from 'next-i18next';

export const EpisodeColumn: ShowTableColumnDefinition['renderContent'] = ({ entry }) => <>{episodeToString(entry)}</>;

export const GenerationColumn: ShowTableColumnDefinition['renderContent'] = ({ entry }) => (
  <div className={styles.generationImage}>
    <GuideIcon guide={entry.generation} />
  </div>
);

export const SeasonColumn: ShowTableColumnDefinition['renderContent'] = ({ entry }) => <>{entry.season}</>;

export const EpisodeNumberColumn: ShowTableColumnDefinition['renderContent'] = ({ entry }) => <>{seasonEpisodeToString(entry)}</>;

export const ShowNumberColumn: ShowTableColumnDefinition['renderContent'] = ({ entry }) => <>{entry.no}</>;

export const TitleAirDateColumn: FC<{ entry: ShowListItem }> = ({ entry }) => {
  const { t } = useTranslation();
  const { isStaff } = useAuth();
  const editButtonRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const typeName = t(`show:index.typeNames.${entry.type}`);
  const airDateFormat = t(`show:index.airDateFormat`);
  return <>
    <div>
      <Link href={PATHS.EPISODE(entry)}>
        {entry.title}
      </Link>
      {isStaff && (
        <span className="ml-2">
          <span className="p-2 text-info faded" ref={editButtonRef}>
            <InlineIcon icon="pencil-alt" />
          </span>
          <UncontrolledTooltip target={editButtonRef} fade={false} placement="top">
            {t('show:index.edit', { typeName })}
          </UncontrolledTooltip>
          <span className="p-2 text-danger faded" ref={deleteButtonRef}>
            <InlineIcon icon="times" />
          </span>
          <UncontrolledTooltip target={deleteButtonRef} fade={false} placement="top">
            {t('show:index.delete', { typeName })}
          </UncontrolledTooltip>
        </span>
      )}
    </div>
    {entry.airs && <time dateTime={entry.airs}>{format(new Date(entry.airs), airDateFormat)}</time>}
  </>;
};
