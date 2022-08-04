import { ShowListItem } from '@mlp-vectorclub/api-types';
import { FC } from 'react';

export interface ShowTableColumnDefinition {
  header: string;
  shortHeader?: string;
  only?: 'mobile' | 'desktop';
  renderContent: FC<{ entry: ShowListItem }>;
  tdClassName?: string;
}
