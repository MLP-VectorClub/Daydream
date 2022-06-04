import { range, uniq } from 'lodash';
import { PageData } from '@mlp-vectorclub/api-types';

export const GO_TO_ITEM = '\u{2026}';

export type PaginationItems = Array<number | typeof GO_TO_ITEM>;

type PageDataRelevantProps = Pick<PageData['pagination'], 'currentPage' | 'totalPages'>;

export interface PaginationProps extends PageDataRelevantProps {
  relevantProps?: string[];
  className?: string;
  listClassName?: string;
  pageParam?: string;
  size?: string;
  tooltipPos: 'top' | 'bottom';
}

interface CalculatePaginationItemsOptions extends PageDataRelevantProps {
  context?: number;
}

export const calculatePaginationItems = ({ currentPage, totalPages, context = 2 }: CalculatePaginationItemsOptions): PaginationItems => {
  let invalid = false;
  let current = currentPage;
  const total = totalPages;
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

  const sequence = uniq([1, ...range(Math.max(currentPage - context, 1), Math.min(currentPage + context, totalPages) + 1), totalPages]);

  const items: PaginationItems = [];
  sequence.forEach((currentItem, i) => {
    if (i > 0) {
      const previousItem = sequence[i - 1];
      const expectedValue = Math.min(previousItem + 1, totalPages);
      if (currentItem !== expectedValue) {
        const diff = currentItem - previousItem;
        items.push(diff > 2 ? GO_TO_ITEM : previousItem + 1);
      }
    }

    items.push(currentItem);
  });

  return items;
};
