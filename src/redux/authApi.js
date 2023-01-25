import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = ``;
  },
};

export const register = createAsyncThunk(
  'users/register',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/users/register', credential);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  'users/login',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/users/login', credential);
      token.set(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk(
  'users/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post('/auth/users/logout');
      token.unset();
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getCurrent = createAsyncThunk(
  'users/getCurrent',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;
      if (!persistedToken) {
        return thunkAPI.rejectedWithValue();
      }
      token.set(persistedToken);
      const response = await axios.get('/auth/users/current');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updateSubscription = createAsyncThunk(
  'users/updateSubscription',
  async (credential, { rejectWithValue }) => {
    try {
      await axios.patch('/auth/users', credential);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'users/updateAvatar',
  async (credential, { rejectWithValue }) => {
    try {
      await axios.post('/auth/users/avatars', credential);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const forgotPasswordUser = createAsyncThunk(
  'users/forgotPasswordUser',
  async (credential, { rejectWithValue }) => {
    try {
      await axios.patch('/auth/users/forgotPassword', credential);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const restorePasswordUser = createAsyncThunk(
  'users/restorePasswordUser',
  async (credential, { rejectWithValue }) => {
    try {
      await axios.post('/auth/users/restorePassword', credential);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
