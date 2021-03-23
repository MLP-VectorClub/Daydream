import { ErrorMessage } from 'react-hook-form';
import { FormFeedback } from 'reactstrap';
import { VFC } from 'react';

type PropTypes = Pick<Parameters<typeof ErrorMessage>[0], 'errors' | 'name'>;

const BootstrapErrorMessages: VFC<PropTypes> = ({ errors, name }) => {
  const messages = errors && errors[name] as unknown;
  if (!Array.isArray(messages)) {
    return null;
  }

  return (
    <>
      {Object.values(messages).map((line, i) => (
        <FormFeedback key={i} className="d-block" color="danger">{line}</FormFeedback>
      ))}
    </>
  );
};

export default BootstrapErrorMessages;
