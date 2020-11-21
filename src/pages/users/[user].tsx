import React, { useEffect, useMemo } from 'react';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { coreActions } from 'src/store/slices';
import { wrapper } from 'src/store';
import {
  fixPath,
  getProfileTitle,
  mapRoleLabel,
  PATHS,
  setResponseStatus,
} from 'src/utils';
import { transformProfileParams, useAuth, useTitleSetter, useUser } from 'src/hooks';
import {
  BreadcrumbEntry,
  GetUsersIdResult,
  Nullable,
  Optional,
  PublicUser,
} from 'src/types';
import StandardHeading from 'src/components/shared/StandardHeading';
import AvatarWrap from 'src/components/shared/AvatarWrap';
import Content from 'src/components/shared/Content';
import { profile } from 'src/strings';
import { userFetcher } from 'src/fetchers';
import { TitleFactory } from 'src/types/title';
import { titleSetter } from 'src/utils/core';
import { NextPage } from 'next';

interface PropTypes {
  initialUser: Nullable<PublicUser>;
}

const titleFactory: TitleFactory<Pick<PropTypes, 'initialUser'> & { isStaff?: boolean }> = ({ initialUser, isStaff = false }) => {
  const firstBreadcrumb: BreadcrumbEntry = { label: profile.breadcrumb };
  if (isStaff) firstBreadcrumb.linkProps = { href: PATHS.USERS };
  return ({
    title: getProfileTitle(initialUser),
    breadcrumbs: [
      firstBreadcrumb,
      { label: initialUser ? initialUser.name : profile.unknownUser, active: true },
    ],
  });
};

const ProfilePage: NextPage<PropTypes> = ({ initialUser }) => {
  const dispatch = useDispatch();
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
      {!user && <StandardHeading heading={profile.notFound} lead={profile.checkYourSpelling} />}
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
          <StandardHeading heading={user.name} lead={mapRoleLabel(user.role)} />
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
      if ('response' in e) {
        const { response } = e as AxiosError;
        const status = response?.status;
        if (status) {
          setResponseStatus(ctx, status);
        }
        if (status !== 404) {
          console.error(response);
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

  const props: PropTypes = {
    initialUser: initialUser || null,
  };
  titleSetter(store, titleFactory(props));
  return { props };
});

export default ProfilePage;
