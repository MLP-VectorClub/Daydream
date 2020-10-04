import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/rootReducer';
import Link from 'next/link';

const ELEMENT_ID = 'breadcrumbs';

const Breadcrumbs: React.FC = () => {
  const breadcrumbs = useSelector((state: RootState) => state.core.breadcrumbs);

  // TODO Rich JSON+LD data for SEO

  if (breadcrumbs.length === 0) return <div id={ELEMENT_ID} />;

  return (
    <Breadcrumb id={ELEMENT_ID}>
      <BreadcrumbItem className="breadcrumb-item-divider" />
      {breadcrumbs.map((el, i) => {
        const isActive = el.active === true;
        const tag = isActive ? 'strong' : (el.linkProps ? 'a' : undefined);
        const item = (
          <BreadcrumbItem tag={tag} key={el.linkProps ? undefined : i}>{el.label}</BreadcrumbItem>
        );

        if (!el.linkProps) {
          return item;
        }

        return (
          <Link key={i} {...el.linkProps} passHref>
            {item}
          </Link>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
