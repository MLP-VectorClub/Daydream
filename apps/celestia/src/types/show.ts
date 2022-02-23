import { ShowListItem } from 'src/types/api';
import { VFC } from 'react';

export interface ShowTableColumnDefinition {
  header: string;
  shortHeader?: string;
  only?: 'mobile' | 'desktop';
  renderContent: VFC<{ entry: ShowListItem }>;
  tdClassName?: string;
}
