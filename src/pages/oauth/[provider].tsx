import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { queryCache } from 'react-query';
import { useTranslation } from '../../i18n';
import StandardHeading from '../../components/shared/StandardHeading';
import {
  Nullable,
  PublicUser,
  SocialProvider,
  Status,
  User,
} from '../../types';
import { useLayout } from '../../hooks/layout';
import { ENDPOINTS, PATHS, setResponseStatus } from '../../utils';
import Center from '../../components/shared/Center';
import { SOCIAL_PROVIDERS } from '../../fancy-config';
import InlineIcon from '../../components/shared/InlineIcon';
import { useOAuth } from '../../hooks/oauth';
import LoadingRing from '../../components/shared/LoadingRing';

interface PropTypes {
  initialUser: Nullable<PublicUser>;
}

const OAuthPage: React.FC<PropTypes> = () => {
  const { setLayoutDisabled } = useLayout();
  const { t } = useTranslation('oauth');
  const { query, replace } = useRouter();
  const closeFnRef = useRef<VoidFunction | null>(null);
  const { status, error, user } = useOAuth(query);

  const provider = query.provider in SOCIAL_PROVIDERS ? SOCIAL_PROVIDERS[query.provider as SocialProvider].name : '';
  const success = status === Status.SUCCESS;
  const authorized = user.name !== null;

  useEffect(() => {
    setLayoutDisabled(true);
    try {
      closeFnRef.current = parent.close ? () => parent.close() : (opener.close ? () => opener.close() : null);
    } catch (e) {
      /* ignored */
    }

    return () => setLayoutDisabled(false);
  }, []);

  useEffect(() => {
    if (!success) return;

    queryCache.invalidateQueries(ENDPOINTS.USERS_ME);
  }, [success]);

  useEffect(() => {
    if (!authorized) return;

    if (closeFnRef.current) closeFnRef.current();
    else replace(PATHS.USER_LONG(user as User));
  }, [authorized]);

  if (query.code) {
    if (status === Status.FAILURE) {
      query.error = 'server_error';
      if (error && 'message' in error) {
        // eslint-disable-next-line @typescript-eslint/camelcase
        query.error_description = error.message;
      }
    } else {
      const color = authorized ? 'success' : 'primary';
      const message = authorized
        ? null
        : `${t(success ? 'loadingUserData' : 'creatingSession')}…`;
      return (
        <Center color={color} header={t('authTitle', { provider })} className="text-center">
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

  return (
    <Center color="danger" header={t('authTitle', { provider })} className="text-center">
      <StandardHeading
        heading={t(`errorTypes.${query.error || 'unknown_error'}`)}
        lead={query.error_description || t('unknownError')}
      />
      {closeFnRef.current !== null && (
        <Button color="danger" onClick={closeFnRef.current}>
          <InlineIcon first icon="times" />
          {t('close')}
        </Button>
      )}
    </Center>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { query } = ctx;
  if (query.error || query.error_description) setResponseStatus(ctx, 500);

  return {
    props: {
      namespacesRequired: ['oauth'],
    },
  };
};

export default OAuthPage;
