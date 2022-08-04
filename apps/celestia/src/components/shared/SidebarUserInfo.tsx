import classNames from 'classnames';
import { mapRoleLabel } from 'src/utils';
import { Status } from 'src/types';
import { useAuth, usePrefs } from 'src/hooks';
import LoadingRing from 'src/components/shared/LoadingRing';
import AvatarWrap from 'src/components/shared/AvatarWrap';
import ProfileLink from 'src/components/shared/ProfileLink';
import { FC } from 'react';
import { useTranslation } from 'next-i18next';

const SidebarUserInfo: FC = () => {
  const { t } = useTranslation();
  const { authCheck, user, signedIn } = useAuth();
  const prefs = usePrefs(signedIn);

  const checkingAuth = authCheck.status === Status.LOAD;

  return (
    <div
      className={classNames(`logged-in provider-${user.avatarProvider}`, {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'checking-auth': checkingAuth,
      })}
      title={checkingAuth ? t('common:sidebar.authCheck') : undefined}
    >
      <LoadingRing color="white" outline={false} className="spinner" />
      <AvatarWrap avatarProvider={user.avatarProvider} avatarUrl={user.avatarUrl} vectorApp={prefs?.p_vectorapp || null} size={50} />
      <div className="user-data">
        <span className="user-name">{signedIn ? <ProfileLink {...user} /> : t('common:guestUserName')}</span>
        <span className="user-role">
          <span>{mapRoleLabel(t, user.role)}</span>
        </span>
      </div>
    </div>
  );
};

export default SidebarUserInfo;
