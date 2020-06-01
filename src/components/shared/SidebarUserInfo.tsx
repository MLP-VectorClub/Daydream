import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { RootState } from '../../store/rootReducer';
import { useTranslation } from '../../i18n';
import { mapRoleLabel } from '../../utils';
import AvatarWrap from './AvatarWrap';
import ProfileLink from './ProfileLink';
import LoadingRing from './LoadingRing';
import { Status } from '../../types';

export default (() => {
  const { t } = useTranslation();
  const {
    sessionUpdating,
    authCheck,
    user,
    signedIn,
  } = useSelector((state: RootState) => state.auth);

  const checkingAuth = authCheck.status === Status.LOAD;

  const titleProp: { title?: string } = {};
  if (sessionUpdating) titleProp.title = t('sidebar.sessionUpdating');
  else if (checkingAuth) titleProp.title = t('sidebar.authCheck');

  return (
    <div
      className={classNames(`logged-in provider-${user.avatarProvider}`, {
        'updating-session': sessionUpdating || checkingAuth,
      })}
      {...titleProp}
    >
      <LoadingRing color="white" outline={false} className="spinner" />
      <AvatarWrap {...user} size={50} />
      <div className="user-data">
        <span className="user-name">
          {signedIn ? (
            <ProfileLink username={user.name} />
          ) : t('guestUserName')}
        </span>
        <span className="user-role">
          <span>{mapRoleLabel(t, user.role)}</span>
        </span>
      </div>
    </div>
  );
}) as React.FC;
