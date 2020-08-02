import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

const HappeningSoon: React.FC = () => {
  const { upcomingEvents } = useSelector((state: RootState) => state.core);
  return <>{upcomingEvents.map(() => null)}</>;
};

export default HappeningSoon;
