import { GetServerSidePropsContext, NextPageContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { isEmpty, mapValues, omit, omitBy } from 'lodash';
import { parseRelativeUrl } from 'next/dist/next-server/lib/router/utils/parse-relative-url';
import buildUrl from 'build-url';

export const redirect = <T extends NextPageContext = NextPageContext>(ctx: T, path: string) => {
  const { res } = ctx;
  if (res) {
    res.writeHead(301, { Location: path });
    res.end();
  }
};

export const setResponseStatus = <T extends ParsedUrlQuery>(ctx: GetServerSidePropsContext<T>, statusCode: number) => {
  const { res } = ctx;
  if (res) {
    res.statusCode = statusCode;
  }
};

export const notFound = <T extends ParsedUrlQuery>(ctx: GetServerSidePropsContext<T>) => setResponseStatus(ctx, 404);

/**
 * @returns true if caller should halt execution
 */
export const fixPath = <T extends ParsedUrlQuery>(
  ctx: GetServerSidePropsContext<T>,
  expectedPath: string,
  stripParams: string[] = [],
): boolean => {
  const { req, res } = ctx;
  if (!req.url || req.url?.includes('_next')) return false;

  const requestUrlParts = parseRelativeUrl(req.url);
  const strippedParams = mapValues(omitBy(
    omit(
      { ...requestUrlParts.searchParams },
      ['page', ...stripParams],
    ),
    el => typeof el === 'undefined',
  ), String);
  const requestUrl = buildUrl('', {
    path: requestUrlParts.pathname,
    hash: requestUrlParts.hash,
    queryParams: isEmpty(strippedParams) ? undefined : strippedParams,
  });

  if (requestUrl === expectedPath) return false;

  res.setHeader('location', expectedPath);
  res.setHeader('x-original-location', req.url);
  res.statusCode = 302;
  res.end();
  return true;
};
