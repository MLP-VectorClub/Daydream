import { range, uniq } from 'lodash';
import { PageData } from '../types';

export const GO_TO_ITEM = '\u{2026}';

// TODO Handle & add "go to" item
// export type PaginationItems = Array<number | typeof GO_TO_ITEM>;
export type PaginationItems = number[];

type PageDataRelevantProps = Pick<PageData['pagination'], 'currentPage' | 'totalPages'>;

export interface PaginationProps extends PageDataRelevantProps {
  relevantProps?: string[];
  className?: string;
}

interface CalculatePaginationItemsOptions extends PageDataRelevantProps {
  context?: number;
}

export const calculatePaginationItems = ({
  currentPage,
  totalPages,
  context = 2,
}: CalculatePaginationItemsOptions): PaginationItems => {
  let invalid = false;
  let current = currentPage;
  const
    total = totalPages;
  if (current < 1) {
    current = 1;
    invalid = true;
  }
  if (current > total) {
    current = total;
    invalid = true;
  }
  if (invalid) {
    console.error(`Invalid pagination data (current: ${current}, total: ${total})`);
  }

  const maxItems = 3 + context * 2;
  if (total < maxItems) return range(1, total + 1);

  return uniq([
    1,
    ...range(
      Math.max(currentPage - context, 1),
      Math.min(currentPage + context, totalPages) + 1,
    ),
    totalPages,
  ]);
};
