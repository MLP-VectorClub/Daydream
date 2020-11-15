import { Status } from 'src/types';
import { Alert } from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';
import { ReactChild, VFC } from 'react';

interface PropTypes {
  status: Status;
  noun?: string;
  errorMessage?: ReactChild;
  loadingMessage?: ReactChild;
}

const StatusAlert: VFC<PropTypes> = ({ status, loadingMessage, errorMessage, noun = 'data' }) => {
  if (status === Status.FAILURE) {
    const message = errorMessage || `Failed to fetch ${noun}, please try again later.`;
    return (
      <Alert color="danger" fade={false} className="text-center">
        {message}
      </Alert>
    );
  }

  if (status === Status.LOAD) {
    const message = loadingMessage || `Loading ${noun}, please wait…`;
    return (
      <Alert color="ui" fade={false} className="text-center">
        <InlineIcon loading first />
        {message}
      </Alert>
    );
  }

  return null;
};

export default StatusAlert;
