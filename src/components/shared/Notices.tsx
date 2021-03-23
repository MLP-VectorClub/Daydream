import { Alert } from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';
import ExternalLink from 'src/components/shared/ExternalLink';
import { OLD_SITE_URL } from 'src/config';
import { useRouter } from 'next/router';
import { common } from 'src/strings';
import { VFC } from 'react';

const Notices: VFC = () => {
  const router = useRouter();
  return (
    <div id="notices">
      <Alert color="warning" fade={false}>
        <InlineIcon icon="hard-hat" first />
        {`${common.wipNotice} `}
        <ExternalLink
          href={OLD_SITE_URL + router.asPath}
          blank={false}
          className="alert-link"
        >
          {OLD_SITE_URL + router.asPath}
        </ExternalLink>
      </Alert>
    </div>
  );
};

export default Notices;
