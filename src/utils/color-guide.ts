import {
  FullGuideSortField,
  GuideName,
  Nullable,
  Numeric,
  Optional,
  SlimGuideTag,
  TagType,
} from 'src/types';
import { colorGuide } from 'src/strings';

const guideNameMap: Record<GuideName, string> = {
  pony: 'Friendship is Magic',
  pl: 'Pony Life',
  eqg: 'Equestria Girls',
};

export const isGuideName = (name: unknown): name is GuideName => typeof name === 'string' && name in guideNameMap;

export const resolveGuideName = (guide?: string | string[]): Optional<GuideName> => {
  if (isGuideName(guide)) {
    return guide as GuideName;
  }
};

export const getGuideLabel = (guide: string | null): string => {
  if (isGuideName(guide)) {
    return guideNameMap[guide];
  }
  return colorGuide.unknownGuide;
};

export const getGuideTitle = (
  guide: Nullable<string> = null,
  page: Nullable<Numeric> = null,
  q = '',
): string => {
  const guideName = getGuideLabel(guide);
  if (page === null) {
    return `${guideName} Color Guide`;
  }

  const withPage = `Page ${page} - ${guideName} Color Guide`;

  return q !== '' ? `${q} - ${withPage}` : withPage;
};

export interface ScaleResizeResult {
  scale: number;
  width: number;
  height: number;
}

export function scaleResize(w: number, h: number, property: 'scale' | 'width' | 'height', desiredValue: number): ScaleResizeResult {
  let div: number;
  switch (property) {
    case 'scale':
      return {
        scale: desiredValue,
        height: Math.round(h * desiredValue),
        width: Math.round(w * desiredValue),
      };
    case 'height':
      div = desiredValue / h;
      return {
        height: desiredValue,
        width: Math.round(w * div),
        scale: div,
      };
    case 'width':
      div = desiredValue / w;
      return {
        height: Math.round(h * div),
        width: desiredValue,
        scale: div,
      };
    default:
      throw new Error('Invalid arguments passed to scaleResize');
  }
}

export const fullListSortOptionsMap: Record<FullGuideSortField, string> = {
  label: 'alphabetically',
  added: 'by date added',
  relevance: 'by relevance',
};

export const isValidFullListSortOption = (sort: unknown): sort is FullGuideSortField =>
  typeof sort === 'string' && sort in fullListSortOptionsMap;

export const getFullGuideTitle = (
  guide: Nullable<string> = null,
): string => {
  const guideName = getGuideLabel(guide);
  return `Full List - ${guideName} Color Guide`;
};

const fullGuideNameMap: Record<GuideName, string> = {
  eqg: 'EQG Character',
  pl: 'Pony Life Character',
  pony: 'FiM Pony',
};

export const getFullGuideHeading = (
  guide: Nullable<string> = null,
): string => {
  const subject = isGuideName(guide) ? fullGuideNameMap[guide] : 'Character';

  return `Complete ${subject} List`;
};

const TAG_SORT_ORDER: Record<TagType, number> = {
  app: 1,
  cat: 2,
  char: 3,
  gen: 4,
  spec: 5,
  warn: 6,
};

export const sortTagsByType = <T extends SlimGuideTag>(tagA: T, tagB: T): number => {
  const orderA = tagA.type ? TAG_SORT_ORDER[tagA.type] : Infinity;
  const orderB = tagB.type ? TAG_SORT_ORDER[tagB.type] : Infinity;
  return orderA > orderB ? 1 : (orderA < orderB ? -1 : 0);
};
