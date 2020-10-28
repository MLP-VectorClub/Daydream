import {
  Button,
  Input,
  Pagination as RSPagination,
  PaginationItem,
  PaginationLink,
  Tooltip,
} from 'reactstrap';
import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import Link from 'next/link';
import { calculatePaginationItems, GO_TO_ITEM, PaginationProps } from 'src/utils';
import { ParsedUrlQuery } from 'querystring';
import InlineIcon from 'src/components/shared/InlineIcon';
import { common } from 'src/strings';
import classNames from 'classnames';

type PageLinkProps = PropsWithChildren<{
  number: number;
  relevantProps?: string[];
  pageParam: string;
}>;

const PageLink: React.FC<PageLinkProps> = ({ number, children, relevantProps, pageParam }) => {
  const router = useRouter();
  const linkParams = useMemo(() => (
    relevantProps
      ? pickBy(router.query, el => typeof el === 'string' && relevantProps.includes(el))
      : null
  ), [relevantProps, router.query]);
  const pageNumberProp = number === 1 ? null : { [pageParam]: String(number) };
  const pathWithoutQueryString = router.asPath.replace(/[?#].*$/, '');
  const query: ParsedUrlQuery = { ...linkParams, ...pageNumberProp };

  return (
    <Link
      href={{ pathname: pathWithoutQueryString, query }}
      passHref
    >
      {children}
    </Link>
  );
};

interface GotoPaginationItemProps {
  defaultValue: number;
  totalPages: number;
  pageParam: string;
  tooltipPos: PaginationProps['tooltipPos'];
}

const GotoPaginationItem: React.FC<GotoPaginationItemProps> = ({ defaultValue, totalPages, pageParam, tooltipPos }) => {
  const linkRef = useRef<HTMLButtonElement>(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [target, setTarget] = useState(defaultValue);
  const [focusInput, setFocusInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleTooltip = useCallback(() => {
    const newState = !tooltipOpen;
    setTooltipOpen(newState);
    if (newState) {
      setTarget(defaultValue);
      setFocusInput(true);
    }
  }, [tooltipOpen, defaultValue]);
  const handleKeypress = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') toggleTooltip();
  }, [toggleTooltip]);
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(parseInt(e.target.value, 10));
  }, []);

  useEffect(() => {
    if (focusInput && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
      setFocusInput(false);
    }
  }, [focusInput]);

  return (
    <PaginationItem className="page-item-ellipsis">
      <button type="button" className="page-link" ref={linkRef} onClick={toggleTooltip} onKeyPress={handleKeypress}>
        <InlineIcon icon={tooltipOpen ? (tooltipPos === 'top' ? 'chevron-down' : 'chevron-up') : 'ellipsis-h'} fixedWidth />
      </button>
      {linkRef.current !== null && (
        <Tooltip
          target={linkRef.current}
          placement={tooltipPos}
          trigger="click"
          toggle={toggleTooltip}
          isOpen={tooltipOpen}
          fade={false}
          delay={tooltipOpen ? 500 : undefined}
          className="tooltip-go-to-page"
        >
          <div className="d-flex align-items-center">
            <span className="mr-2">{common.pagination.page}:</span>
            <Input
              className="mr-2"
              bsSize="sm"
              type="number"
              min="1"
              max={totalPages}
              value={target}
              onChange={handleChange}
              innerRef={inputRef}
            />
            <PageLink number={target} pageParam={pageParam}>
              <Button size="sm" color="light" tag="a" onClick={toggleTooltip}>{common.pagination.go}</Button>
            </PageLink>
          </div>
        </Tooltip>
      )}
    </PaginationItem>
  );
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  relevantProps,
  className,
  listClassName,
  pageParam = 'page',
  size,
  tooltipPos,
}) => {
  const pageItems = useMemo(() => calculatePaginationItems({ currentPage, totalPages }), [currentPage, totalPages]);

  return (
    <RSPagination size={size} className={className} listClassName={classNames('justify-content-center', listClassName)}>
      {pageItems.map((el, i) => {
        if (el === GO_TO_ITEM) {
          const defaultValue = (
            i < (pageItems.length / 2)
              ? (pageItems[i + 1] as number) - 1
              : (pageItems[i - 1] as number) + 1
          );
          const gotoItemProps = {
            totalPages,
            defaultValue,
            pageParam,
            tooltipPos,
          };
          return (
            <GotoPaginationItem
              key={`goto-${i}`}
              {...gotoItemProps}
            />
          );
        }
        const active = currentPage === el;
        const link: JSX.Element = active ? (
          <PaginationLink>
            {el}
          </PaginationLink>
        ) : (
          <PageLink number={el as number} relevantProps={relevantProps} pageParam={pageParam}>
            <PaginationLink>
              {el}
            </PaginationLink>
          </PageLink>
        );
        return (
          <PaginationItem key={el} active={active}>
            {link}
          </PaginationItem>
        );
      })}
    </RSPagination>
  );
};

export default Pagination;
