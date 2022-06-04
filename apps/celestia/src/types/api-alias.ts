import { GetAboutConnectionResult } from '@mlp-vectorclub/api-types';
import { Nullable } from 'src/types/common';

export type MappedAboutConnectionResult = GetAboutConnectionResult & {
  commitDate: Nullable<Date>;
};
