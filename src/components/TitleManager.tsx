import { useSelector } from 'react-redux';
import Head from 'next/head';
import { RootState } from 'src/store/rootReducer';
import { APP_NAME } from 'src/config';

const TitleManager: React.FC = () => {
  const { title } = useSelector((store: RootState) => store.core);

  return (
    <Head>
      <title>{!title ? '' : `${title} - `}{APP_NAME}</title>
    </Head>
  );
};

export default TitleManager;
