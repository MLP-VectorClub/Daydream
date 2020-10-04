import { useSelector } from 'react-redux';
import Head from 'next/head';
import { RootState } from 'src/store/rootReducer';
import { APP_NAME } from 'src/config';

const TitleManager: React.FC = () => {
  const { title } = useSelector((store: RootState) => store.core);

  const emptyTitle = title === null || title === '';

  return (
    <Head>
      <title>{emptyTitle ? '' : `${title} - `}{APP_NAME}</title>
    </Head>
  );
};

export default TitleManager;
