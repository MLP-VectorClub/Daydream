import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { FC } from 'react';

const HappeningSoon: FC = () => {
  const { upcomingEvents } = useSelector((state: RootState) => state.core);
  return <>{upcomingEvents.map(() => null)}</>;
};

export default HappeningSoon;
