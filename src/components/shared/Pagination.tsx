import { Pagination as RSPagination, PaginationItem, PaginationLink } from 'reactstrap';
import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import buildUrl from 'build-url';
import { calculatePaginationItems, PaginationProps } from '../../utils/pagination';
import { Link } from '../../routes';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  relevantProps,
  className,
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
        const pageNumberProp = el === 1 ? null : { page: String(el) };
        const pathWithoutQueryString = router.asPath.replace(/[?#].*$/, '');
        const route = linkParams === null && pageNumberProp === null
          ? pathWithoutQueryString
          : buildUrl(pathWithoutQueryString, { queryParams: { ...linkParams, ...pageNumberProp } });
        return (
          <PaginationItem key={el} active={currentPage === el}>
            <Link route={route} passHref>
              <PaginationLink>
                {el}
              </PaginationLink>
            </Link>
          </PaginationItem>
        );
      })}
    </RSPagination>
  );
};

export default Pagination;
