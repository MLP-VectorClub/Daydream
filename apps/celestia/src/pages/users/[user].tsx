import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { coreActions } from 'src/store/slices';
import { useAppDispatch, wrapper } from 'src/store';
import { fixPath, getProfileTitle, handleDataFetchingError, mapRoleLabel } from 'src/utils';
import { transformProfileParams, useAuth, useTitleSetter, useUser } from 'src/hooks';
import { BreadcrumbEntry, Nullable, Optional } from 'src/types';
import { GetUsersIdResult, PublicUser } from '@mlp-vectorclub/api-types';
import StandardHeading from 'src/components/shared/StandardHeading';
import AvatarWrap from 'src/components/shared/AvatarWrap';
import Content from 'src/components/shared/Content';
import { userFetcher } from 'src/fetchers';
import { TitleFactory } from 'src/types/title';
import { titleSetter } from 'src/utils/core';
import { NextPage } from 'next';
import { PATHS } from 'src/paths';
import { SSRConfig, useTranslation } from 'next-i18next';
import { typedServerSideTranslations } from 'src/utils/i18n';

interface PropTypes {
  initialUser: Nullable<PublicUser>;
}

const titleFactory: TitleFactory<Pick<PropTypes, 'initialUser'> & { isStaff?: boolean }> = ({ initialUser, isStaff = false }) => {
  const firstBreadcrumb: BreadcrumbEntry = {
    label: ['users:profile.breadcrumb'],
  };
  if (isStaff) firstBreadcrumb.linkProps = { href: PATHS.USERS };
  return {
    title: getProfileTitle(initialUser),
    breadcrumbs: [
      firstBreadcrumb,
      {
        label: initialUser ? initialUser.name : ['users:profile.unknownUser'],
        active: true,
      },
    ],
  };
};

const ProfilePage: NextPage<PropTypes> = ({ initialUser }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { query } = useRouter();
  const { user } = useUser(transformProfileParams(query), initialUser || undefined);
  const { user: authUser, isStaff } = useAuth();
  // TODO Return limited set of user prefs

  useEffect(() => {
    dispatch(coreActions.setTitle(getProfileTitle(user, authUser.id)));
  }, [authUser, dispatch, user]);

  const titleData = useMemo(() => titleFactory({ initialUser: user || null, isStaff }), [user, isStaff]);
  useTitleSetter(dispatch, titleData);

  return (
    <Content>
      {!user && <StandardHeading heading={t('users:profile.notFound')} lead={t('users:profile.checkYourSpelling')} />}
      {user && (
        <>
          <div className="d-flex justify-content-center align-items-center mb-2">
            <AvatarWrap avatarUrl={user.avatarUrl} avatarProvider={user.avatarProvider} size={75} className="flex-grow-0" />
          </div>
          <StandardHeading heading={user.name} lead={mapRoleLabel(t, user.role)} />
        </>
      )}
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<PropTypes & SSRConfig>((store) => async (ctx) => {
  const { query, locale } = ctx;

  const params = transformProfileParams(query);

  let initialUser: Optional<GetUsersIdResult>;
  if ('id' in params || 'username' in params) {
    try {
      initialUser = await userFetcher(params)();
    } catch (e) {
      handleDataFetchingError(ctx, e);
    }
  }

  if (initialUser) {
    const expectedPath = PATHS.USER_LONG(initialUser);
    const redirect = fixPath(ctx, expectedPath, ['user']);
    if (redirect) {
      return { redirect };
    }
  }

  const props: PropTypes = {
    initialUser: initialUser || null,
  };
  titleSetter(store, titleFactory(props));
  return {
    props: {
      ...(await typedServerSideTranslations(locale, ['users'])),
      ...props,
    },
  };
});

export default ProfilePage;
