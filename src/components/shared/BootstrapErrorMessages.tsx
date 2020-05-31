import { ErrorMessage } from 'react-hook-form';
import { FormFeedback } from 'reactstrap';

export type BootstrapErrorMessagesProps = Pick<Parameters<typeof ErrorMessage>[0], 'errors' | 'name'>;

export default (({ errors, name }) => {
  const messages = errors && errors[name];
  if (!Array.isArray(messages)) {
    return null;
  }

  return Object.values(messages).map((line, i) => (
    <FormFeedback key={i} className="d-block" color="danger">{line}</FormFeedback>
  ));
}) as React.FC<BootstrapErrorMessagesProps>;
