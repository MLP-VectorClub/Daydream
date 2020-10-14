import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { queryCache } from 'react-query';
import {
  OAuthErrorTypes,
  SocialProvider,
  Status,
  UnifiedErrorResponseTypes,
  User,
} from 'src/types';
import { useLayout, useOAuth } from 'src/hooks';
import { ENDPOINTS, PATHS, setResponseStatus } from 'src/utils';
import { SOCIAL_PROVIDERS } from 'src/fancy-config';
import Center from 'src/components/shared/Center';
import StandardHeading from 'src/components/shared/StandardHeading';
import InlineIcon from 'src/components/shared/InlineIcon';
import LoadingRing from 'src/components/shared/LoadingRing';
import { oauth } from 'src/strings';

const OAuthPage: React.FC = () => {
  const { setLayoutDisabled } = useLayout();
  const { query, replace } = useRouter();
  const closeFnRef = useRef<VoidFunction | null>(null);
  const { status, error, user } = useOAuth(query);

  const provider = typeof query.provider === 'string' && query.provider in SOCIAL_PROVIDERS
    ? SOCIAL_PROVIDERS[query.provider as SocialProvider].name
    : '';
  const success = status === Status.SUCCESS;
  const authorized = user.name !== null;

  useEffect(() => {
    setLayoutDisabled(true);
    try {
      closeFnRef.current = parent.close ? () => parent.close() : ('close' in opener ? () => (opener as Window).close() : null);
    } catch (e) {
      /* ignored */
    }

    return () => setLayoutDisabled(false);
  }, []);

  useEffect(() => {
    if (!success) return;

    void queryCache.invalidateQueries(ENDPOINTS.USERS_ME);
  }, [success]);

  useEffect(() => {
    if (!authorized) return;

    if (closeFnRef.current) closeFnRef.current();
    else void replace(PATHS.USER_LONG(user as User));
  }, [authorized]);

  const header = `${provider} OAuth 2.0 Authentication`;

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

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { query } = ctx;
  if (query.error || query.error_description) setResponseStatus(ctx, 500);

  return {
    props: {},
  };
};

export default OAuthPage;
