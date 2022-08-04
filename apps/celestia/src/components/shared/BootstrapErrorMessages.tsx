import { FormFeedback } from 'reactstrap';
import { FC } from 'react';
import { ValidationErrorResponse } from '@mlp-vectorclub/api-types';

interface PropTypes {
  errors: ValidationErrorResponse['errors'];
  name: string;
}

const BootstrapErrorMessages: FC<PropTypes> = ({ errors, name }) => {
  const messages = errors && (errors[name] as unknown);
  if (!Array.isArray(messages)) {
    return null;
  }

  return (
    <>
      {Object.values(messages).map((line, i) => (
        <FormFeedback key={i} className="d-block" color="danger">
          {line}
        </FormFeedback>
      ))}
    </>
  );
};

export default BootstrapErrorMessages;
