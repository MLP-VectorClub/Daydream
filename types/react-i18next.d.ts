import 'react-i18next';
import aboutNs from 'public/locales/en/about.json';
import colorGuideNs from 'public/locales/en/colorGuide.json';
import commonNs from 'public/locales/en/common.json';
import connectionNs from 'public/locales/en/connection.json';
import oauthNs from 'public/locales/en/oauth.json';
import privacyPolicyNs from 'public/locales/en/privacyPolicy.json';
import showNs from 'public/locales/en/show.json';
import usersNs from 'public/locales/en/users.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      about: typeof aboutNs;
      common: typeof commonNs;
      colorGuide: typeof colorGuideNs;
      connection: typeof connectionNs;
      oauth: typeof oauthNs;
      privacyPolicy: typeof privacyPolicyNs;
      show: typeof showNs;
      users: typeof usersNs;
    };
  }

  export type AppI18nNamespaces = keyof CustomTypeOptions['resources'] & string;
}
