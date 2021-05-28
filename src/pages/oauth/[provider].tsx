import { useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { queryCache } from 'react-query';
import { OAuthErrorTypes, Status, UnifiedErrorResponseTypes, User } from 'src/types';
import { useLayout, useOAuth, useTitleSetter } from 'src/hooks';
import { ENDPOINTS, setResponseStatus } from 'src/utils';
import Center from 'src/components/shared/Center';
import StandardHeading from 'src/components/shared/StandardHeading';
import InlineIcon from 'src/components/shared/InlineIcon';
import LoadingRing from 'src/components/shared/LoadingRing';
import { oauth } from 'src/strings';
import { TitleFactory } from 'src/types/title';
import { getOAuthProvider } from 'src/utils/auth';
import { useDispatch } from 'react-redux';
import { titleSetter } from 'src/utils/core';
import { wrapper } from 'src/store';
import { PATHS } from 'src/paths';

const titleFactory: TitleFactory<{ provider?: string }> = query => {
  const provider = getOAuthProvider(query.provider);
  const title = `${provider} OAuth 2.0 Authentication`;
  return {
    title,
    breadcrumbs: [],
  };
};

const OAuthPage: NextPage = () => {
  const dispatch = useDispatch();
  const { setLayoutDisabled } = useLayout();
  const { query, replace } = useRouter();
  const closeFnRef = useRef<VoidFunction | null>(null);
  const { status, error, user } = useOAuth(query);

  const success = status === Status.SUCCESS;
  const authorized = user.name !== null;

  useEffect(() => {
    setLayoutDisabled(true);
    try {
      closeFnRef.current = parent.close
        ? () => parent.close()
        : (window.opener !== null && 'close' in window.opener ? () => (window.opener as Window).close() : null);
    } catch (e) {
      /* ignored */
    }

    return () => setLayoutDisabled(false);
  }, [setLayoutDisabled]);

  useEffect(() => {
    if (!success) return;

    void queryCache.invalidateQueries(ENDPOINTS.USERS_ME);
  }, [success]);

  useEffect(() => {
    if (!authorized) return;

    if (closeFnRef.current) closeFnRef.current();
    else void replace(PATHS.USER_LONG(user as User));
  }, [authorized, replace, user]);

  const titleData = useMemo(() => titleFactory(query), [query]);
  useTitleSetter(dispatch, titleData);

  const header = titleData.title;

  if (query.code) {
    if (status === Status.FAILURE) {
      query.error = 'server_error';
      if (error && error.type === UnifiedErrorResponseTypes.MESSAGE_ONLY) {
        query.error_description = error.message;
      }
    } else {
      const color = authorized ? 'success' : 'primary';
      const message = authorized
        ? null
        : `${success ? 'Loading profile data' : 'Creating session'}…`;
      return (
        <Center color={color} header={header} className="text-center">
          {!authorized ? (
            <LoadingRing color={color} style={{ width: '200px' }} />
          ) : (
            <FontAwesomeIcon icon="check-circle" size="10x" />
          )}
          {message && (
            <h3 className="mt-3 mb-0">{message}</h3>
          )}
        </Center>
      );
    }
  }

  const { errorTypes } = oauth;

  const heading = typeof query.error === 'string' && query.error in errorTypes
    ? errorTypes[query.error as OAuthErrorTypes]
    : errorTypes[OAuthErrorTypes.UnknownError];

  return (
    <Center color="danger" header={header} className="text-center">
      <StandardHeading
        heading={heading}
        lead={query.error_description || 'There was an unknown error while authenticating, please try again later.'}
      />
      {closeFnRef.current !== null && (
        <Button color="danger" onClick={closeFnRef.current}>
          <InlineIcon first icon="times" />
          Dismiss
        </Button>
      )}
    </Center>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { query, store } = ctx;
  if (query.error || query.error_description) setResponseStatus(ctx, 500);

  titleSetter(store, titleFactory(query));
  return {
    props: {},
  };
});

export default OAuthPage;
