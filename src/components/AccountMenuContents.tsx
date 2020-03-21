import { NavItem, NavLink } from 'reactstrap';
import { Dispatch } from '@reduxjs/toolkit';
import UserLink from './shared/UserLink';
import { mapRoleLabel } from '../utils';
import { AuthModalSide, FailsafeUser, Nullable, WithTFunction } from '../types';
import { openAuthModal } from '../store/slices/authSlice';

interface PropTypes extends WithTFunction {
  user: Nullable<FailsafeUser>;
  dispatch: Dispatch;
  signedIn: boolean;
}

export default (({ t, user, signedIn, dispatch }) => (
  <>
    <NavItem>
      <span className="nav-link active">
        <strong>
          {user && user.name !== null
            ? <UserLink userName={user.name} />
            : t('guestUserName')}
        </strong>
        <small className="d-block text-uppercase">
          {mapRoleLabel(user ? user.role : 'guest')}
        </small>
      </span>
    </NavItem>
    {signedIn
      ? (
        <NavItem>
          <NavLink>{t('header.logout')}</NavLink>
        </NavItem>
      )
      : (
        <>
          <NavItem>
            <NavLink onClick={() => dispatch(openAuthModal(AuthModalSide.LOGIN))}>
              {t('header.login')}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => dispatch(openAuthModal(AuthModalSide.REGISTER))}>
              {t('header.register')}
            </NavLink>
          </NavItem>
        </>
      )}
  </>
)) as React.FC<PropTypes>;
