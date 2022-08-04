import { FC } from 'react';
import { ShowListItem } from '@mlp-vectorclub/api-types';
import { ShowTableColumnDefinition } from 'src/types/show';
import classNames from 'classnames';

export const ShowListItemRow: FC<{
  show: ShowListItem;
  columns: ShowTableColumnDefinition[];
}> = ({ show, columns }) => (
  <tr>
    {columns.map(({ only, renderContent: Renderer, tdClassName }, i) => (
      <td
        key={i}
        className={classNames(tdClassName, {
          /* eslint-disable @typescript-eslint/naming-convention */
          'd-lg-none': only === 'mobile',
          'd-none d-lg-table-cell': only === 'desktop',
          /* eslint-enable @typescript-eslint/naming-convention */
        })}
      >
        <Renderer entry={show} />
      </td>
    ))}
  </tr>
);
