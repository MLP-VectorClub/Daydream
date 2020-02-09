import { Nullable, Omit } from 'app/types';
import * as api from 'app/types/api';

/**
 * @file
 * Used to create aliases for lengthy interface names generated from the OpenAPI operation IDs
 */

export type FailsafeUser = Omit<api.User, 'id' | 'name' | 'avatarUrl' | 'displayName' | 'email'> & {
  id: Nullable<api.User['id']>;
  name: Nullable<api.User['name']>;
  avatarUrl: Nullable<api.User['avatarUrl']>;
  displayName: Nullable<api.User['displayName']>;
  email: Nullable<api.User['email']>;
};
