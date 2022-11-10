import InlineIcon from 'src/components/shared/InlineIcon';
import { UncontrolledTooltip } from 'reactstrap';
import FooterGitInfo from 'src/components/shared/FooterGitInfo';
import FooterLastUpdateInfo from 'src/components/shared/FooterLastUpdateInfo';
import { FC, MouseEventHandler, useCallback, useState } from 'react';
import { useConnectionInfo } from 'src/hooks';
import { useTranslation } from 'next-i18next';

const FooterVersionInfo: FC = () => {
  const { t } = useTranslation();
  const connectionInfo = useConnectionInfo();

  const [gitInfoOpen, setGitInfoOpen] = useState(false);
  const toggleGitInfo: MouseEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      setGitInfoOpen(!gitInfoOpen);
    },
    [gitInfoOpen]
  );

  return (
    <>
      <span id="git-info-toggle" className="mr-2" onClick={toggleGitInfo}>
        <InlineIcon icon={gitInfoOpen ? 'chevron-left' : 'chevron-right'} fixedWidth />
      </span>
      <UncontrolledTooltip target="git-info-toggle" placement="top" fade={false}>
        {gitInfoOpen ? t('common:footer.hideGitInfo') : t('common:footer.showGitInfo')}
      </UncontrolledTooltip>
      {gitInfoOpen ? <FooterGitInfo {...connectionInfo} /> : <FooterLastUpdateInfo {...connectionInfo} />}
    </>
  );
};

export default FooterVersionInfo;
