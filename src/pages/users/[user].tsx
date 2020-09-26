import React, { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useTranslation } from 'src/i18n';
import { coreActions } from 'src/store/slices';
import { wrapper } from 'src/store';
import {
  fixPath,
  getProfileTitle,
  mapRoleLabel,
  PATHS,
  setResponseStatus,
} from 'src/utils';
import { transformProfileParams, useAuth, userFetcher, useUser } from 'src/hooks';
import {
  GetUsersIdResult,
  Nullable,
  Optional,
  PublicUser,
  WithI18nNamespaces,
} from 'src/types';
import StandardHeading from 'src/components/shared/StandardHeading';
import AvatarWrap from 'src/components/shared/AvatarWrap';
import Content from 'src/components/shared/Content';

interface PropTypes extends WithI18nNamespaces {
  initialUser: Nullable<PublicUser>;
}

const ProfilePage: React.FC<PropTypes> = ({ initialUser }) => {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const { query } = useRouter();
  const { user } = useUser(transformProfileParams(query), initialUser || undefined);
  const { user: authUser } = useAuth();
  // TODO Return limited user prefs

  useEffect(() => {
    dispatch(coreActions.setTitle(getProfileTitle(user, authUser.id)));
  }, [authUser, user]);

  return (
    <Content>
      {!user && <StandardHeading heading={t('notFound')} lead={t('checkYourSpelling')} />}
      {user && (
        <>
          <div className="d-flex justify-content-center align-items-center mb-2">
            <AvatarWrap
              avatarUrl={user.avatarUrl}
              avatarProvider={user.avatarProvider}
              size={75}
              className="flex-grow-0"
            />
          </div>
          <StandardHeading heading={user.name} lead={mapRoleLabel(t, user.role)} />
        </>
      )}
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { query, store } = ctx;

  const params = transformProfileParams(query);

  let initialUser: Optional<GetUsersIdResult>;
  if ('id' in params || 'username' in params) {
    try {
      initialUser = await userFetcher(params)();
    } catch (e) {
      if (e.response) {
        const { response } = e as AxiosError;
        const status = response?.status;
        if (status) {
          setResponseStatus(ctx, status);
        }
        if (status !== 404) {
          console.error(e.response);
        }
      } else {
        console.error(e);
      }
    }
  }

  if (initialUser) {
    const expectedPath = PATHS.USER_LONG(initialUser);
    if (fixPath(ctx, expectedPath, ['user'])) {
      return;
    }
  }

  store.dispatch(coreActions.setTitle(getProfileTitle(initialUser)));
  return {
    props: {
      initialUser: initialUser || null,
    },
  };
});

ProfilePage.defaultProps = {
  i18nNamespaces: ['profile'],
};

export default ProfilePage;
