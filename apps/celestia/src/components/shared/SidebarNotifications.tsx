import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { FC } from 'react';

const SidebarNotifications: FC = () => {
  const { notifications } = useSelector((state: RootState) => state.auth);
  return notifications.length > 0 ? (
    <section className="notifications">
      <>
        <h2>Unread notifications</h2>
        {notifications}
      </>
    </section>
  ) : null;
};

export default SidebarNotifications;
