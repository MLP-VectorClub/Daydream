import { NextPage } from 'next';
import { handleDataFetchingError, notFound } from 'src/utils';
import { PreviewAppearance } from '@mlp-vectorclub/api-types';
import { PATHS } from 'src/paths';
import { appearanceLocationFetcher } from 'src/fetchers';
import { StatusCodes } from 'http-status-codes';
import { useAppearanceLocation } from 'src/hooks';
import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import InlineIcon from 'src/components/shared/InlineIcon';
import StatusAlert from 'src/components/shared/StatusAlert';
import { wrapper } from 'src/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SSRConfig } from 'next-i18next';
import { typedServerSideTranslations } from 'src/utils/i18n';

interface PropTypes {
  id: number;
}

/**
 * Redirects the path without the guide name to the fully qualified URL
 */
const LegacyAppearanceRedirect: NextPage<PropTypes> = ({ id }) => {
  const { appearance, status } = useAppearanceLocation({ id });
  const router = useRouter();

  useEffect(() => {
    if (!appearance) return;

    void router.push(PATHS.APPEARANCE(appearance));
  }, [appearance, router]);

  return (
    <Content>
      <StandardHeading
        heading={
          <>
            <InlineIcon loading first />
            Looking for appearance…
          </>
        }
        lead="You've opened a short link, we're trying to find the original target"
      />

      <StatusAlert status={status} />
    </Content>
  );
};

export default LegacyAppearanceRedirect;

export const getServerSideProps = wrapper.getServerSideProps<PropTypes & SSRConfig>(() => async (ctx) => {
  const { query, req, locale } = ctx;

  if (typeof query.id !== 'string') {
    return { notFound: true };
  }
  const id = Number.parseInt(query.id, 10);

  let appearanceData: PreviewAppearance | undefined;
  try {
    appearanceData = await appearanceLocationFetcher({ id }, req)();
  } catch (e) {
    handleDataFetchingError(ctx, e);
  }

  if (appearanceData) {
    return {
      redirect: {
        destination: PATHS.APPEARANCE(appearanceData),
        statusCode: StatusCodes.TEMPORARY_REDIRECT,
      },
    };
  }

  notFound(ctx);
  const props: PropTypes = { id };
  return {
    props: {
      ...(await typedServerSideTranslations(locale, ['colorGuide'])),
      ...props,
    },
  };
});
