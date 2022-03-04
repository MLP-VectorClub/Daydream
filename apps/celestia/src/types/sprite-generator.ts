import { ValuesOf } from 'src/types/common';

export enum SpriteGeneratorCmOptions {
  CM_SQUARE = 'cm_square',
}

export enum SpriteGeneratorEyeOptions {
  EYES_MALE_12 = 'eyes_male12',
  EYES_MALE_3 = 'eyes_male3',
  EYES_FEMALE_1 = 'eyes_female1',
  EYES_FEMALE_2 = 'eyes_female2',
  EYES_FEMALE_3 = 'eyes_female3',
}

export enum SpriteGeneratorEyeGradientOptions {
  EYES_MALE_12_GRAD_2 = 'eyes_male12_grad2',
  EYES_MALE_12_GRAD_3 = 'eyes_male12_grad3',
  EYES_MALE_3_GRAD_2 = 'eyes_male3_grad2',
  EYES_MALE_3_GRAD_3 = 'eyes_male3_grad3',
  EYES_FEMALE_12_GRAD_2 = 'eyes_female12_grad2',
  EYES_FEMALE_12_GRAD_3 = 'eyes_female12_grad3',
  EYES_FEMALE_3_GRAD_2 = 'eyes_female3_grad2',
  EYES_FEMALE_3_GRAD_3 = 'eyes_female3_grad3',
}

export enum SpriteGeneratorHornOptions {
  FEMALE = 'horn_female',
  MALE = 'horn_male',
}

export enum SpriteGeneratorWingOptions {
  FEMALE = 'wing_female',
  MALE = 'wing_male',
}

export enum SpriteGeneratorBodyOptions {
  FEMALE = 'body_female',
  MALE = 'body_male',
}

export enum SpriteGeneratorIrisOptions {
  IRIS_GRAD_2 = 'iris_grad2',
  IRIS_GRAD_3 = 'iris_grad3',
}

type SpriteGeneratorMaleBodyEyeOptions = SpriteGeneratorEyeOptions.EYES_MALE_12 | SpriteGeneratorEyeOptions.EYES_MALE_3;

type SpriteGeneratorFemaleBodyEyeOptions =
  | SpriteGeneratorEyeOptions.EYES_FEMALE_1
  | SpriteGeneratorEyeOptions.EYES_FEMALE_2
  | SpriteGeneratorEyeOptions.EYES_FEMALE_3;

type SpriteGeneratorBodyEyeOptions<T> = {
  eye: T extends { body: SpriteGeneratorBodyOptions.MALE }
    ? SpriteGeneratorMaleBodyEyeOptions
    : T extends { body: SpriteGeneratorBodyOptions.FEMALE }
    ? SpriteGeneratorFemaleBodyEyeOptions
    : SpriteGeneratorEyeOptions;
};

type SpriteGeneratorOptionsBase = {
  cm: boolean;
  horn: boolean;
  wing: boolean;
  gradientStops: 2 | 3;
  body: SpriteGeneratorBodyOptions;
};

export type SpriteGeneratorOptions = SpriteGeneratorOptionsBase & SpriteGeneratorBodyEyeOptions<SpriteGeneratorOptionsBase>;

export const SPRITE_GENERATOR_ASSETS = [
  SpriteGeneratorCmOptions.CM_SQUARE,
  SpriteGeneratorEyeOptions.EYES_MALE_12,
  SpriteGeneratorEyeOptions.EYES_MALE_3,
  SpriteGeneratorEyeOptions.EYES_FEMALE_1,
  SpriteGeneratorEyeOptions.EYES_FEMALE_2,
  SpriteGeneratorEyeOptions.EYES_FEMALE_3,
  SpriteGeneratorEyeGradientOptions.EYES_MALE_12_GRAD_2,
  SpriteGeneratorEyeGradientOptions.EYES_MALE_12_GRAD_3,
  SpriteGeneratorEyeGradientOptions.EYES_MALE_3_GRAD_2,
  SpriteGeneratorEyeGradientOptions.EYES_MALE_3_GRAD_3,
  SpriteGeneratorEyeGradientOptions.EYES_FEMALE_12_GRAD_2,
  SpriteGeneratorEyeGradientOptions.EYES_FEMALE_12_GRAD_3,
  SpriteGeneratorEyeGradientOptions.EYES_FEMALE_3_GRAD_2,
  SpriteGeneratorEyeGradientOptions.EYES_FEMALE_3_GRAD_3,
  SpriteGeneratorHornOptions.FEMALE,
  SpriteGeneratorHornOptions.MALE,
  SpriteGeneratorWingOptions.FEMALE,
  SpriteGeneratorWingOptions.MALE,
  SpriteGeneratorBodyOptions.FEMALE,
  SpriteGeneratorBodyOptions.MALE,
  SpriteGeneratorIrisOptions.IRIS_GRAD_2,
  SpriteGeneratorIrisOptions.IRIS_GRAD_3,
] as const;

export type SpriteGeneratorImageMap = Record<ValuesOf<typeof SPRITE_GENERATOR_ASSETS> & string, HTMLImageElement>;

export interface RgbColors {
  red: number;
  green: number;
  blue: number;
}

export enum SpriteGeneratorBaseColor {
  COAT_OUTLINE = 0x443633,
  COAT_SHADOW_OUTLINE = 0x404433,
  COAT_FILL = 0x70605d,
  COAT_SHADOW_FILL = 0x6c7260,
  IRIS_GRADIENT_TOP = 0x3b3b3b,
  IRIS_GRADIENT_MIDDLE = 0x606060,
  IRIS_GRADIENT_BOTTOM = 0xbebebe,
  IRIS_HIGHLIGHT_TOP = 0x542727,
  IRIS_HIGHLIGHT_BOTTOM = 0x7e3a3a,
  MAGIC_AURA = 0xb7b7b7,
}

export type SpriteGeneratorColorMap = Record<SpriteGeneratorBaseColor, RgbColors>;
