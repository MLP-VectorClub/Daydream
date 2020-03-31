import Routes from 'next-routes';

export default new Routes()
  .add('/cg/:guide', 'color-guide')
  // .add('/cg/v/:id', 'appearance')
  .add('/about/privacy', 'privacy-policy')
  .add('about');
