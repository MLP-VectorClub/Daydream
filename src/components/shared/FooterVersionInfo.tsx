import InlineIcon from 'src/components/shared/InlineIcon';
import { UncontrolledTooltip } from 'reactstrap';
import { common } from 'src/strings';
import FooterGitInfo from 'src/components/shared/FooterGitInfo';
import FooterLastUpdateInfo from 'src/components/shared/FooterLastUpdateInfo';
import React, { useCallback, useState } from 'react';
import { useConnectionInfo } from 'src/hooks';

const FooterVersionInfo: React.VFC = () => {
  const connectionInfo = useConnectionInfo();

  const [gitInfoOpen, setGitInfoOpen] = useState(false);
  const toggleGitInfo = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setGitInfoOpen(!gitInfoOpen);
  }, [gitInfoOpen]);

  return (
    <>
      <span id="git-info-toggle" className="mr-2" onClick={toggleGitInfo}>
        <InlineIcon icon={gitInfoOpen ? 'chevron-left' : 'chevron-right'} fixedWidth />
      </span>
      <UncontrolledTooltip target="git-info-toggle" placement="top" fade={false}>
        {gitInfoOpen ? common.footer.hideGitInfo : common.footer.showGitInfo}
      </UncontrolledTooltip>
      {gitInfoOpen ? <FooterGitInfo {...connectionInfo} /> : <FooterLastUpdateInfo {...connectionInfo} />}
    </>
  );
};

export default FooterVersionInfo;
