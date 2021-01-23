import { VFC } from 'react';
import { ShowListItem } from 'src/types';
import { ShowTableColumnDefinition } from 'src/types/show';
import classNames from 'classnames';

export const ShowListItemRow: VFC<{ show: ShowListItem; columns: ShowTableColumnDefinition[] }> = ({ show, columns }) => (
  <tr>
    {columns.map(({ only, renderContent: Renderer, tdClassName }, i) => (
      <td key={i} className={classNames(tdClassName, { 'd-lg-none': only === 'mobile', 'd-none d-lg-table-cell': only === 'desktop' })}>
        <Renderer entry={show} />
      </td>
    ))}
  </tr>
);
