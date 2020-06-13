import { NextPageContext } from 'next';

export const redirect = <T extends NextPageContext = NextPageContext>(ctx: T, path: string) => {
  const { res } = ctx;
  if (res) {
    res.writeHead(301, { Location: path });
    res.end();
  }
};

export const setResponseStatus = <T extends NextPageContext>(ctx: T, statusCode: number) => {
  const { res } = ctx;
  if (res) {
    res.statusCode = statusCode;
  }
};

export const notFound = <T extends NextPageContext>(ctx: T) => setResponseStatus(ctx, 404);
