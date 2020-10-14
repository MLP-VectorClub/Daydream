import React from 'react';
import { Alert } from 'reactstrap';
import { coreActions } from 'src/store/slices';
import { PROD_APP_URL } from 'src/config';
import { wrapper } from 'src/store';
import Content from 'src/components/shared/Content';
import ExternalLink from 'src/components/shared/ExternalLink';
import ContactLink from 'src/components/shared/ContactLink';
import StandardHeading from 'src/components/shared/StandardHeading';
import { common, privacyPolicy } from 'src/strings';

const PrivacyPolicy: React.FC = () => (
  <>
    <Alert color="warning" className="p-2 mb-2" fade={false}>
      {privacyPolicy.notYetUpdated}
    </Alert>
    <Content className="privacy-policy">
      <StandardHeading heading={privacyPolicy.title} lead={privacyPolicy.lead} />

      <blockquote>
        <strong>TL;DR:</strong> {privacyPolicy.tldr}
      </blockquote>

      <p>{privacyPolicy.p1(<a href={PROD_APP_URL}>{PROD_APP_URL}</a>)}</p>
      <p>{privacyPolicy.p2}</p>

      <h2>{privacyPolicy.h1}</h2>
      <p>{privacyPolicy.p3}</p>
      <p>{privacyPolicy.p4}</p>
      <p>{privacyPolicy.p5}</p>
      <p>{privacyPolicy.p6}</p>
      <p>{privacyPolicy.p7}</p>
      <p>{privacyPolicy.p8}</p>
      <p>{privacyPolicy.p9}</p>

      <h2>{privacyPolicy.h2}</h2>
      <p>{privacyPolicy.p10}</p>
      <p>{privacyPolicy.p11}</p>

      <h2>{privacyPolicy.h3}</h2>
      <p>{privacyPolicy.p12}</p>
      <p>{privacyPolicy.p13}</p>
      <p>{privacyPolicy.p14}</p>
      <p>{privacyPolicy.p15}</p>

      <h2>{privacyPolicy.h4}</h2>
      <p>{privacyPolicy.p16}</p>
      <p>{privacyPolicy.p17(<ExternalLink href="https://www.cloudflare.com/security-policy/">privacy policy</ExternalLink>)}</p>
      <p>{privacyPolicy.p18}</p>
      <p>{privacyPolicy.p19}</p>

      <h2>{privacyPolicy.h5}</h2>
      <p>{privacyPolicy.p20}</p>
      <p>{privacyPolicy.p21}</p>
      <p>{privacyPolicy.p22}</p>

      <h2>{privacyPolicy.h6}</h2>
      <p>{privacyPolicy.p23(<ContactLink>Contact</ContactLink>)}</p>
    </Content>
  </>
);

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { store } = ctx;
  store.dispatch(coreActions.setTitle(common.titles.privacyPolicy));

  return {
    props: {},
  };
});

export default PrivacyPolicy;
