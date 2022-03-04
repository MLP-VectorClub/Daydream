import { Button } from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';
import { VFC } from 'react';

export const AddEntryButton: VFC<{ noun: string }> = ({ noun }) => (
  <Button color="success" size="sm" disabled>
    <InlineIcon icon="plus" first />
    Add new {noun}
  </Button>
);
