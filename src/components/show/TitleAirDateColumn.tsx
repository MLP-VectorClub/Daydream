import { useRef, VFC } from 'react';
import Link from 'next/link';
import { PATHS } from 'src/paths';
import { UncontrolledTooltip } from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';
import { show } from 'src/strings';
import { format } from 'date-fns';
import { ShowListItem } from 'src/types';
import { useAuth } from 'src/hooks';

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
