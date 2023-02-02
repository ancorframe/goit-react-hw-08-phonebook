import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  forgotPasswordUser,
  restorePasswordUser,
  verifyUser,
  resendVerifyEmailUser,
} from './authApi';

const extraActions = [
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  forgotPasswordUser,
  restorePasswordUser,
  verifyUser,
  resendVerifyEmailUser,
];

const getActions = type => isAnyOf(...extraActions.map(action => action[type]));

const registerReducer = (state, action) => {
  state.user.email=action.payload.email
};

const loginReducer = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

const logoutReducer = (state, action) => {
  state.user = { name: '', email: '' };
  state.token = null;
  state.isLoggedIn = false;
};

const getCurrentReducer = (state, action) => {
  state.user = action.payload.user;
  state.token = action.payload.token;
  state.isLoggedIn = true;
};

const updateSubscriptionReducer = (state, action) => {
  state.user.subscription = action.payload.subscription;
};

const updateAvatarReducer = (state, action) => {
  state.user.avatarURL = action.payload.avatarURL;
};

const forgotPasswordUserReducer = (state, action) => {};

const restorePasswordUserReducer = (state, action) => {};

const verifyUserReducer = (state, action) => {};

const resendVerifyEmailUserReducer = (state, action) => {};

const pendingReduser = state => {
  state.isLoading = true;
};

const rejectedReducer = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const fulfilledReducer = state => {
  state.isLoading = false;
  state.error = null;
};

const initialState = {
  user: {
    name: '',
    email: '',
    subscription: '',
    avatarURL: '',
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, registerReducer)
      .addCase(login.fulfilled, loginReducer)
      .addCase(logout.fulfilled, logoutReducer)
      .addCase(getCurrent.fulfilled, getCurrentReducer)
      .addCase(updateSubscription.fulfilled, updateSubscriptionReducer)
      .addCase(updateAvatar.fulfilled, updateAvatarReducer)
      .addCase(forgotPasswordUser.fulfilled, forgotPasswordUserReducer)
      .addCase(restorePasswordUser.fulfilled, restorePasswordUserReducer)
      .addCase(verifyUser.fulfilled, verifyUserReducer)
      .addCase(resendVerifyEmailUser.fulfilled, resendVerifyEmailUserReducer)
      .addMatcher(getActions('pending'), pendingReduser)
      .addMatcher(getActions('rejected'), rejectedReducer)
      .addMatcher(getActions('fulfilled'), fulfilledReducer);
  },
});

export const { updateToken } = authSlice.actions;

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

export const authReducer = persistReducer(persistConfig, authSlice.reducer);
