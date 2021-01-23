import { GetServerSideProps, NextPage } from 'next';
import { getHomeLink } from 'src/utils/path-utils';
import { prefsFetcher } from 'src/fetchers';

/**
 * This "component" redirects the user to their preferred home page
 */
const HomePageRedirect: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { req } = ctx;

  let destination: string = getHomeLink();
  try {
    const prefs = await prefsFetcher({ keys: ['cg_defaultguide', 'p_homelastep'] }, req)();
    destination = getHomeLink(prefs);
  } catch (e) {
    // ignore
  }

  return { redirect: { destination, statusCode: 302 } };
};

export default HomePageRedirect;
