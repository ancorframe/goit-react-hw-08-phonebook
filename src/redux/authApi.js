import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/auth/users';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = ``;
  },
};

export const register = createAsyncThunk('users/register', async credential => {
  try {
    const { response } = await axios.post('/register', credential);

    return response;
  } catch (error) {
    console.log(error);
  }
});

export const login = createAsyncThunk('users/login', async credential => {
  try {
    const { response } = await axios.get('/login', credential);
    token.set(response.token);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const logout = createAsyncThunk('users/logout', async () => {
  try {
    await axios.post('/logout');
    token.unset();
  } catch (error) {
    console.log(error);
  }
});

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
      const response = await axios.get('/current');
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateSubscription = createAsyncThunk(
  'users/updateSubscription',
  async credential => {
    try {
      await axios.patch('', credential);
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  'users/updateAvatar',
  async credential => {
    try {
      await axios.post('/', credential);
    } catch (error) {
      console.log(error);
    }
  }
);
export const forgotPasswordUser = createAsyncThunk(
  'users/forgotPasswordUser',
  async credential => {
    try {
      await axios.patch('/avatars', credential);
    } catch (error) {
      console.log(error);
    }
  }
);
export const restorePasswordUser = createAsyncThunk(
  'users/restorePasswordUser',
  async credential => {
    try {
      await axios.post('/restorePassword', credential);
    } catch (error) {
      console.log(error);
    }
  }
);
