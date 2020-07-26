import { TFunction } from 'next-i18next';
import {
  Nullable,
  TitleKeyWithParams,
} from '../types';

export const getGuideTitle = (
  t: TFunction,
  guide: Nullable<string> = null,
  page: Nullable<string> = null,
): TitleKeyWithParams => {
  const guideExists = guide !== null;
  const guideName = t(`colorGuide:guideName.${guideExists ? guide : 'unknown'}`);
  if (page === null) {
    return ['colorGuideByName', { guideName }];
  }

  return ['colorGuideByNameAndPage', { guideName, page }];
};
