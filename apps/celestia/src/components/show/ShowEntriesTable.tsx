import { FC, useMemo } from 'react';
import { Nullable } from 'src/types';
import { GetShowRequest, GetShowResult } from '@mlp-vectorclub/api-types';
import { useRouter } from 'next/router';
import Pagination from 'src/components/shared/Pagination';
import { Table } from 'reactstrap';
import classNames from 'classnames';
import { ShowListItemRow } from 'src/components/show/ShowEntriesTableRow';
import { ShowTableColumnDefinition } from 'src/types/show';
import { useShowList } from 'src/hooks/show';
import { validatePageParam } from 'src/utils/validate-page-param';

export interface ShowEntriesTableProps {
  params: Omit<GetShowRequest, 'page'>;
  pageQueryParam?: string;
  initialData: Nullable<GetShowResult>;
  columns: ShowTableColumnDefinition[];
}

export const ShowEntriesTable: FC<ShowEntriesTableProps> = ({ params, pageQueryParam = 'page', initialData, columns }) => {
  const { query } = useRouter();
  const page = useMemo(() => validatePageParam(query[pageQueryParam]), [pageQueryParam, query]);
  const entries = useShowList({ ...params, page }, initialData || undefined);

  const pageData = entries.data?.pagination;
  return (
    <>
      {pageData && <Pagination {...pageData} pageParam={pageQueryParam} tooltipPos="bottom" />}
      <Table responsive borderless>
        <thead>
          <tr>
            {columns.map((col, i) => {
              const hasShortHeader = Boolean(col.shortHeader);
              return (
                <th
                  key={i}
                  className={classNames({
                    /* eslint-disable @typescript-eslint/naming-convention */
                    'd-lg-none': col.only === 'mobile',
                    'd-none d-lg-table-cell': col.only === 'desktop',
                    /* eslint-enable @typescript-eslint/naming-convention */
                  })}
                >
                  <span
                    className={classNames({
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      'd-none d-lg-inline': hasShortHeader,
                    })}
                  >
                    {col.header}
                  </span>
                  {hasShortHeader && <span className="d-lg-none">{col.shortHeader}</span>}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {entries.data?.show.map((entry) => (
            <ShowListItemRow key={entry.id} show={entry} columns={columns} />
          ))}
        </tbody>
      </Table>
      {pageData && <Pagination {...pageData} pageParam={pageQueryParam} tooltipPos="top" listClassName="mb-0" />}
    </>
  );
};
