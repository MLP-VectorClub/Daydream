import Routes from 'next-routes';

export default new Routes()
  .add('/cg/:slug', 'color-guide')
  // .add('/cg/v/:slug', 'appearance')
  .add('about');
