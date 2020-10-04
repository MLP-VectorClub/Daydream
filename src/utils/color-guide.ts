import { includes } from 'lodash';
import { GuideName, Nullable, Numeric, Optional } from 'src/types';
import { GUIDE_NAMES } from 'src/config';

export const resolveGuideName = (guide?: string | string[]): Optional<GuideName> => {
  if (typeof guide !== 'undefined') {
    const guideName = Array.isArray(guide) ? guide[0] : guide;
    if (includes(GUIDE_NAMES, guideName)) {
      return guideName as GuideName;
    }
  }
};

const guideNameMap: Record<GuideName, string> = {
  pony: 'Friendship is Magic',
  pl: 'Pony Life',
  eqg: 'Equestria Girls',
};

export const getGuideLabel = (
  guide: string | null,
): string => {
  if (guide !== null && guide in guideNameMap) {
    return guideNameMap[guide as GuideName];
  }
  return 'Unknown';
};

export const getGuideTitle = (
  guide: Nullable<string> = null,
  page: Nullable<Numeric> = null,
): string => {
  const guideName = getGuideLabel(guide);
  if (page === null) {
    return `${guideName} Color Guide`;
  }

  return `Page ${page} - ${guideName} Color Guide`;
};
