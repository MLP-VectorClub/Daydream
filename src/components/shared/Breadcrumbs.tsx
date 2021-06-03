import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/rootReducer';
import Link from 'next/link';
import { renderingStateSlice } from 'src/utils/store';
import { VFC } from 'react';

const ELEMENT_ID = 'breadcrumbs';

const Breadcrumbs: VFC = () => {
  const { breadcrumbs } = useSelector((state: RootState) => renderingStateSlice(state.core));

  // TODO Rich JSON+LD data for SEO

  if (breadcrumbs.length === 0) return <div id={ELEMENT_ID} />;

  return (
    <Breadcrumb id={ELEMENT_ID}>
      <BreadcrumbItem className="breadcrumb-item-divider" />
      {breadcrumbs.map((el, i) => {
        const isActive = el.active === true;
        const Tag = isActive ? 'strong' : (el.linkProps ? 'a' : 'span');
        const item = (
          <Tag className="breadcrumb-item" key={el.linkProps ? undefined : i}>{el.label}</Tag>
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
