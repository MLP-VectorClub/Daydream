import { Nullable, Numeric, Optional } from 'src/types';
import { Appearance, FullGuideSortField, GuideName, PreviewAppearance, SlimGuideTag, TagType } from '@mlp-vectorclub/api-types';
import { colorGuide } from 'src/strings';
import { RgbColors } from 'src/types/sprite-generator';
import { padStart } from 'lodash';

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

export const getGuideLabel = (guide: GuideName | string | null): string => {
  if (isGuideName(guide)) {
    return guideNameMap[guide];
  }
  return colorGuide.unknownGuide;
};

export const getGuideTitle = (guide: Nullable<string> = null, page: Nullable<Numeric> = null, q = ''): string => {
  const guideName = getGuideLabel(guide);
  if (page === null) {
    return `${guideName} Color Guide`;
  }

  const withPage = `Page ${page} - ${guideName} Color Guide`;

  return q !== '' ? `${q} - ${withPage}` : withPage;
};

export const getAppearanceTitle = (guide: Nullable<string> = null, appearance: Pick<PreviewAppearance, 'label'> | null = null): string =>
  !appearance ? getGuideTitle(guide) : `${appearance.label} - ${getGuideTitle(guide)}`;

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

export const fullListSortOptionsMap: Record<FullGuideSortField, true> = {
  label: true,
  added: true,
  relevance: true,
};

export const isValidFullListSortOption = (sort: unknown): sort is FullGuideSortField =>
  typeof sort === 'string' && sort in fullListSortOptionsMap;

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
  return orderA > orderB ? 1 : orderA < orderB ? -1 : 0;
};

interface CutieMarkMappingColor {
  groupLabel: string;
  colorLabel: string;
  hex: string;
}

export interface CutieMarkColorMapping {
  /* eslint-disable @typescript-eslint/naming-convention */
  'Coat Outline': string;
  'Coat Shadow Outline': string;
  'Coat Fill': string;
  'Coat Shadow Fill': string;
  'Mane & Tail Outline': string;
  'Mane & Tail Fill': string;
  /* eslint-enable @typescript-eslint/naming-convention */
}

export const getColorMapping = (
  colorGroups: Appearance['colorGroups'],
  defaultColorMapping: CutieMarkColorMapping
): CutieMarkColorMapping => {
  const $colors: CutieMarkMappingColor[] = colorGroups.reduce((colors, cg) => {
    cg.colors.forEach((c) => {
      colors.push({ groupLabel: cg.label, colorLabel: c.label, hex: c.hex });
    });
    return colors;
  }, [] as CutieMarkMappingColor[]);

  const colorMapping: Partial<CutieMarkColorMapping> = {};
  $colors.forEach(($row) => {
    let groupLabel: string = $row.groupLabel.replace(/^(Costume|Dress)$/, 'Coat');
    groupLabel = groupLabel.replace(/^(Coat|Mane & Tail) \([^)]+\)$/, '$1');
    const isEye = $row.groupLabel === 'Iris';
    const eyeRegex = !isEye ? '|Gradient(?:\\s(?:Light|(?:\\d+\\s)?(?:Top|Botom)))?\\s' : '';
    const colorLabel = $row.colorLabel.replace(
      new RegExp(`^(?:(?:(?:Purple|Yellow|Red)\\s)?(?:Main|First|Normal${eyeRegex}))?(.+?)(?:\\s\\d+)?(?:/.*)?$`),
      '$1'
    );
    const normalizedLabel = `${groupLabel} ${colorLabel}`;
    if (normalizedLabel in defaultColorMapping && !(normalizedLabel in colorMapping)) {
      colorMapping[normalizedLabel as keyof CutieMarkColorMapping] = $row.hex;
    }
  });
  if (!('Coat Shadow Outline' in colorMapping) && 'Coat Outline' in colorMapping) {
    colorMapping['Coat Shadow Outline'] = colorMapping['Coat Outline'];
  }
  if (!('Coat Shadow Fill' in colorMapping) && 'Coat Fill' in colorMapping) {
    colorMapping['Coat Shadow Fill'] = colorMapping['Coat Fill'];
  }

  return {
    ...defaultColorMapping,
    ...colorMapping,
  };
};

/* eslint-disable no-bitwise */
/**
 * Converts a set of rgb values to a single number for any purpose
 * @param r 0-255
 * @param g 0-255
 * @param b 0-255
 */
export const convertRgbToNumber = (r: number, g: number, b: number): number => (r << 16) + (g << 8) + b;

export const convertNumberToRgb = (rgb: number): RgbColors => ({
  red: (rgb & 0xff0000) >> 16,
  green: (rgb & 0xff00) >> 8,
  blue: rgb & 0xff,
});
/* eslint-enable no-bitwise */

export const stringifyRgbNumber = (hexNumber: number): string => `#${padStart(hexNumber.toString(16).toUpperCase(), 6, '0')}`;

export const stringifyRgbKey = (map: Record<number, RgbColors> | null, key: number): string => {
  let hexNumber = key;
  if (typeof map === 'object' && map !== null && key in map) {
    const rgb = map[key];
    hexNumber = convertRgbToNumber(rgb.red, rgb.green, rgb.blue);
  }
  return stringifyRgbNumber(hexNumber);
};

// language=JSRegexp
export const validHexColorPattern = '^#?([a-fA-F\\d]{3}|[a-fA-F\\d]{6})$';

export const hexToRgb = (hex: string): RgbColors | null => {
  const partsMatch = hex.substring(1).match(/[a-f\d]{2}/gi);
  if (partsMatch === null || partsMatch.length !== 3) return null;
  const [red, green, blue] = partsMatch.map((s) => parseInt(s, 16));
  return { red, green, blue };
};

/**
 * Return values range from 0 to 255 (inclusive)
 *
 * @see http://stackoverflow.com/questions/11867545#comment52204960_11868398
 * @param rgb
 */
export const yiq = (rgb: RgbColors): number => (rgb.red * 299 + rgb.green * 587 + rgb.blue * 114) / 1000;
