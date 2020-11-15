import { ReactNode } from 'react';

interface PropTypes {
  heading: ReactNode;
  lead?: ReactNode;
}

const StandardHeading: React.VFC<PropTypes> = ({ heading, lead }) => (
  <>
    <h1 className="page-heading">{heading}</h1>
    <div className="lead page-lead">{lead}</div>
  </>
);
export default StandardHeading;
