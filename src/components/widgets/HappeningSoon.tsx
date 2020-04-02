import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

export default (() => {
  const { upcomingEvents } = useSelector((state: RootState) => state.core);
  return <>{upcomingEvents.map(() => null)}</>;
}) as React.FC;
