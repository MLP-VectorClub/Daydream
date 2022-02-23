import Content from 'src/components/shared/Content';
import StandardHeading from 'src/components/shared/StandardHeading';
import { Alert } from 'reactstrap';
import Link from 'next/link';
import { PATHS } from 'src/paths';
import { VFC } from 'react';

interface PropTypes {
  heading: string;
  noun?: string;
}

export const GuideNotFound: VFC<PropTypes> = ({ heading, noun = 'color guide' }) => (
  <Content>
    <StandardHeading heading={heading} lead={`The requested ${noun} could not be found`} />
    <Alert color="info" fade={false} className="text-center">
      Check out the{' '}
      <Link href={PATHS.GUIDE_INDEX}>
        <a>list of available guides</a>
      </Link>{' '}
      to hopefully find what you were looking for.
    </Alert>
  </Content>
);

export default GuideNotFound;
