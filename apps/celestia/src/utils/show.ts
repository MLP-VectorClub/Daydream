import { Nullable } from 'src/types';

export const episodeToString = (show: { episode: Nullable<number>; parts?: Nullable<number> }): string => {
  if (show.episode === null) {
    return 'null';
  }

  const range = typeof show.parts === 'number' && show.parts > 1 ? `-${show.episode + (show.parts - 1)}` : '';
  return `${show.episode}${range}`;
};

export const seasonEpisodeToString = (show: { season: Nullable<number>; episode: Nullable<number>; parts?: Nullable<number> }): string => {
  if (show.season === null || show.episode === null) {
    return 'null';
  }

  return `S${show.season}E${episodeToString(show)}`;
};
