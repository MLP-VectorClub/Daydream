import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'src/i18n';
import { mapRoleLabel } from 'src/utils';
import { Status } from 'src/types';
import { useAuth } from 'src/hooks';
import LoadingRing from 'src/components/shared/LoadingRing';
import AvatarWrap from 'src/components/shared/AvatarWrap';
import ProfileLink from 'src/components/shared/ProfileLink';

const SidebarUserInfo: React.FC = () => {
  const { t } = useTranslation();
  const { authCheck, user, signedIn } = useAuth();

  const checkingAuth = authCheck.status === Status.LOAD;

  const titleProp: { title?: string } = {};
  if (checkingAuth) titleProp.title = t('sidebar.authCheck');

  return (
    <div
      className={classNames(`logged-in provider-${user.avatarProvider}`, {
        'checking-auth': checkingAuth,
      })}
      {...titleProp}
    >
      <LoadingRing color="white" outline={false} className="spinner" />
      <AvatarWrap {...user} size={50} />
      <div className="user-data">
        <span className="user-name">
          {signedIn ? (
            <ProfileLink {...user} />
          ) : t('guestUserName')}
        </span>
        <span className="user-role">
          <span>{mapRoleLabel(t, user.role)}</span>
        </span>
      </div>
    </div>
  );
};

export default SidebarUserInfo;
