import { TFunction } from 'next-i18next';
import { includes } from 'lodash';
import {
  GuideName,
  Nullable,
  Numeric,
  Optional,
  TitleKeyWithParams,
} from '../types';
import { GUIDE_NAMES } from '../config';

export const resolveGuideName = (guide?: string | string[]): Optional<GuideName> => {
  if (typeof guide !== 'undefined') {
    const guideName = Array.isArray(guide) ? guide[0] : guide;
    if (includes(GUIDE_NAMES, guideName)) {
      return guideName as GuideName;
    }
  }
};

export const getGuideTitle = (
  t: TFunction,
  guide: Nullable<string> = null,
  page: Nullable<Numeric> = null,
): TitleKeyWithParams => {
  const guideExists = guide !== null;
  const guideName = t(`color-guide:guideName.${guideExists ? guide : 'unknown'}`);
  if (page === null) {
    return ['colorGuideByName', { guideName }];
  }

  return ['colorGuideByNameAndPage', { guideName, page }];
};
