import classNames from 'classnames';

const Content: React.FC<{ className?: string }> = ({ children, className = '' }) => (
  <div id="content" className={classNames('section-container', className)}>
    {children}
  </div>
);

export default Content;
