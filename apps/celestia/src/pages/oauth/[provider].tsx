import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Alert, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OAuthErrorTypes, Status, Translatable, UnifiedErrorResponseTypes } from 'src/types';
import { User } from '@mlp-vectorclub/api-types';
import { useLayout, useOAuth, useTitleSetter } from 'src/hooks';
import { ENDPOINTS, setResponseStatus } from 'src/utils';
import Center from 'src/components/shared/Center';
import StandardHeading from 'src/components/shared/StandardHeading';
import InlineIcon from 'src/components/shared/InlineIcon';
import LoadingRing from 'src/components/shared/LoadingRing';
import { TitleFactory } from 'src/types/title';
import { getOAuthProvider } from 'src/utils/auth';
import { titleSetter } from 'src/utils/core';
import { useAppDispatch, wrapper } from 'src/store';
import { PATHS } from 'src/paths';
import { SSRConfig, useTranslation } from 'next-i18next';
import { typedServerSideTranslations } from 'src/utils/i18n';
import { useQueryClient } from 'react-query';

const titleFactory: TitleFactory<{ provider?: string }> = (query) => {
  const provider = getOAuthProvider(query.provider);
  const title: Translatable = ['oauth:authTitle', { replace: { provider } }];
  return {
    title,
    breadcrumbs: [],
  };
};

const OAuthPage: NextPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { setLayoutDisabled } = useLayout();
  const { query, replace } = useRouter();
  const closeFnRef = useRef<VoidFunction | null>(null);
  const { status, error, user } = useOAuth(query);
  const queryClient = useQueryClient();

  const success = status === Status.SUCCESS;
  const authorized = user.name !== null;
  const provider = getOAuthProvider(query.provider);

  useEffect(() => {
    setLayoutDisabled(true);
    try {
      closeFnRef.current = parent.close
        ? () => parent.close()
        : window.opener !== null && 'close' in window.opener
        ? () => (window.opener as Window).close()
        : null;
    } catch (e) {
      /* ignored */
    }

    return () => setLayoutDisabled(false);
  }, [setLayoutDisabled]);

  useEffect(() => {
    if (!success) return;

    void queryClient.invalidateQueries(ENDPOINTS.USERS_ME);
  }, [queryClient, success]);

  useEffect(() => {
    if (!authorized) return;

    if (closeFnRef.current) closeFnRef.current();
    else void replace(PATHS.USER_LONG(user as User));
  }, [authorized, replace, user]);

  const titleData = useMemo(() => titleFactory(query), [query]);
  useTitleSetter(dispatch, titleData);

  const header = t('oauth:authTitle', { replace: { provider } });

  if (query.code) {
    if (status === Status.FAILURE) {
      query.error = OAuthErrorTypes.ServerError;
      if (error && error.type === UnifiedErrorResponseTypes.MESSAGE_ONLY) {
        query.error_description = error.message;
      }
    } else {
      const color = authorized ? 'success' : 'primary';
      const message = authorized ? null : `${success ? t('oauth:loadingUserData') : t('oauth:creatingSession')}…`;
      return (
        <Center color={color} header={header} className="text-center">
          {!authorized ? <LoadingRing color={color} style={{ width: '200px' }} /> : <FontAwesomeIcon icon="check-circle" size="10x" />}
          {message && <h3 className="mt-3 mb-0">{message}</h3>}
        </Center>
      );
    }
  }

  const unknownError = t(`oauth:errorTypes.unknown_error`);
  const heading =
    typeof query.error === 'string'
      ? t(`oauth:errorTypes.${query.error as OAuthErrorTypes}`, {
          defaultValue: unknownError,
        })
      : unknownError;

  return (
    <Center color="danger" header={header} className="text-center">
      <StandardHeading heading={heading} lead={query.error_description || t('oauth:unknownError')} />
      {error?.type === UnifiedErrorResponseTypes.RATE_LIMITED && (
        <Alert color="danger" className="mt-3 mb-0">
          {t('common:auth.rateLimited', { count: error.retryAfter })}
        </Alert>
      )}
      {closeFnRef.current !== null && (
        <Button color="danger" onClick={closeFnRef.current} className="mt-3">
          <InlineIcon first icon="times" />
          {t('oauth:close')}
        </Button>
      )}
    </Center>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<SSRConfig>((store) => async (ctx) => {
  const { query, locale } = ctx;
  if (query.error || query.error_description) setResponseStatus(ctx, 500);

  titleSetter(store, titleFactory(query));
  return {
    props: {
      ...(await typedServerSideTranslations(locale, ['oauth'])),
    },
  };
});

export default OAuthPage;
