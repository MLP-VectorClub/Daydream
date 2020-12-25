import { ReactNode } from 'react';

interface PropTypes {
  heading: ReactNode;
  lead?: ReactNode;
}

const StandardHeading: React.VFC<PropTypes> = ({ heading, lead }) => (
  <>
    <h1 className="page-heading">{heading}</h1>
    <div className="lead page-lead" role="heading" aria-level={1}>{lead}</div>
  </>
);
export default StandardHeading;
