import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

export default (() => {
  const { notifications } = useSelector((state: RootState) => state.auth);
  return notifications.length > 0 ? (
    <section className="notifications">
      <h2>Unread notifications</h2>
      {notifications}
    </section>
  ) : null;
}) as React.FC;
