import { Alert } from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';
import { FC } from 'react';

interface PropTypes {
  message: string;
}

const NoResultsAlert: FC<PropTypes> = ({ message }) => (
  <Alert color="ui" fade={false} className="text-center">
    <InlineIcon icon="info" first fixedWidth />
    {message}
  </Alert>
);

export default NoResultsAlert;
