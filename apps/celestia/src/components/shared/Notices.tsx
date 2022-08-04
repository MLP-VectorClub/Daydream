import { Alert } from 'reactstrap';
import InlineIcon from 'src/components/shared/InlineIcon';
import ExternalLink from 'src/components/shared/ExternalLink';
import { OLD_SITE_HOST } from 'src/config';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Trans } from 'next-i18next';

const Notices: FC = () => {
  const router = useRouter();
  const url = OLD_SITE_HOST + router.asPath;
  return (
    <div id="notices">
      <Alert color="warning" fade={false}>
        <InlineIcon icon="hard-hat" first />
        <Trans i18nKey="common:wipNotice" values={{ url }}>
          0
          <ExternalLink href={url} blank={false} className="alert-link">
            1
          </ExternalLink>
        </Trans>
      </Alert>
    </div>
  );
};

export default Notices;
