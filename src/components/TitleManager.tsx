import { useSelector } from 'react-redux';
import Head from 'next/head';
import { RootState } from 'src/store/rootReducer';
import { APP_NAME } from 'src/config';
import { VFC } from 'react';
import { renderingStateSlice } from 'src/utils/store';

const TitleManager: VFC = () => {
  const { title } = useSelector((store: RootState) => renderingStateSlice(store.core));

  return (
    <Head>
      <title>{!title ? '' : `${title} - `}{APP_NAME}</title>
    </Head>
  );
};

export default TitleManager;
