import { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from 'next';
import { mapValues, omit, omitBy } from 'lodash';
import { parseRelativeUrl } from 'next/dist/shared/lib/router/utils/parse-relative-url';
import { buildUrl } from 'src/utils/url';

export const setResponseStatus = (ctx: GetServerSidePropsContext, statusCode: number) => {
  const { res } = ctx;
  if (res) {
    res.statusCode = statusCode;
  }
};

export const notFound = <P>(ctx: GetServerSidePropsContext): GetServerSidePropsResult<P> => {
  setResponseStatus(ctx, 404);

  return { notFound: true };
};

/**
 * @returns true if caller should halt execution
 */
export const fixPath = (ctx: GetServerSidePropsContext, expectedPath: string, stripParams: string[] = []): false | Redirect => {
  const { req } = ctx;
  if (!req.url || req.url?.includes('_next')) return false;

  const requestUrlParts = parseRelativeUrl(req.url);
  const strippedParams = mapValues(
    omitBy(omit({ ...requestUrlParts.query }, ['page', ...stripParams]), (el) => typeof el === 'undefined'),
    String
  );
  const requestUrl = buildUrl(requestUrlParts.pathname, strippedParams) + requestUrlParts.hash;

  if (requestUrl === expectedPath) return false;

  return { destination: expectedPath, permanent: false };
};
