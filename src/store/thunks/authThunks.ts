import { queryCache } from 'react-query';
import { ENDPOINTS } from 'src/utils';
import { UserService } from 'src/services';
import { PostUsersRequest, PostUsersSigninRequest } from 'src/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const invalidateUserSpecificQueries = () => {
  // TODO Potentially introduce more granular query filtering to only invalidate ones that use auth data
  void queryCache.refetchQueries();
};

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (params: PostUsersSigninRequest) => {
    await UserService.signIn(params);
    const response = await UserService.getMe();

    queryCache.setQueryData(ENDPOINTS.USERS_ME, response.data);
    invalidateUserSpecificQueries();
    return response.data;
  },
);

export const signOutThunk = createAsyncThunk(
  'auth/signOut',
  async () => {
    await UserService.signOut();

    queryCache.setQueryData(ENDPOINTS.USERS_ME, undefined);
    invalidateUserSpecificQueries();
  },
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (params: PostUsersRequest) => {
    await UserService.register(params);
    const response = await UserService.getMe();

    queryCache.setQueryData(ENDPOINTS.USERS_ME, response.data);
    invalidateUserSpecificQueries();
    return response.data;
  },
);
