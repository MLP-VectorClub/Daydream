import { useDispatch } from 'react-redux';
import { useAuth, useSidebarUsefulLinks } from 'src/hooks';
import { MouseEventHandler, useCallback, VFC } from 'react';
import { coreActions } from 'src/store/slices';
import ExternalLink from 'src/components/shared/ExternalLink';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { PATHS } from 'src/paths';

const SidebarUsefulLinks: VFC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { signedIn } = useAuth();
  const usefulLinks = useSidebarUsefulLinks(signedIn);
  const dispatchActionByAnchor = useCallback((anchor: string): MouseEventHandler<HTMLAnchorElement> => e => {
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
      <h3>{t('common:sidebar.usefulLinks')}</h3>
      <ul>
        {usefulLinks.map(el => {
          let link: JSX.Element;
          const externalUrl = /^https?:\/\//.test(el.url);
          if (externalUrl) {
            link = <ExternalLink href={el.url} title={el.title}>{el.label}</ExternalLink>;
          } else {
            const actionDispatcher = el.url.startsWith('#');
            if (actionDispatcher) {
              link = el.url === '#sprite-tpl'
                ? <Link href={PATHS.GUIDE_SPRITE}><a title={el.title}>{el.label}</a></Link>
                : <a href={el.url} onClick={dispatchActionByAnchor(el.url)} title={el.title}>{el.label}</a>;
            } else {
              link = (
                <Link href={el.url}>
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
