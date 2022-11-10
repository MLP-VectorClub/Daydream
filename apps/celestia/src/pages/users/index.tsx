import Content from 'src/components/shared/Content';
import { useMemo } from 'react';
import { Nullable, Optional, Translatable } from 'src/types';
import { GetAboutMembersResult } from '@mlp-vectorclub/api-types';
import { useAppDispatch, wrapper } from 'src/store';
import { useAuth, useTitleSetter } from 'src/hooks';
import StandardHeading, { StandardHeadingProps } from 'src/components/shared/StandardHeading';
import MemberList from 'src/components/users/MemberList';
import { UserList } from 'src/components/users/UserList';
import { handleDataFetchingError } from 'src/utils';
import styles from 'modules/UsersIndexPage.module.scss';
import { membersFetcher } from 'src/fetchers';
import { TitleFactory } from 'src/types/title';
import { titleSetter } from 'src/utils/core';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { typedServerSideTranslations } from 'src/utils/i18n';

const titleFactory: TitleFactory<{ isStaff?: boolean }> = ({ isStaff = false }) => {
  const title: Translatable = [isStaff ? 'common:titles.users' : 'common:titles.clubMembers'];
  return {
    title,
    breadcrumbs: [
      {
        label: title,
        active: true,
      },
    ],
  };
};

interface PropTypes {
  initialMembers: Nullable<GetAboutMembersResult>;
}

const UsersIndexPage: NextPage<PropTypes> = ({ initialMembers }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isStaff } = useAuth();

  const titleData = useMemo(() => titleFactory({ isStaff }), [isStaff]);
  useTitleSetter(dispatch, titleData);

  const headingProps: StandardHeadingProps = {
    heading: isStaff ? t(`users:memberList.staff.heading`) : t(`users:memberList.public.heading`),
    lead: isStaff ? t(`users:memberList.staff.lead`) : t(`users:memberList.public.lead`),
  };

  return (
    <Content className={styles.usersPageContent}>
      <StandardHeading {...headingProps} />
      <MemberList initialMembers={initialMembers || undefined} isStaff={isStaff} />
      <UserList enabled={isStaff} />
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const { locale } = ctx;

  let initialMembers: Optional<GetAboutMembersResult>;
  try {
    initialMembers = await membersFetcher();
  } catch (e) {
    handleDataFetchingError(ctx, e);
  }

  const props: PropTypes = {
    initialMembers: initialMembers || null,
  };
  titleSetter(store, titleFactory({}));
  return {
    props: {
      ...(await typedServerSideTranslations(locale, ['users'])),
      ...props,
    },
  };
});

export default UsersIndexPage;
