import { Pagination as RSPagination, PaginationItem, PaginationLink } from 'reactstrap';
import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import Link from 'next/link';
import { calculatePaginationItems, PaginationProps } from '../../utils';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  relevantProps,
  className,
  pageParam = 'page',
}) => {
  const router = useRouter();
  const pageItems = useMemo(() => calculatePaginationItems({ currentPage, totalPages }), [currentPage, totalPages]);
  const linkParams = useMemo(() => (
    relevantProps
      ? pickBy(router.query, el => typeof el === 'string' && relevantProps.includes(el))
      : null
  ), [relevantProps, router.query]);

  return (
    <RSPagination className={className} listClassName="justify-content-center">
      {pageItems.map(el => {
        const pageNumberProp = el === 1 ? null : { [pageParam]: String(el) };
        const pathWithoutQueryString = router.asPath.replace(/[?#].*$/, '');
        const query = { ...linkParams, ...pageNumberProp };
        const link = (
          <PaginationLink>
            {el}
          </PaginationLink>
        );
        const active = currentPage === el;
        return (
          <PaginationItem key={el} active={active}>
            {active
              ? link
              : (
                <Link
                  href={{ pathname: router.route, query }}
                  as={{ pathname: pathWithoutQueryString, query }}
                  passHref
                >
                  {link}
                </Link>
              )}
          </PaginationItem>
        );
      })}
    </RSPagination>
  );
};

export default Pagination;
