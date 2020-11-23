import { Alert } from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';
import { VFC } from 'react';

interface PropTypes {
  message: string;
}

const NoResultsAlert: VFC<PropTypes> = ({ message }) => (
  <Alert color="ui" fade={false} className="text-center">
    <InlineIcon icon="info" first fixedWidth />
    {message}
  </Alert>
);

export default NoResultsAlert;
