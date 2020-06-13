import { ReactNode } from 'react';

interface PropTypes {
  heading: ReactNode;
  lead?: ReactNode;
}

export default (({ heading, lead }) => (
  <>
    <h1>{heading}</h1>
    <p className="lead">{lead}</p>
  </>
)) as React.FC<PropTypes>;
