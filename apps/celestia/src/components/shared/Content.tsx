import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';

const Content: FC<PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => (
  <div id="content" className={classNames('section-container', className)}>
    {children}
  </div>
);

export default Content;
