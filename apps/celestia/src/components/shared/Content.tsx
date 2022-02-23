import classNames from 'classnames';
import { FC } from 'react';

const Content: FC<{ className?: string }> = ({ children, className = '' }) => (
  <div id="content" className={classNames('section-container', className)}>
    {children}
  </div>
);

export default Content;
