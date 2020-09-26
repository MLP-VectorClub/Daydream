import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { queryCache } from 'react-query';
import { useTranslation } from 'src/i18n';
import {
  Nullable,
  PublicUser,
  SocialProvider,
  Status,
  UnifiedErrorResponseTypes,
  User,
  WithI18nNamespaces,
} from 'src/types';
import { useLayout, useOAuth } from 'src/hooks';
import { ENDPOINTS, PATHS, setResponseStatus } from 'src/utils';
import { SOCIAL_PROVIDERS } from 'src/fancy-config';
import Center from 'src/components/shared/Center';
import StandardHeading from 'src/components/shared/StandardHeading';
import InlineIcon from 'src/components/shared/InlineIcon';
import LoadingRing from 'src/components/shared/LoadingRing';

interface PropTypes extends WithI18nNamespaces {
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
      if (error && error.type === UnifiedErrorResponseTypes.MESSAGE_ONLY) {
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
    props: {},
  };
};

OAuthPage.defaultProps = {
  i18nNamespaces: ['oauth'],
};

export default OAuthPage;
