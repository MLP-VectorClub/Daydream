import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { RootState } from '../../store/rootReducer';
import { useTranslation } from '../../i18n';
import { mapRoleLabel } from '../../utils';
import AvatarWrap from './AvatarWrap';
import ProfileLink from './ProfileLink';

export default (() => {
  const { t } = useTranslation();
  const { sessionUpdating, user, signedIn } = useSelector((state: RootState) => state.auth);

  const titleProp: { title?: string } = {};
  if (sessionUpdating) titleProp.title = 'Updating your session';

  return (
    <div
      className={classNames(`logged-in provider-${user.avatarProvider}`, {
        'updating-session': sessionUpdating,
      })}
      {...titleProp}
    >
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
