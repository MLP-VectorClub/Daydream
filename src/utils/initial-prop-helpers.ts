import { GetServerSidePropsContext, NextPageContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

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
): boolean => {
  const { req, res } = ctx;
  if (req.url === expectedPath) return false;

  res.setHeader('location', expectedPath);
  res.statusCode = 302;
  res.end();
  return true;
};
