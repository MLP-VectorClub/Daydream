import { Alert } from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';
import { FC } from 'react';

export const FeaturePlaceholder: FC = ({ children = 'This feature is not available yet' }) => (
  <Alert color="ui" fade={false}>
    <InlineIcon icon="hard-hat" first />
    {children}
  </Alert>
);
