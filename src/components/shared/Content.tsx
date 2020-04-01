import classNames from 'classnames';

export default (({ children, className = '' }) => (
  <div id="content" className={classNames('section-container', className)}>
    {children}
  </div>
)) as React.FC<{ className?: string }>;
