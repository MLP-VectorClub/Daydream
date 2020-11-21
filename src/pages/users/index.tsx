import Content from 'src/components/shared/Content';
import React, { useMemo } from 'react';
import { GetAboutMembersResult, Nullable, Optional } from 'src/types';
import { wrapper } from 'src/store';
import { common } from 'src/strings';
import { useAuth, useTitleSetter } from 'src/hooks';
import StandardHeading from 'src/components/shared/StandardHeading';
import MemberList from 'src/components/users/MemberList';
import UserList from 'src/components/users/UserList';
import { AxiosError } from 'axios';
import { setResponseStatus } from 'src/utils';
import { useDispatch } from 'react-redux';
import styles from 'modules/UsersIndexPage.module.scss';
import { membersFetcher } from 'src/fetchers';
import { TitleFactory } from 'src/types/title';
import { titleSetter } from 'src/utils/core';
import { NextPage } from 'next';

const titleFactory: TitleFactory<{ isStaff?: boolean }> = ({ isStaff = false }) => {
  const title = isStaff ? common.titles.users : common.titles.clubMembers;
  return {
    title,
    breadcrumbs: [{
      label: title,
      active: true,
    }],
  };
};

interface PropTypes {
  initialMembers: Nullable<GetAboutMembersResult>;
}

const UsersIndexPage: NextPage<PropTypes> = ({ initialMembers }) => {
  const dispatch = useDispatch();
  const { isStaff } = useAuth();

  const titleData = useMemo(() => titleFactory({ isStaff }), [isStaff]);
  useTitleSetter(dispatch, titleData);

  return (
    <Content className={styles.usersPageContent}>
      {isStaff
        ? <StandardHeading heading="Users" lead="List of all users in the database" />
        : <StandardHeading heading="Club Members" lead="The people in our community" />}
      <MemberList initialMembers={initialMembers || undefined} />
      <UserList enabled={isStaff} />
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { store } = ctx as typeof ctx;

  let initialMembers: Optional<GetAboutMembersResult>;
  try {
    initialMembers = await membersFetcher();
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

  const props: PropTypes = {
    initialMembers: initialMembers || null,
  };
  titleSetter(store, titleFactory({}));
  return { props };
});

export default UsersIndexPage;
