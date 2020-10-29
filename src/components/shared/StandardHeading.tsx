import { ReactNode } from 'react';

interface PropTypes {
  heading: ReactNode;
  lead?: ReactNode;
}

const StandardHeading: React.VFC<PropTypes> = ({ heading, lead }) => (
  <>
    <h1>{heading}</h1>
    <p className="lead">{lead}</p>
  </>
);
export default StandardHeading;
