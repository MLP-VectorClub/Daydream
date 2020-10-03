import {
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Pagination as RSPagination,
  PaginationItem,
  PaginationLink,
  Tooltip,
} from 'reactstrap';
import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { pickBy } from 'lodash';
import Link from 'next/link';
import { calculatePaginationItems, GO_TO_ITEM, PaginationProps } from 'src/utils';
import { useTranslation } from 'src/i18n';
import { ParsedUrlQuery } from 'querystring';

type PageLinkProps = PropsWithChildren<{
  number: number;
  relevantProps?: string[];
  pageParam: string;
}>;

const PageLink: React.FC<PageLinkProps> = ({ number, children, relevantProps, pageParam }) => {
  const router = useRouter();
  const pathname = router.route;
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
      href={{ pathname, query }}
      as={{ pathname: pathWithoutQueryString, query }}
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
  size?: string;
}

const GotoPaginationItem: React.FC<GotoPaginationItemProps> = ({ defaultValue, totalPages, pageParam, size }) => {
  const { t } = useTranslation('common');
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [target, setTarget] = useState(defaultValue);

  const toggleTooltip = useCallback(() => {
    const newState = !tooltipOpen;
    setTooltipOpen(newState);
    if (newState) {
      setTarget(defaultValue);
    }
  }, [tooltipOpen, defaultValue]);
  const handleKeypress = useCallback(e => {
    if (e.key === 'Enter' || e.key === ' ') toggleTooltip();
  }, []);
  const handleChange = useCallback(e => {
    setTarget(parseInt(e.target.value, 10));
  }, []);

  return (
    <PaginationItem className="page-item-ellipsis">
      <a className="page-link" ref={linkRef} onClick={toggleTooltip} onKeyPress={handleKeypress}>
        {GO_TO_ITEM}
      </a>
      {linkRef.current !== null && (
        <Tooltip
          target={linkRef.current}
          placement="bottom"
          trigger="click"
          toggle={toggleTooltip}
          isOpen={tooltipOpen}
          fade={false}
          autohide={false}
          delay={tooltipOpen ? 500 : undefined}
          className="tooltip-go-to-page"
        >
          <InputGroup size={size}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                {t('pagination.page')}:
              </InputGroupText>
            </InputGroupAddon>
            <Input type="number" min="1" max={totalPages} value={target} onChange={handleChange} />
            <InputGroupAddon addonType="append">
              <PageLink number={target} pageParam={pageParam}>
                <Button color="ui" tag="a" onClick={toggleTooltip}>{t('pagination.go')}</Button>
              </PageLink>
            </InputGroupAddon>
          </InputGroup>
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
  pageParam = 'page',
  size,
}) => {
  const pageItems = useMemo(() => calculatePaginationItems({ currentPage, totalPages }), [currentPage, totalPages]);

  return (
    <RSPagination size={size} className={className} listClassName="justify-content-center">
      {pageItems.map((el, i) => {
        if (el === GO_TO_ITEM) {
          const defaultValue = (
            i < (pageItems.length / 2)
              ? (pageItems[i + 1] as number) - 1
              : (pageItems[i - 1] as number) + 1
          );
          return (
            <GotoPaginationItem key={`goto-${i}`} totalPages={totalPages} defaultValue={defaultValue} pageParam={pageParam} size={size} />
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
