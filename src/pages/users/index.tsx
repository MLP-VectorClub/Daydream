import Content from 'src/components/shared/Content';
import React, { useEffect } from 'react';
import { GetAboutMembersResult, Optional } from 'src/types';
import { wrapper } from 'src/store';
import { coreActions } from 'src/store/slices';
import { common } from 'src/strings';
import { useAuth } from 'src/hooks';
import StandardHeading from 'src/components/shared/StandardHeading';
import MemberList from 'src/components/users/MemberList';
import UserList from 'src/components/users/UserList';
import { AxiosError } from 'axios';
import { setResponseStatus } from 'src/utils';
import { membersFetcher } from 'src/hooks/users';
import { useDispatch } from 'react-redux';
import styles from 'modules/UsersIndexPage.module.scss';

interface PropTypes {
  initialMembers: GetAboutMembersResult;
}

const UsersIndexPage: React.VFC<PropTypes> = ({ initialMembers }) => {
  const dispatch = useDispatch();
  const { isStaff } = useAuth();

  useEffect(() => {
    const title = isStaff ? common.titles.users : common.titles.clubMembers;
    dispatch(coreActions.setTitle(title));
    dispatch(coreActions.setBreadcrumbs([{
      label: title,
      active: true,
    }]));
  }, [dispatch, isStaff]);

  return (
    <Content className={styles.usersPageContent}>
      {isStaff
        ? <StandardHeading heading="Users" lead="List of all users in the database" />
        : <StandardHeading heading="Club Members" lead="The people in our community" />}
      <MemberList initialMembers={initialMembers} />
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

  store.dispatch(coreActions.setTitle(common.titles.clubMembers));
  store.dispatch(coreActions.setBreadcrumbs([{
    label: common.titles.clubMembers,
    active: true,
  }]));
  return {
    props: {
      initialMembers,
    },
  };
});

export default UsersIndexPage;
