import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://nodejscontacts.onrender.com';

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
      const response = await axios.patch('/auth/users', credential);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'users/updateAvatar',
  async (credential, { rejectWithValue }) => {
    console.log(credential);
    try {
      const response = await axios.patch('/auth/users/avatars', credential, {
        headers: { 'content-type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const forgotPasswordUser = createAsyncThunk(
  'users/forgotPasswordUser',
  async (credential, { rejectWithValue }) => {
    try {
     const response = await axios.post(
       '/auth/users/forgotPassword',
       credential
     );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const restorePasswordUser = createAsyncThunk(
  'users/restorePasswordUser',
  async ({ password, token }, { rejectWithValue }) => {
    try {
      const option = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        '/auth/users/restorePassword',
        password,
        option
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const verifyUser = createAsyncThunk(
  'users/verifyUser',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/auth/users/verify/${token}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const resendVerifyEmailUser = createAsyncThunk(
  'users/resendVerifyEmailUser',
  async (credential, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/auth/users/verify`, credential);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
