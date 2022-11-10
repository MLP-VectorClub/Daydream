import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import Link from 'next/link';
import { renderingStateSlice } from 'src/utils/store';
import { FC } from 'react';
import { translatableValue } from 'src/hooks';
import { useTranslation } from 'next-i18next';

const ELEMENT_ID = 'breadcrumbs';

const Breadcrumbs: FC = () => {
  const { t } = useTranslation();
  const { breadcrumbs } = useSelector((state: RootState) => renderingStateSlice(state.core));

  // TODO Rich JSON+LD data for SEO

  if (breadcrumbs.length === 0) return <div id={ELEMENT_ID} />;

  return (
    <Breadcrumb id={ELEMENT_ID}>
      <BreadcrumbItem className="breadcrumb-item-divider" />
      {breadcrumbs.map((el, i) => {
        const isActive = el.active === true;
        const Tag = isActive ? 'strong' : el.linkProps ? 'a' : 'span';
        const item = (
          <Tag className="breadcrumb-item" key={el.linkProps ? undefined : i}>
            {translatableValue(t, el.label)}
          </Tag>
        );

        if (!el.linkProps) {
          return item;
        }

        return (
          <Link key={i} {...el.linkProps} passHref legacyBehavior>
            {item}
          </Link>
        );
      })}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
