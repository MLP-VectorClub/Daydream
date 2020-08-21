import { TFunction } from 'next-i18next';
import { Nullable, Numeric, TitleKeyWithParams } from '../types';

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
