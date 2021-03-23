import classNames from 'classnames';
import { mapRoleLabel } from 'src/utils';
import { Status } from 'src/types';
import { useAuth, usePrefs } from 'src/hooks';
import LoadingRing from 'src/components/shared/LoadingRing';
import AvatarWrap from 'src/components/shared/AvatarWrap';
import ProfileLink from 'src/components/shared/ProfileLink';
import { common } from 'src/strings';
import { VFC } from 'react';

const SidebarUserInfo: VFC = () => {
  const { authCheck, user, signedIn } = useAuth();
  const prefs = usePrefs(signedIn);

  const checkingAuth = authCheck.status === Status.LOAD;

  const titleProp: { title?: string } = {};
  if (checkingAuth) titleProp.title = common.sidebar.authCheck;

  return (
    <div
      className={classNames(`logged-in provider-${user.avatarProvider}`, {
        'checking-auth': checkingAuth,
      })}
      {...titleProp}
    >
      <LoadingRing color="white" outline={false} className="spinner" />
      <AvatarWrap
        avatarProvider={user.avatarProvider}
        avatarUrl={user.avatarUrl}
        vectorApp={prefs?.p_vectorapp || null}
        size={50}
      />
      <div className="user-data">
        <span className="user-name">
          {signedIn ? (
            <ProfileLink {...user} />
          ) : common.guestUserName}
        </span>
        <span className="user-role">
          <span>{mapRoleLabel(user.role)}</span>
        </span>
      </div>
    </div>
  );
};

export default SidebarUserInfo;
