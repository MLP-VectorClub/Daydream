import { GetServerSidePropsContext, NextPageContext } from 'next';
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

export const setResponseStatus = (ctx: Pick<GetServerSidePropsContext, 'res'>, statusCode: number) => {
  const { res } = ctx;
  if (res) {
    res.statusCode = statusCode;
  }
};

export const notFound = (ctx: Pick<GetServerSidePropsContext, 'res'>) => setResponseStatus(ctx, 404);

/**
 * @returns true if caller should halt execution
 */
export const fixPath = (
  ctx: Pick<GetServerSidePropsContext, 'req' | 'res'>,
  expectedPath: string,
  stripParams: string[] = [],
): boolean => {
  const { req, res } = ctx;
  if (!req.url || req.url?.includes('_next')) return false;

  const requestUrlParts = parseRelativeUrl(req.url);
  const strippedParams = mapValues(omitBy(
    omit(
      { ...requestUrlParts.query },
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
