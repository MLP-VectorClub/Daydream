import { queryCache } from 'react-query';
import { ENDPOINTS } from 'src/utils';
import { userService } from 'src/services';
import { PostUsersRequest, PostUsersSigninRequest } from 'src/types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const invalidateUserSpecificQueries = () => {
  void queryCache.invalidateQueries(ENDPOINTS.USER_PREFS_ME);
  void queryCache.invalidateQueries(ENDPOINTS.USEFUL_LINKS_SIDEBAR);
};

export const signInThunk = createAsyncThunk(
  'auth/signIn',
  async (params: PostUsersSigninRequest) => {
    await userService.signIn(params);
    const response = await userService.getMe();

    queryCache.setQueryData(ENDPOINTS.USERS_ME, response.data);
    invalidateUserSpecificQueries();
    return response.data;
  },
);

export const signOutThunk = createAsyncThunk(
  'auth/signOut',
  async () => {
    await userService.signOut();

    queryCache.setQueryData(ENDPOINTS.USERS_ME, undefined);
    invalidateUserSpecificQueries();
  },
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (params: PostUsersRequest) => {
    await userService.register(params);
    const response = await userService.getMe();

    queryCache.setQueryData(ENDPOINTS.USERS_ME, response.data);
    invalidateUserSpecificQueries();
    return response.data;
  },
);
