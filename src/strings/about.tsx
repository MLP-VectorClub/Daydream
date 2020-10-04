/* eslint-disable max-len */
export const about = {
  website: (link: JSX.Element): JSX.Element => <>{link} Website</>,
  tagline: 'Handling requests, reservations & the Color Guide since 2015',
  whatsThisSite: {
    title: "What's this site?",
    p1: "This website originally started as a new, automatic way to process and store the requests & reservations users want to make. It was born due to the fact that in the past, the handling of comments under journals was done manually. Because of this, there had to be people who checked those comments every once in a while, evaluated them, then updated the journal accordingly. This was a time consuming task, and since the group's staff consists of busy people expecting them to constantly monitor new incoming comments is unrealistic. The initial goal of this website was to provide an easy-to-use interface where new entries can be submitted and added to a list (just like the journals) automatically, eliminating this monotonous task.",
    p2: "After some time, the idea of moving the old PNG color guide into an easier to use format was brought up and met with positive responses. Since then, the site also houses the vector club's official color guide, with freshly picked colors from recent episodes (and cute little pictures to go with a couple popular characters) among other information such as recommended cutie mark vectors and tag-based search. For easier use in drawing applications individual characters can still be downloaded as PNG files that contain all colors associated with them.",
  },
  attributions: {
    title: 'Attributions',
    github: (gh: JSX.Element): JSX.Element => <>Please refer to the project's {gh} for an up to date list of all used tools & libraries.</>,
    blendingCalc: [
      'Color Blending Calculator',
      ' originally made by ',
      'DASPRiD',
    ],
    headingFont: "Headings' font",
    daLogo: 'DeviantArt logo',
    aiLogo: 'Adobe Illustrator CC logo',
    inkscapeLogo: 'Inkscape logo',
    inkscapeTeam: 'Inkscape team',
    ponyscapeLogo: 'Ponyscape logo',
  },
  providers: {
    title: 'What image hosting providers do you support?',
    p1: "As you can probably tell we do not host a large majority of images you can see on episode pages, we make use of already established sites. Here's a full list of all providers we can recognize and that you can use to submit images:",
    asterisk: 'Using direct links from these providers is not supported due to the URLs lacking the identifiers necessary for adding both their preview and full size versions to posts.',
  },
  atSign: {
    title: "What's after the @ signs in the footer?",
    p1: (gh: JSX.Element): JSX.Element => <>This website is open source and you can find the code {gh}. What you're seeing is the commit ID which refers to the most recent version of the code the site is currently operating on. Whenever a new update is deployed, the version number changes automatically. The code on the server mirrors the repository exactly with no hidden alterations.</>,
  },
};
