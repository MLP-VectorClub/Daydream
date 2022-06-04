import { queryCache } from 'react-query';
import { ENDPOINTS, requestPromiseMapper } from 'src/utils';
import { UserService } from 'src/services';
import { PostUsersRequest, PostUsersSigninRequest } from '@mlp-vectorclub/api-types';
import { createAsyncThunk } from '@reduxjs/toolkit';

const invalidateUserSpecificQueries = () => {
  // TODO Potentially introduce more granular query filtering to only invalidate ones that use auth data
  void queryCache.refetchQueries();
};

export const signInThunk = createAsyncThunk('auth/signIn', async (params: PostUsersSigninRequest, { rejectWithValue }) => {
  try {
    await requestPromiseMapper(UserService.signIn(params));
    const data = await requestPromiseMapper(UserService.getMe());

    queryCache.setQueryData(ENDPOINTS.USERS_ME, data);
    invalidateUserSpecificQueries();
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const signOutThunk = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
  try {
    await requestPromiseMapper(UserService.signOut());

    queryCache.setQueryData(ENDPOINTS.USERS_ME, undefined);
    invalidateUserSpecificQueries();
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const registerThunk = createAsyncThunk('auth/register', async (params: PostUsersRequest, { rejectWithValue }) => {
  try {
    await requestPromiseMapper(UserService.register(params));
    const data = await requestPromiseMapper(UserService.getMe());

    queryCache.setQueryData(ENDPOINTS.USERS_ME, data);
    invalidateUserSpecificQueries();
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});
