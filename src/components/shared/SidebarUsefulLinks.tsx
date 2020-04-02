import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

export default (() => {
  const { usefulLinks } = useSelector((state: RootState) => state.core);
  return <>{usefulLinks.map(() => null)}</>;
}) as React.FC;
