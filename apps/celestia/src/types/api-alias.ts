import { GetAboutConnectionResult } from 'src/types/api';
import { Nullable } from 'src/types/common';

export type MappedAboutConnectionResult = GetAboutConnectionResult & {
  commitDate: Nullable<Date>;
};
