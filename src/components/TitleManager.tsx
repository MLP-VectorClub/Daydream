import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useTranslation } from '../i18n';
import { RootState } from '../store/rootReducer';
import { APP_NAME } from '../config';

export default (() => {
  const { t } = useTranslation();
  const { title } = useSelector((store: RootState) => store.core);

  const emptyTitle = title === null || title === '';
  const titleString = Array.isArray(title) ? t(`titles.${title[0]}`, title[1]) : (
    title !== null ? t(`titles.${title}`) : null
  );

  return (
    <Head>
      <title>{emptyTitle ? '' : `${titleString} - `}{APP_NAME}</title>
    </Head>
  );
}) as React.FC;
