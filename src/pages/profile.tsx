import { useEffect } from 'react';
import { NextComponentType } from 'next';
import { AxiosError } from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { useTranslation } from '../i18n';
import Content from '../components/shared/Content';
import { coreActions, profileActions } from '../store/slices';
import { AppPageContext } from '../store';
import { userService } from '../services';
import { getProfileTitle, mapRoleLabel, setResponseStatus } from '../utils';
import { RootState } from '../store/rootReducer';
import StandardHeading from '../components/shared/StandardHeading';
import AvatarWrap from '../components/shared/AvatarWrap';

interface PropTypes {
  username: string;
}

const ProfilePage = (({ username }) => {
  const { t } = useTranslation('profile');
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.profile);
  const { user: authUser } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(coreActions.setTitle(getProfileTitle(username, user, authUser.id)));
  }, [username, authUser, user]);

  return (
    <Layout>
      <Content>
        {!user && <StandardHeading heading={t('notFound')} lead={t('checkYourSpelling')} />}
        {user && (
          <>
            <div className="d-flex justify-content-center align-items-center mb-2">
              <AvatarWrap {...user} size={75} className="flex-grow-0" />
            </div>
            <StandardHeading heading={user.name} lead={mapRoleLabel(t, user.role)} />
          </>
        )}
      </Content>
    </Layout>
  );
}) as NextComponentType<AppPageContext<{ query: PropTypes }>, PropTypes, PropTypes>;

ProfilePage.getInitialProps = async ctx => {
  const { query, store } = ctx;
  const { username } = query;

  let user = null;
  try {
    const response = await userService.getByName({ username }).toPromise();
    user = response.data;
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

  store.dispatch(profileActions.setUserData(user));
  store.dispatch(coreActions.setTitle(getProfileTitle(username, user)));
  return ({
    namespacesRequired: ['profile'],
    username,
  });
};

export default ProfilePage;
