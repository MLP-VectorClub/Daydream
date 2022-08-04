import { Button } from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';
import { FC } from 'react';

export const AddEntryButton: FC<{ noun: string }> = ({ noun }) => (
  <Button color="success" size="sm" disabled>
    <InlineIcon icon="plus" first />
    Add new {noun}
  </Button>
);
