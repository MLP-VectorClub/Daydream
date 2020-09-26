import { useDispatch } from 'react-redux';
import { useTranslation } from 'src/i18n';
import { useAuth, useSidebarUsefulLinks } from 'src/hooks';
import React, { useCallback } from 'react';
import { coreActions } from 'src/store/slices';
import ExternalLink from 'src/components/shared/ExternalLink';
import Link from 'next/link';

const SidebarUsefulLinks: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  const { signedIn } = useAuth();
  const usefulLinks = useSidebarUsefulLinks(signedIn);
  const dispatchActionByAnchor = useCallback((anchor: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    switch (anchor) {
      case '#color-avg':
        dispatch(coreActions.toggleColorAvg(true));
        break;
      default:
        console.warn(`Unhandled useful link anchor: ${anchor}`);
    }
  }, [dispatch]);

  if (!usefulLinks || usefulLinks.length === 0) return null;

  return (
    <div className="links">
      <h3>{t('sidebar.usefulLinks')}</h3>
      <ul>
        {usefulLinks.map(el => {
          let link: JSX.Element;
          const externalUrl = /^https?:\/\//.test(el.url);
          if (externalUrl) {
            link = <ExternalLink href={el.url} title={el.title}>{el.label}</ExternalLink>;
          } else {
            const actionDispatcher = el.url.startsWith('#');
            if (actionDispatcher) {
              link = <a href={el.url} onClick={dispatchActionByAnchor(el.url)} title={el.title}>{el.label}</a>;
            } else {
              link = (
                <Link href={el.url} as={el.url}>
                  <a title={el.title}>{el.label}</a>
                </Link>
              );
            }
          }

          return <li key={el.id}>{link}</li>;
        })}
      </ul>
    </div>
  );
};

export default SidebarUsefulLinks;
