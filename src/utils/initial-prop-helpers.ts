import { NextPageContext } from 'next';

export const redirect = <T extends NextPageContext = NextPageContext>(ctx: T, path: string) => {
  const { res } = ctx;
  if (res) {
    res.writeHead(301, { Location: path });
    res.end();
  }
};

export const notFound = <T extends NextPageContext>(ctx: T) => {
  const { res } = ctx;
  if (res) {
    res.statusCode = 404;
  }
};
