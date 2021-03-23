import { VFC } from 'react';
import { GuideName } from 'src/types';
import Link from 'next/link';
import { PATHS } from 'src/paths';
import { Button } from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';

const MajorChangesButton: VFC<{ guide: GuideName }> = ({ guide }) => (
  <Link href={PATHS.GUIDE_CHANGES(guide)} passHref>
    <Button color="link" size="sm">
      <InlineIcon icon="exclamation-triangle" first />
      Major Changes
    </Button>
  </Link>
);

export default MajorChangesButton;
