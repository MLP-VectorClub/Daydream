import { GetAppearancesIdSpriteRequest, GetAppearancesRequest } from './api';
import { OptionalProps } from './common';

// TODO Attempt to fix optional properties being required in the generator package sometime
export type GetAppearancesRequestOptionals = OptionalProps<GetAppearancesRequest, 'page' | 'size' | 'q' | 'previews'>;
export type GetAppearancesIdSpriteRequestOptionals = OptionalProps<GetAppearancesIdSpriteRequest, 'size' | 'token'>;
