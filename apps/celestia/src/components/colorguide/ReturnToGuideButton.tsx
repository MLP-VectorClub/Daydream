import { VFC } from 'react';
import { GuideName } from 'src/types';
import Link from 'next/link';
import { PATHS } from 'src/paths';
import { Button } from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';

const ReturnToGuideButton: VFC<{ guide: GuideName }> = ({ guide }) => (
  <Link href={PATHS.GUIDE(guide)} passHref>
    <Button color="link" size="sm">
      <InlineIcon icon="arrow-circle-left" first />
      Return to Guide
    </Button>
  </Link>
);

export default ReturnToGuideButton;
