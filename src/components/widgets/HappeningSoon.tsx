import { useSelector } from 'react-redux';
import { RootState } from 'src/store/rootReducer';
import { VFC } from 'react';

const HappeningSoon: VFC = () => {
  const { upcomingEvents } = useSelector((state: RootState) => state.core);
  return <>{upcomingEvents.map(() => null)}</>;
};

export default HappeningSoon;
